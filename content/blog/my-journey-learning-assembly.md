---
title: My journey learning assembly
description: Computers are really interesting machines. And you should learn how they work.
tags: 
    - 'Assembly'
    - 'Low Level'
categories:
    - 'Programming'
date: "2024-01-01T16:35:00-03:00"
---

A few months back, I embarked on a thrilling journey to unravel the inner
workings of computers. I had a strong desire to truly grasp how they operated,
and that led me into the realms of C programming. What followed was an exciting
rollercoaster ride filled with both challenges and enchantment as I ventured
into the world of low-level programming, free from the abstractions that
protected me in the Javascript land.

## The Early Days

At the outset, my journey involved diving into the world of pure C by solving
small algorithmic puzzles. It was a completely different experience – no
ready-made hashmaps or dynamic arrays to rely on. If I required a hashmap,
I had to craft one from scratch; dynamic arrays? I had to build them myself.
These obstacles certainly made my learning path steep, but the knowledge I
acquired along the way was priceless. As someone who was more accustomed to
the comforts of high-level programming, concepts like pointers and memory
management were foreign to me. However, that's precisely why I chose to work
with C – I wanted to challenge myself and become a more skilled programmer,
even if it meant taking the less-traveled route.

## The Learning Curve

Weeks went by, and after numerous LeetCode challenges, I began feeling
surprisingly confident in my ability to write clever C scripts to solve
problems. It was during this time that I had a somewhat eye-opening realization:
even C had its own set of simplifications. It was this realization that led me
to make one of the most daring decisions of my journey—I wanted to learn
assembly.

## The Assembly Quest

My quest for assembly knowledge began with a seemingly simple task:
understanding x86-64 architecture. However, finding reliable and up-to-date
assembly information turned out to be a daunting challenge. Questions like
"Why does `int $0x80` make a syscall in x86?" left me puzzled, and I found
myself delving deep into Google searches.

My breakthrough came when I stumbled upon a game-changing resource—an x86-64
syscalls cheatsheet and the X86_64 ABI repository. Chapter 3 of this repository
became my treasure trove, teaching me the essentials of basic assembly. Instead
of taking the easy route and copying a generic "Hello, World!" program, I chose
the path of perseverance. I wanted to write my own "Hello, World!" by
deciphering the documentation, even if it meant hours of frustration.

After hours of effort, I finally wrote an x86 assembly program that displayed
"Hello, World!" It was a different kind of accomplishment, distinct from other
programming languages. Assembly forced me to grapple with concepts like
registers and syscall conventions, offering a profound learning experience.

## The Second Program

Encouraged by my first success, I embarked on my second assembly project—reading
a file. This endeavor involved understanding file descriptors and other assembly
intricacies. Once I grasped stack memory allocation and the necessary syscalls,
printing the file's contents felt like a logical progression.

## The Bold Project

As I gained more confidence, I decided to take on a more challenging project:
creating a command-line program that would prompt users for a search term and
then hunt for that term within a file. The idea appeared simple on the surface,
but the actual implementation was a whole different story. It demanded a fresh
perspective on control flow and logic, especially when debugging in assembly.
To my astonishment, I ended up leaning heavily on gdb to set breakpoints and
closely examine what was happening inside those registers.

I got stuck in a tricky spot in my program—the little jump block—and, for some
reason, things weren't going as planned. Even though the word I was looking
for should have been there, my code just couldn't find it. It's funny how just
a couple of days earlier, I couldn't have imagined that I'd be using gdb to
insert breakpoints into my assembled program. All this just so I could get a
closer look at what was happening inside the registers and print them
individually with `print (char*)%al`. My goal was simple: make sure the
character I was checking was indeed the right one and restart the search when
the pattern broke. Oh, what a journey it was!

During the debugging phase, as I grappled with the intricacies of managing
registers, I found myself turning to Google for guidance. It turned out to be
a treasure trove of information. One of the key insights I gained was about
the r8-15 registers – they always operate with 64 bits, even if you're storing
just a single byte. This discovery prompted me to rethink my approach to data
storage.

Since `%rax, %rdi, %rsi, %rdx` are commonly used for syscalls, I realized the
importance of strategic data movement. To make efficient use of these registers,
you have to be clever in how you handle your data, ensuring it aligns with your
future needs.

As I made progress in my journey, I discovered the art of optimization. It
dawned on me that employing 8-bit registers for character comparisons was a
far more efficient strategy than relying on the bulkier 64-bit registers.
It's truly fascinating how these seemingly minor tweaks can have a profound
impact in the realm of assembly programming.

My newfound knowledge about the lower and upper parts of registers led me to
a valuable insight: when comparing characters, it's best to use the lower
register that stores 8 bits – it's more than sufficient. This meant shifting
my approach from comparing `%rdi` to `%rsi` to utilizing `%al and %el`. While it
may seem like a minor optimization, in the world of assembly, every byte counts,
and it just makes sense to employ such strategies.

I picked up some nifty tricks that might seem like minor details but proved
incredibly useful. For instance, there's the technique of using xor to reset a
register's value to zero. This trick comes in handy when working with syscalls,
where you often need to set certain registers to zero. Instead of using the
`mov $0, %rax` approach, which takes up 7 bytes, xoring a register with itself
is a much leaner 2-byte operation.

In the case of xor, the first byte represents the xor opcode, and the second
byte encodes the two registers being xored. In contrast, with mov, the first
byte serves as the 64-bit prefix, the second byte is the mov opcode, the third
specifies the destination register, and the last 4 bytes represent the immediate
integer value (which is 0 in this case).

These seemingly small optimizations taught me a great deal about how computers
function. To me, it was nothing short of amazing. When was the last time you
had to ponder over saving 5 bytes? Certainly not in the world of JavaScript,
I'd say.

After a marathon 9-hour effort, I finally got my code working as intended.
It was a moment of triumph, and I couldn't wait to commit it to GitHub and
tinker with it. Despite its apparent simplicity, this project posed a complex
challenge that I was proud to conquer.

## Should you learn assembly?

Absolutely! I'd say it's worth delving into assembly, even if you just scratch
the surface. There's something oddly fascinating about tinkering with these
ancient technologies that brings a sense of beauty and uniqueness to the
experience.

Now, I won't sugarcoat it – assembly can be tough. But embracing challenges is
a great way to sharpen your problem-solving skills and change your perspective
on coding. For me, it opened up a whole new world of understanding, from memory
management to diving into the nitty-gritty of low-level languages and boosting
my algorithmic thinking. It's like putting on a new pair of glasses and seeing
the coding world in a completely different light.

Just be ready for a few bumps in the road, especially when hunting down
information. Make the most of your as/ld/gdb tools, and yes, be prepared for
some moments of frustration at the beginning. But remember, every struggle is
a step toward mastering assembly, and the journey is absolutely worth it.
