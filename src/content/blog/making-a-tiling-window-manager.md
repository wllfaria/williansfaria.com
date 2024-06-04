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
was my window manager, and if you're here, I am sure you already know what
window managers are, after all, you're trying to learn how to make one, so I'll
be more straight to the point as we have a lot to cover. We will be focusing on
tiling window managers for the [X11 protocol](https://www.x.org/releases/X11R7.7/doc/xproto/x11protocol.html#request_format),
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
a basic tiling window manager that will be ready to be expanded, we will not
comply to all the EWMH and ICCCM specifications, but we are gonna have quite
some niceties.

You can find all the code we will write here on [my github](https://github.com/wllfaria/mywm),
and if you want to explore a more complete and robust window manager, I do have
the one I use on a daily basis available, its called [LuckyWM](https://github.com/wllfaria/lucky).

> Disclaimer: I'll not cover all the features that Lucky has, but I'll give you
enough information so that you know how to implement them if thats what you want.

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
window manager starts, but its fairly straight forward, so hear me out.

When we want to work with the X server as a window manager, we need to start up
a connection, setup a root window, and subscribe for some events on the given
window, but wait, what are those events?

Well, to communicate with the X server, we send requests, which are called
`cookies`, and the X server will respond sometimes with an event or
notification, but the server will only send events that we subscribe for, and
there are plenty of events on the protocol, we will definitely not cover them
all, but you'll get how things works. Ok, with all that said, what do we
actually want to do?

Lets create a file to store our entry point, I'll call it `mywm.rs`, and we will
start doing our setup, make sure to read all the comments, I'll explain
everything with them!

```rust
// src/mywm.rs
pub struct MyWm {
    conn: Arc<xcb::Connection>,
}

impl MyWm {
    pub fn new() -> Self {
        // we initialize a connection without specifying a display, so xcb will
        // try to load from the $DISPLAY environment variable, this will be
        // useful for us to test our window manager later
        let (conn, _) = xcb::Connection::connect(None).expect("failed to connect to x server");
        let conn = Arc::new(conn);

        // we have to do a lot of setup to get our root screen, so lets make a
        // separate function for that.
        let root_screen = Self::setup();

        MyWm {
            conn,
            root_screen,
        }
    }

    fn setup(conn: &Arc<xcb::Connection>) -> xcb::x::Window {
        // every monitor has a `root` screen, which defines where in the
        // available space it is located, this root screen has a `root` window,
        // which is the one we are interested in using to subscribe to events
        // and notifications the server may send us.
        let screen = conn
            .get_setup()
            .roots()
            .next()
            .expect("we need at least one window to manage");

        // this is how we extract the root window from the screen.
        let root = screen.root();

        // this is how we will usually communicate with the X server. Lets break
        // this down after this code block as we have a lot to talk about it.
        conn.send_and_check_request(&xcb::x::ChangeWindowAttributes {
            window: root,
            value_list: &[
                xcb::x::Cw::EventMask(
                    xcb::x::EventMask::SUBSTRUCTURE_REDIRECT | xcb::x::EventMask::SUBSTRUCTURE_NOTIFY,
                ),
                xcb::x::Cw::Cursor(cursor),
            ],
        })
        .expect("failed to subscribe to substructure redirect");

        root
    }
}
```

Ok,we finally did some code, but it may seem a little strange, what is that
function `send_and_check_request` and what is that struct it takes?

## How communication with the X server works with XCB

<div align="center">

<img src="/images/blog/how-to-make-a-window-manager/x-server-communication-flow.png" height="300px" width="300px" />

</div>

This diagram illustrates how the communication with the X server usually works,
we can subscribe for keyboard events, and we will get notified when certain
keys, or any key is pressed, so we can use that to do our things, like opening a
window, or closing another. Whenever we want to do some action, we send a
request to the server, which will handle it asynchronously, usually giving us a
notification when the event finishes, this request can be checked to see if any
error hapenned. We will call these requests `cookies`, as the protocol call them
this way.

Our connection with the protocol needs to be flushed to send the buffered events,
quite like the stdout behavior, but by checking a request, we are flushing it,
and getting back a response from the server that tells us wether or not it was
able to receive our request. Note that this doesn't mean it handled the request
successfully, but only that it received the event and will process when it can.

Ok, now that you understand how the communication works, lets discuss what is
that `ChangeWindowAttributes` and what it does, its quite simple to be honest,
when we send a request, xcb provides us with a bunch of possible pre-defined
kinds of requests, our binds organizes them as structs we can use on our
requests, `ChangeWindowAttributes` is a request to change some attribute of some
window, in our case, we are trying to change attributes from the root window,
which is the parent window to every other window our monitor will have. We are
trying to change its attributes to add a new `EventMask`, which tells the server
events we are interested in.


