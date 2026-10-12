---
title: Keeping your Mac on macOS Sequoia
description: Staying on Sequoia can be as simple as changing your update channel in System Settings.
publishDate: 2026-02-28
topics:
  - macos
draft: false
---

I'm very happy with macOS Sequoia on my daily driver. Especially for EU users like me, Tahoe is an even harder sell: Apple has held back some (all, except a new dark mode in Preview?) features here, citing "regulatory uncertainty" around the Digital Markets Act. Tahoe feels like an overall regression, with an inconsistent UI that doesn't really belong on a desktop OS. I don't think that's a particularly unpopular opinion.

Yet macOS kept reminding me about Tahoe through periodic notifications and dark patterns in System Settings that can sneak in a major upgrade when you'd think you're installing the latest Sequoia patch — the sort of thing we used to make Windows 11 memes about. Turns out there's a very simple way to stop those prompts.

# The macOS Sequoia public beta

Open **System Settings → General → Software Update**, click the info button next to **Beta Updates**, and select **macOS Sequoia Public Beta**. If beta updates aren't available, you may need to enroll your Apple Account in the [Apple Beta Software Program](https://beta.apple.com/) first, though I do not believe this is a requirement in 2026 anymore. Choosing that channel will stop Software Update from offering Tahoe with no configuration profile or terminal commands needed!

Sequoia's remaining updates will focus on security and maintenance, so I'm comfortable using its beta channel. It is still a beta channel, though: selecting it means receiving prerelease Sequoia updates when Apple makes them available. I wouldn't assume those are always identical to the stable releases. That's something I am fine with, but you might reconsider.

# More work for not really the same result

I also saw [John Gruber link to a post by Rob Griffiths](https://daringfireball.net/linked/2026/02/27/how-to-block-the-upgrade-to-tahoe-alerts-and-system-settings-indicator) about suppressing the Tahoe upgrade with a configuration profile. That approach uses a [GitHub project](https://github.com/travisvn/stop-tahoe-update) with scripts to prepare and install the profile.

For one Mac (that without Xcode tools I don't think has `git`), that script feels like overkill to me. Cloning a repository and running scripts in the terminal adds quite a few steps when the thing you ultimately need is one small `.mobileconfig` file. The scripts can be useful for managing the profile, but I'd rather start with the file itself.

I also believe the claim that this is pseudo-permanent to be incorrect: Apple's [documented deferral window](https://developer.apple.com/documentation/devicemanagement/restrictions) runs for up to 90 days _from a software release's availability_, not from the day you install the profile. If the offered Tahoe release is already outside that window, the profile might not hide it at all. Reinstalling it doesn't restart the clock.

If you'd still like to try it while staying on stable Sequoia releases, here's a cleaned-up version of the profile with only major-upgrade deferral enabled:

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

This defers major OS updates by the maximum configurable 90 days, while leaving Sequoia’s own minor updates alone. If you want to suppress those too, set forceDelayedSoftwareUpdates to true and add these 2 lines beneath it:

```xml
<key>enforcedSoftwareUpdateMinorOSDeferredInstallDelay</key><integer>90</integer>
<key>enforcedSoftwareUpdateNonOSDeferredInstallDelay</key><integer>90</integer>
```

Save this as a plain-text file named `stay-on-sequoia.mobileconfig`, double-click it, and approve its installation in **System Settings → General → Device Management**. If you're using TextEdit, choose **Format → Make Plain Text** before saving, and make sure it doesn't append `.txt` to the filename.

Funnily enough, this takes me back to the iOS jailbreak days, when people would install a tvOS management profile to stop their iPhone from talking to Apple’s update servers. Some things don’t change.
