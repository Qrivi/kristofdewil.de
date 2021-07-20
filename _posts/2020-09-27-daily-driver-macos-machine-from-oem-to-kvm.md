---
title: 'Daily driver macOS machine: from OEM to KVM'
intro: macOS is my go-to OS for development. I've worked with Macs, I've built "Macs", but recently I tried to virtualize one.
banner: assets/images/banners/bureau.jpeg
tags:
  - storytime
---

As some of you may know, earlier this year my computer failed to boot after or during a macOS update. This was my hackintosh desktop PC, built in 2017 as a student, as I was looking for a powerful enough PC to get my work done on and a way to spare my MacBook’s battery as much as possible – since those things were and still are very expensive. Not once had I had an issue updating macOS, apart from the early days when I was unaware that aside from updating the required kexts for my build, I also had to update the Clover bootloader itself. Rookie mistake.

I believe sometime mid-February, when I got back to my desk after dinner, I found the Clover bootloader screen on my monitor, but no entry for macOS whatsoever. If anything, I was really annoyed, because I was working on a school project and my latest changes had not been committed yet. I wasn’t worried, as the day I decided to go hackintosh I dedicated a NAS to TimeMachine backups, and I could also access my files by popping out the SSD and connecting it to MacBook with a USB to SATA adapter (long live SATA SSDs). I double checked my Clover config, my kexts, but everything was up-to-date and should have been compatible with the update I was trying to install. The macOS filesystem too seemed just fine, but for some unknown reason, it had become unbootable.

The easiest thing to do, would have been to just reinstall macOS and call it a day. I had been thinking about rebuilding my rig and ditch [Clover](https://github.com/CloverHackyColor/CloverBootloader){:target="_blank"} in favor of [OpenCore](https://github.com/acidanthera/OpenCorePkg){:target="_blank"}, which was heavily praised as the superior bootloader at that time on the [hackintosh subreddit](https://reddit.com/r/hackintosh){:target="_blank"}. I did end up buying some new hardware and did go with OpenCore, however: with a twist! Rather than just reinstalling macOS, I went with Manjaro Linux: I had decided to run macOS, and Windows, as KVMs instead of going with the more traditional dual-boot setup I had going before.

On paper a KVM, a kernel-based virtual machine, sounds fantastic: run a virtualized OS running on a combination of virtualized _and_ physical hardware. Yep: actual physical hardware. The biggest advantage of a KVM over a classic VM is the ability to passthrough hardware, which makes the guest OS have almost the same performance as when it would run on bare metal. And being a VM, I could keep my macOS install and OpenCore partition on virtual disks, which are extremely easy to backup. I was also hoping I could just suspend or pause macOS if I wanted to go on Windows for a bit and vice versa – though in the end I never got this to work, but it should be possible.

And everything went well, or at least as well as can be expected. Running Linux as a main OS comes with a certain challenge of its own. Though Manjaro is very stable and suited to be a daily driver, setting it up as a hypervisor and have everything “just right” isn’t that straightforward – especially if you want to run a hackintosh VM, which adds its own challenges onto the pile. 7 months have passed and I’m quite happy with what I achieved: I have a stable Windows 10 VM on which I can game that runs with no issues at all, and an as-stable-as-can-be macOS Catalina VM with iCloud and iMessage working, and even Handoff and other Continuity features such as unlocking with Apple Watch do work. I had also set up SSH and Samba file sharing on the host, as well as a nice network bridge that I could passthrough as a NIC so my VMs could access printers and speakers in my network. Once booted into macOS or Windows, you could not tell those were VMs apart from the odd number of CPU cores – I dedicated 6 cores to the VMs, and kept 2 cores for Manjaro – mainly because the VMs both had their dedicated graphics card, SSDs and other hardware passed through to them.

However, not all was fine and dandy. As mentioned earlier, I did have some minor issues, but annoying issues, with Manjaro. I’m a person who likes to keep everything up to date, but updating the Linux kernel occasionally reset config required to run my VMs properly. I also [created a script](https://github.com/Qrivi/KVM){:target="_blank"} so I could update my OpenCore config and kexts, then rebuild its virtual disk with just 1 command – but one of its dependencies, supermin, got [an update that broke](https://bugzilla.redhat.com/show_bug.cgi?id=1858625){:target="_blank"} – and though a fix was committed months ago, a new version has not yet been released to the pacman repos. True: I could build supermin myself – but there lies the issue: I want a build _to do work on_, not a rig _to work on_.

There were 2 slight drawbacks on the VM side as well. Recently gaming on KVM, which is what I wanted to use the Windows for, has been in the news as [BattlEye started to straight off ban people gaming on KVMs](https://twitter.com/thebattleye/status/1289027672186720263?lang=en){:target="_blank"} – something I really don’t want to happen to my main accounts on the few games I play. Nvidia too doesn’t want you to passthrough their consumer hardware GPUs either, but this can be easily circumvented by tweaking your setup a bit so it doesn’t detect it is running in a VM. Though concerning BattlEye, this will be more of a cat-and-mouse game that I don’t want to invest time into once it starts to affect the games I play. Another thing I failed to get to work was nested virtualization, though my i7 7700 does support it and it should work with the latest versions of the virtualization software and hypervisor I was running. This might have been because I tried to achieve this in “hard mode”, aka in a macOS VM. Though as macOS is the OS on which I wanted to get work done, that’s the OS I needed the nested virtualization for. No nested virtualization means no Docker. And again: I could run everything locally, do the Docker stuff on my MacBook, or set up Manjaro as a remote Docker server… but I did not want that. I want macOS to be my all-in-one development OS.

And a final disadvantage, also minor and easily solvable, is hardware related: you will need good hardware. Lately running certain games on Windows, I did notice that my CPU started bottlenecking. The i7 7700 is almost 4 years old at the time of writing but is by today’s standards still a very decent CPU, though stripping it of 2 of its 8 cores does take a significant toll. I do need to add that I am gaming in 4K on an LG 38GL950G that is being fed pixels by an RTX 2070 Super currently – which is a card I have never been able to put to its limits with that i7 7700.

So in conclusion: do I recommend a KVM setup for personal use? Absolutely. I had a nicer experience setting up OpenCore and macOS from within Manjaro, compared to 3 years ago when I constantly had to edit files on a thumb drive and swap it back and forth between a working machine and the PC I wanted to install macOS onto. Editing QEMU configuration files is also more pleasant than editing your BIOS settings. And the fact that you can just zip virtual disks before upgrading macOS and unzip and restore your backup if anything goes wrong, is just extremely nice. You can also tweak your host Linux to boot straight into your VM, so aside from the nested virtualization issue which might have been completely on me: KVM hackintoshing is, in my opinion, definitely the way to go. Running Windows as a KVM is a good idea as well if you want to be able to quickly backup or duplicate your entire installation in case you want to just try something out, allowing to simply delete the copy instead of having to trust the uninstaller. If there are any inconveniences at all, they’re the ones I talked about earlier. But in general, a good tip would be to not always run the latest versions of the virtualization software, and buy hardware that is just a bit more capable than what you need.

But will I be using a KVM setup for my personal use? Well, plot twist: I won’t. While none of the issues I experienced were real dealbreakers for me, adding things up make a KVM setup for what I intend it to use, less interesting. I have decided to remove the RX 570 and other hardware that I put in my build specifically for macOS, and go with a bare metal, single Windows installation – no more dual booting, no more hackintoshing. While hackintoshing is fun and allows for building really powerful systems at a fraction of what such performance would cost if you went with Apple hardware, I don’t really need a second computer for work anymore, and I don’t need all the power my hackintosh used to have – I don’t mind 10 more seconds of compilation time on my MacBook Pro. And running Windows natively means I can dedicate 100% of the CPU to that OS – no more need to exclude a core or two for the host OS – meaning I can put off upgrading hardware for a couple more years and save a few bucks in the long run.

As a matter of fact I’ve already wiped my main SSD and reinstalled Windows last weekend. I still don’t intend to do work on Windows, but I’m glad about how well Windows has evolved to allow for a, to me, very nice development environment. I’ve already set up Ubuntu with WSL 2 and recreated the UNIX environment that I’m used to have on my macOS machines I use for development. Only real difference are Windows vs macOS key binds – a true first world problem. And the games that used to push my CPU usage to 99% and higher, don’t stutter or lag anymore – there is no more bottlenecking.

For work I have decided that, in contrast to 3 years ago, I will be using only my MacBook Pro. It is still the same 2015 model I bought as a student, but apart from the battery’s capacity which has decreased to only 82% of its maximum charge over the years, this is still a great and very capable machine, fully supported by Apple and the latest version of macOS. An extra benefit of having only 1 physical device for work, is that I no longer have to sync my work environments. I used to symlink all my config files to my iCloud Drive but that solution wasn’t always ideal, as sometimes, variables or paths were different between my MacBook Pro and my hackintosh desktop. I also hope that this will make it so I can just close my MacBook’s lid when it’s time to log off and go home, rather than continue working on a certain feature so I can commit and push it, in case I need to pull it on my hackintosh the day after, if I decide to work from home. But only time will tell if that will actually happen – old habits die hard.

I do intend to upgrade my MacBook though. The WFH experience with the 2015 model isn’t as nice as it could be, as I need to connect it to power, connect a keyboard because I don’t own a wireless one, and my LG 38GL950G-B, which I need to plug in as well, is limited to 30 fps over that MacBook’s HDMI. At least the issue with my Magic Mouse connecting to the wrong Mac will be resolved, but the idea is to buy a newer model and a clean USB-C/Thunderbolt dock for it, like the ones from [Brydge](https://www.brydge.com/products/vertical-dock?variant=30679611539561){:target="_blank"}, so I can simply come home, dock the MacBook and enjoy a seamless desktop experience – no need to connect peripherals or charger, and keep my desk clean. With the ARM based MacBooks just around the corner, there’s no need to update just yet, so until then I will keep working on this trustworthy 2015 model I just finished writing this post on.