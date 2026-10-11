---
title: No thanks, I rather stay on Sequoia
description: The latest macOS update is not for me and how I prevent my Mac from accidentally updating.
publishDate: 2026-02-28
topics:
  - macos
draft: false
---

No need for me to be the next person to give you a plethora of reasons why macOS Tahoe is not a good system update, for many many reasons across different fields. For European users, macOS Tahoe isn't much of an upgrade anyway, as Apple has disabled most of its headline features in the EU due to regulatory uncertainty around the Digital Markets Act. Though I've heard Preview has dark mode now. That's awesome! But aside from that I'm fine on Sequoia for now.

What I'm _not_ fine with is macOS ~~nagging~~ nudging me toward an upgrade I didn't ask for with periodic notifications and dark patterns in the System Settings layout that can sneak in a major upgrade when you think you're just installing the latest Sequoia patch (things we'd make Windows memes about).

I was surprised when I saw [John Gruber linking](https://daringfireball.net/linked/2026/02/27/how-to-block-the-upgrade-to-tahoe-alerts-and-system-settings-indicator) a post and [GitHub repo](https://github.com/travisvn/stop-tahoe-update) with a script that generates a device management profile to postpone updates. Though in my opinion: a script in a repo that you need to clone with git and run in the terminal to create and configure a management profile... that just sounds like a management profile with extra steps. It introduces many moving parts and hurdles for non-technical people. All you really need is the `.mobileconfig` file itself. Here's a slightly cleaned-up version:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>PayloadContent</key>
  <array>
    <dict>
      <key>PayloadType</key><string>com.apple.applicationaccess</string>
      <key>PayloadVersion</key><integer>1</integer>
      <key>PayloadIdentifier</key><string>org.stayonsequoia.restrictions</string>
      <key>PayloadUUID</key><string>934F442D-F089-4C98-BF75-4AD2F4B263CC</string>
      <key>PayloadEnabled</key><true/>
      <key>PayloadDisplayName</key><string>Software Update Deferrals</string>
      <key>forceDelayedMajorSoftwareUpdates</key><true/>
      <key>enforcedSoftwareUpdateMajorOSDeferredInstallDelay</key><integer>90</integer>
      <key>forceDelayedSoftwareUpdates</key><false/>
    </dict>
  </array>
  <key>PayloadType</key><string>Configuration</string>
  <key>PayloadVersion</key><integer>1</integer>
  <key>PayloadIdentifier</key><string>org.stayonsequoia.profile</string>
  <key>PayloadUUID</key><string>806B5030-A5CA-4186-A43E-AAFD0FB4D70B</string>
  <key>PayloadDisplayName</key><string>Stay on Sequoia: Update Deferrals</string>
</dict>
</plist>
```

This defers major OS updates by the maximum configurable 90 days, while leaving Sequoia's own minor updates alone. If you want to suppress those too, set `forceDelayedSoftwareUpdates` to `true` and add these 2 lines beneath it:

```xml
<key>enforcedSoftwareUpdateMinorOSDeferredInstallDelay</key><integer>90</integer>
<key>enforcedSoftwareUpdateNonOSDeferredInstallDelay</key><integer>90</integer>
```

I believe the UUIDs in the config profile need to be unique per device, and reinstalling the same profile after 90 days should work fine without changing them. So really, sharing a ready-made `.mobileconfig` file has a wider reach than a script: no terminal required, but paste the XML into a new file, name it `anything.mobileconfig`, double-click it, and confirm in System Settings. Done.

# Alternative: the Sequoia public beta

There's actually a simpler approach that requires no profile at all: enroll in Sequoia's public beta program! Now that Tahoe has shipped, Sequoia will realistically only receive security updates, meaning beta and stable are likely to stay close. No profile to manage, no repo to clone: just System Settings → General → Software Update, and enable beta updates.

Funnily enough, this takes me back to the iOS jailbreak days, when people would install a tvOS management profile to stop their iPhone from talking to Apple's update servers. Some things don't change.
