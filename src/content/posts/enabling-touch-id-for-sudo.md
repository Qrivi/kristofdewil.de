---
title: Enabling Touch ID for sudo
description: Quite a public secret nowadays, but you can enable Touch ID for sudo authentication in your terminal on macOS.
publishDate: 2026-02-13
topics:
  - macos
draft: false
---

In 2021 I was still on a trusty 2015 MacBook Pro when a new client project came with a perk: a company provided MacBook Pro for their developers. I received, I believe, a 2019 model that a few months in I swapped for an M1 Pro, which quicky convinced me to finally retire and upgrade my personal machine too.

Touch ID was new to me, and how well it was woven into macOS left an impression. Using my fingerprint instead of typing a password (or unlocking with Apple Watch if I had too much time on my hands) felt natural almost immediately... which made it all the more jarring that the terminal still demanded a typed password for `sudo`, even in Apple's own Terminal app!

MacBooks with Touch ID had been around since 2016, and people had figured out early on that you could enable it for `sudo` by adding this line to `/etc/pam.d/sudo`:

```text
auth       sufficient     pam_tid.so
```

However: macOS updates do revert that file, so for years I kept the alias below sourced in my `zsh`. It checks whether the line is already there, and if not, prepends it. Ran it after every update, and moved on.

```shell
alias touchidterminal="if grep -q 'pam_tid\.so' /etc/pam.d/sudo; then echo Touch ID already enabled!; else sudo sed -i '.bak' '1s/^/auth       sufficient     pam_tid.so\'$'\n/g' /etc/pam.d/sudo && echo Touch ID enabled! fi"
```

About seven years later, a [short video](https://www.youtube.com/watch?v=KVCKc1-gHvI) I almost skipped taught me there's a better way: a set-and-forget solution that _does_ survive system updates!

Since macOS Sonoma, you can use `/etc/pam.d/sudo_local` instead of `/etc/pam.d/sudo`. Apple even ships a `/etc/pam.d/sudo_local.template` with instructions, but here's your copy-pasteable oneliner:

```shell
echo "auth       sufficient     pam_tid.so" | sudo tee /etc/pam.d/sudo_local
# ... and type your password one last time
```

Some fun trivia about `sudo` to wrap up: `sudo` isn't really "authenticating" in the same sense as "logging in as a privileged user" (that's what `su -` or `sudo -i` are for). It's closer to a proof of presence: confirming that the person at the keyboard is who the terminal thinks they are, in case you walked away without locking your screen.

A succesful `sudo` writes a timestamp to a temporary file so that within a grace period it won't ask for password/fingerprint again. I believe on macOS that period is 5 minutes by default, but if you really want to, you can edit this with `sudo visudo` (add `Defaults        timestamp_timeout=5`). And if you want `sudo` to forget you immediately: `sudo -k` clears the timestamp so it'll ask again on the next invocation!
