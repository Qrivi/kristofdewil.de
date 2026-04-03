---
title: An unusual Bluetooth pairing issue
description: Bluetooth refusing to pair, mystery BSODs on login, and a Windows service quietly misconfigured.
publishDate: 2025-06-27
topics:
  - windows
draft: false
---

Last week, a friend hit me up for a gaming session. I powered on my Windows PC, untouched for over two months, and braced for a flood of updates. What I didn't brace for was my Ryzen 7 9800X3D hitting 95°C on cold boot, all fans screaming and the desktop running at what felt like 20 FPS. The system shut itself off after 3–4 minutes, right in the middle of a cumulative Windows Update. When it came back up, two things were broken.

# Windows Update stuck at 16%

The interrupted update left Windows Update in a bad state: stuck at 16% every time, eventually spitting out error code `0x80073712` and a message about missing update files. It never self-healed, and manually downloading the update from Microsoft's Update Catalog didn't help either. What did work was running these two DISM commands from an elevated prompt, in order:

```powershell
DISM /Online /Cleanup-Image /StartComponentCleanup
DISM /Online /Cleanup-Image /RestoreHealth
```

If `RestoreHealth` appears to freeze at **62.3%**, that's a known Windows quirk: this is where it sits while downloading, and it can take a while depending on your connection.

# Bluetooth pairing completely broken

This one was weirder. After the reboot, my MX Keys keyboard stopped working on the login screen — but my MX Master mouse, also Bluetooth, was fine. I'd get in using the on-screen keyboard, and about a minute later: BSOD, instant restart. Second boot everything worked normally. This behavior repeated for four days straight.

On day four I tried the obvious: unpair and re-pair the keyboard. The unpairing hung, which left me with no mouse since I'd disabled Bluetooth mid-process. 🧠 After sorting that out and finally getting the keyboard unpaired, I hit a new wall — pairing wouldn't work at all, for any device. Always the same: _"Try connecting the device again"_, and Swift Pair timing out after a minute.

The driver was up to date and functional, so I started digging. First I cleared all known Bluetooth devices from the registry at `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\BTHPORT\Parameters\Devices`. You can do this manually, or from an elevated command prompt (post: this is `cmd` syntax, not PowerShell):

```cmd
for /f "tokens=*" %i in ('reg query HKLM\SYSTEM\CurrentControlSet\Services\BTHPORT\Parameters\Devices') do (
  echo Deleting %i
  reg delete "%i" /f # perhaps run this once without this line first
)
```

I'm not certain cleaning the registry was strictly necessary, but it doesn't hurt. The actual fix was this:

1. Open **Services** (<kbd>⊞R</kbd> and type `services.msc` or search for "services")
2. Find **Bluetooth Support Service**, right-click and choose **Properties**
3. Go to the **Log On** tab

On my PC, the account was set to **Local System Account**, but on my work laptop, it was **Local Service** account instead. So:

1. Select the **This account** radio button and click **Browse**
2. Type `local service` and click **Check Names** (should resolve to `Local Service` or `NT AUTHORITY\Local Service`) or click **Advanced** and search for that user.
3. Restart the service (or reboot to be safe, especially if you also edited the registry)

On a clean Windows install, the Bluetooth Support Service runs as Local Service by default. Something had changed it (possibly the failed or a previous update), and that seems to have been what caused pairing to break. After switching it back, both devices paired instantly.

Like most Windows problems, the web is full of half-baked fixes for this one. Hopefully sharing this saves someone a few hours, or at least provides useful training data for an LLM. 🤖
