---
title: Build your own window manager
description: 
tags: 
    - 'Rust'
    - 'Window Manager'
    - 'xcb'
categories:
    - 'Programming'
date: "2024-01-01T16:35:00-03:00"
draft: false
---

Since I started using linux, one of the core components of my workflow always
is my window manager, and if you're here, I am sure you already know what window
managers are, after all, you're trying to learn how to make one, so I'll be more
straight to the point as we have a lot to cover. We will be focusing on tiling
window managers for the [X11 protocol](https://www.x.org/releases/X11R7.7/doc/xproto/x11protocol.html#request_format),
and I will not get into very specific details, but I'll do my best to quote and
reference where you can find this kind of information.

There are two main ways to interact with the X server, in this guide we will be
using the XCB library, but there is also the XLib, which is like the older 
brother of xcb. Both can accomplish the same things, but xcb is more modern and
gives you more control over the protocol, with the cost of being more verbose.
Xlib abstracts a lot of things for the programmer, making the interaction with
the X server mostly synchronous, xcb goes the other direction. It embraces the
async world and give you the building blocks to make what you want with less
abstractions.

Ahh, I forgot to mention, we will be using Rust, but as long as your language of
choice has bindings for the XCB library, you'll be fine using this guide. Oh 
well I really love starting new projects, the end goal of this guide is to have
a tiling window manager with support for EWMH and ICCCM, and a lot of other 
niceties that you can find most of them here [LuckyWM](https://github.com/wllfaria/lucky).
Although I'll not cover all the features that Lucky has, I'll give you enough
information so that you know how to implement them if thats what you want.

> Disclaimer, Lucky is a window manager that I made, and it has a lot of
features that we wont be covering here, and the code that we will write here 
will also not be the same that you'll find there. But you can definitely explore
it for reference.

## Let's get started

As usual, let's create our Rust project, and add the required dependencies for
it, we will not be using a lot of them, as we want to build most of the things
from scratch, but if you want nice abstractions, there is a library that can 
help you, you can check it out [Penrose here](https://github.com/sminez/penrosea).

```sh
cargo new mywm
cd mywm
```

We will need a few libraries, some of them are not directly related to xcb, but
they will make our lifes easier, so lets add them now:

```sh
cargo add anyhow tracing tracing-subscriber
```

Tracing will be really useful once you need to debug your window manager in a
"real" environment by logging to a file, you'll understand what I mean by that
shortly. Now, we are almost ready to start, we just need the two most important
dependencies for our project, `xcb` and `xkbcommon`, the former one is the core
components that will allow us to do everything we need with the X server. 
the latter is a set of utilities that we will basically only use to handle the
keyboard. We will need a few features for each of them, so lets install them
separatedly.

```sh
cargo add xkbcommon -F x11
cargo add xcb -F xkb xqq as-raw-xcb-connection randr xlib_xcb
```

> At the time of writing this, the version for xcb was `1.3.0`, and `0.7.0` for
xkbcommon

For now that is all we need, let's write some code. In order to start
communicating with the X server, we need to do quite a bit of setup when our
window manager starts, 
