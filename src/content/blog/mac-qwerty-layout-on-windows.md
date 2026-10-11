---
title: Mac QWERTY layout on Windows
description: The tilde and backtick key belongs next to the left Shift key, not under the Escape key!
publishDate: 2025-05-05
topics:
  - macos
draft: false
---

I grew up in Belgium, where the default keyboard layout is AZERTY: a French layout with dedicated keys for accented characters, used pretty much exclusively in France and Belgium (perhaps French-speaking parts of Switzerland and Africa too). Notably, it's also the default for Flemish speakers, even though Dutch has little use for those accent keys (the Netherlands just uses QWERTY).

AZERTY is rough for programming: curly and square brackets are buried on the number row behind _AltGr_ (fun fact: stands for "Alternative Graphic"), which is not as accessible or used as e.g. _Shift_ as a modifier. On Apple's AZERTY layout it's even worse, as there's no printed bracket key at all: curly brackets need _Option_ + a parenthesis key and square brackets need _Option_ + _Shift_ + parenthesis. I owned exactly one AZERTY MacBook — my first — before switching to QWERTY and never looking back.

Fast-forward to today: I regularly work on client-provided Windows laptops, and this thing never stopped bothering me: on a Windows ISO QWERTY layout, the backtick and tilde live on the top row, right below Escape, whereas on [Apple's ISO international English](https://support.apple.com/en-us/102743) keyboard, they're on the bottom row, left of the left _Shift_ key, where my muscle memory firmly expects them. Mistyping those characters practically daily pushed me to find a fix.

# MSKLC

Microsoft has a tool for exactly this: [Microsoft Keyboard Layout Creator (MSKLC)](https://www.microsoft.com/en-us/download/details.aspx?id=102134). It's pretty dated but still lets you load an existing layout, tweak individual keys, and build a native driver that integrates at the system level. Once installed, it shows up in Settings like any other layout, available to all users _and_ on the lock screen.

A good starting point is the US QWERTY layout as it has no [dead keys](https://en.wikipedia.org/wiki/Dead_key): click **File** → **Load Existing Keyboard**. From there, remap the key left of left _Shift_ to backtick and tilde, and optionally swap the only other different key under _Escape_ too. Then click **Project** → **Build DLL and Setup Package**.

# Admin rights

Installing a custom layout requires admin rights, and perhaps installing MSKLC does too (it's been a while: once you've created the DLL and installer, you don't need MSKLC anymore), which isn't always available on a company laptop. While you can use any (virtual) machine to install MSKLC onto and create the layout, then share it with your work laptop, installing it might be a bit trickier.

If you do have some elevated access, the installer just does two things: drops the DLL into System32 and adds an entry under `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Keyboard Layouts\`. You can attempt to duplicate an existing entry but point it to your DLL (it must live in `%WINDIR%\System32` for Windows to load it, though).

If the registry route doesn't stick, there's a more blunt alternative: overwrite the existing US layout DLL at `C:\Windows\System32\kbdus.dll`. I went this route on a laptop where a tool could grant any app temporary admin rights — provided you gave a reason, which no one ever checked. PowerShell with admin rights basically gives you full access to your own machine. Not professional advice. 🤓

If none of that is an option, [PowerToys](https://learn.microsoft.com/en-us/windows/powertoys/) Keyboard Manager can remap individual keys. It's user-level, so no admin needed, and needs to run in the background. Less elegant than a proper layout driver, but it gets the job done.
