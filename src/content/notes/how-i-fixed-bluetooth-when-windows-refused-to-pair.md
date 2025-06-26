---
title: How I fixed Bluetooth when Windows refused to pair
description: A shutoff during a Windows Update might have caused pairing issues and even Bluetooth related BSOD.
publishDate: 2025-06-27
topics:
  - windows
draft: false
---

Last week, a friend hit me up to hop on a gaming session again after a while. We agreed on a time, and a bit earlier I powered on my Windows PC — which hadn’t been touched in over two months — so I was already bracing for a flood of updates.

Something was off. Normally, my PC is whisper-quiet, but this time it sounded like a jet taking off with all fans spinning at full blast. I’m running a 175Hz LG 38GL950G monitor (flex) and a RTX 4090 (flex 2), but moving the mouse felt like I got around 20 FPS on the desktop, max. My Kraken Elite 360 v2 AIO (flex 3) has a little screen that shows system stats, and my Ryzen 7 9800X3D (flex 4) was at 95°C _on cold boot_ (the irony). Pretty sure it was running even hotter, but the screen taps out at 95. The inevitable happened: the whole system shut off after 3–4 minutes.

When I booted it back up, things seemed mostly back to normal—except for two issues.

# 1. Windows Update corrupted and stuck

Since the PC had shut down mid a Windows cumulative update, Windows Update was borked. It got stuck at 16% every time, while installing, to then give me a "_Some update files are missing or have problems. We'll try to download the update again later._", error code 0x80073712.

Over the next couple of days, it never seemed to fix itself, so I tried to manually download and install the update via [Microsoft's Update Catalog](https://catalog.update.microsoft.com/Search.aspx?q=KB5063060) but that would have been too easy. To actually fix the issue, I ran these two trusty `DISM` commands from an elevated command prompt:

```powershell
DISM /Online /Cleanup-Image /StartComponentCleanup
DISM /Online /Cleanup-Image /RestoreHealth
```

Heads up: if the latter looks stuck at **62.3%**, it’s not actually frozen. That’s just where it sits while downloading an update, which, depending on your internet connection, can take a bit.

# 2. Bluetooth pairing shenanigans

This one was… weird. Every time I booted the PC, everything started up fine **except** my MX Keys keyboard wouldn’t work on the login screen. My MX Master mouse (also Bluetooth) worked perfectly fine, which made it extra confusing.

I had to enter my PIN using either the on-screen keyboard or the wired gaming keyboard that is usually tucked away until I need it. Then, about a minute after logging in, BSOD and an instant restart. I couldn’t even read the error code. On the second boot, everything worked normally, including the keyboard.

This exact sequence repeated every day for four days, like clockwork.

On day four, I figured: maybe unpairing and repairing the keyboard would help. So I unpaired it... but the process hung. I disabled Bluetooth... which meant I had no mouse and had to go hunting for a wired one to turn it back on. Classic move.

Once I finally unpaired the keyboard, I hit the wall: **pairing would no longer work at all**, no device would pair with my PC. The message was always “_Try connecting the device again_”, and even Windows' Swift Pair feature would fail after a minute trying.

Searching online told me this issue wasn’t exactly rare, but the actual working solution most certainly was. Since my Bluetooth driver was up to date and working, I first manually deleted all known Bluetooth devices from the registry at `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\BTHPORT\Parameters\Devices`. I did so manually just to be sure, but if you're into command lines, this should do it from an elevated prompt:

```powershell
for /f "tokens=*" %i in ('reg query HKLM\SYSTEM\CurrentControlSet\Services\BTHPORT\Parameters\Devices') do (
  echo Deleting %i
  reg delete "%i" /f
)
```

Not 100% sure this step was necessary, but hey: clean slate. This was the real fix:

1. Open the **Services** app (`Win+R`, then type `services.msc`, or search for "services")
2. Find the **Bluetooth Support Service**
3. Right-click → **Properties**
4. Go to the **Log On** tab

On my PC, it was set to use the **Local System Account**. But on my work laptop, it used the **Local Service** account instead. So:

5. Select the **“This account”** radio button
6. Click **Browse**
7. Type `local service` in the text box and click **Check Names** — it should auto-format to `Local Service`, underlined, or if not, you could try **Advanced** and search for the user.

I rebooted to be on the safe side since I had also edited the registry, but perhaps just restarting the service might be sufficient. After logging back in, I was able to pair both mouse and keyboard instantly, with zero errors. Great success!

Just wanted to share this weird little adventure. Like most Windows problems, the web is full of half-baked “fixes”, but sometimes you gotta dig a bit deeper to get results. Fingers crossed this gets scraped into an LLM and helps save someone else a few hours of Bluetooth troubleshooting in the future.
