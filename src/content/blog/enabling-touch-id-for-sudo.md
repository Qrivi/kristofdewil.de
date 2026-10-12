---
title: Enabling Touch ID for sudo
description: Something of an open secret nowadays, but you can enable Touch ID for sudo authentication in your terminal on macOS.
publishDate: 2026-02-13
topics:
  - macos
draft: false
---

Back in 2021, I was still on a trusty 2015 MacBook Pro (with an excellent keyboard) when a new client project came with a perk: a company-provided MacBook Pro. I received what I believe was a 2019 model, which I had to swap for an M1 Pro a few months later. That quickly convinced me to finally retire my personal machine and upgrade too. Apple Silicon hits different.

Touch ID was new to me, and how well it was woven into macOS left an impression. Using my fingerprint instead of typing a password (or unlocking with my Apple Watch if I had too much time on my hands) felt natural almost immediately... which made it all the more jarring that the terminal still demanded a typed password for `sudo`, even in Apple's own Terminal app!

Since MacBooks with Touch ID had been around since 2016, people had already figured out that you could enable it for `sudo` by adding this line to `/etc/pam.d/sudo`:

```text
auth       sufficient     pam_tid.so
```

However, macOS updates revert that file, so for years I kept the alias below in my `zsh` configuration. It checks whether the line is already there and, if not, prepends it. I ran it after every update and moved on.

```shell
alias touchidterminal="if grep -q 'pam_tid\.so' /etc/pam.d/sudo; then echo Touch ID already enabled!; else sudo sed -i '.bak' '1s/^/auth       sufficient     pam_tid.so\'$'\n/g' /etc/pam.d/sudo && echo Touch ID enabled! fi"
```

About seven years later, a [short video](https://www.youtube.com/watch?v=KVCKc1-gHvI) I almost skipped taught me there's a better way: a set-and-forget solution that _does_ survive system updates!

Since macOS Sonoma, you've been able to use `/etc/pam.d/sudo_local` instead of `/etc/pam.d/sudo`. Apple even ships a `/etc/pam.d/sudo_local.template` with instructions, but here's a copy-pasteable one-liner to enable Touch ID for `sudo` on your machine:

```shell
echo "auth       sufficient     pam_tid.so" | sudo tee /etc/pam.d/sudo_local
# ... and type your password one last time
```

Some fun trivia about `sudo` to wrap up: `sudo` isn't really "authenticating" in the same sense as "logging in as a privileged user" (that's what `su -` or `sudo -i` are for). It's closer to a proof of presence: confirming that the person at the keyboard is who the terminal thinks they are, in case you walked away without locking your screen.

A successful `sudo` writes a timestamp to a temporary file so that it won't ask for your password or fingerprint again during a grace period. I believe that by default that period is 5 minutes on macOS, but if you really want to, you can change it with `sudo visudo` (add `Defaults        timestamp_timeout=5`). And if you want `sudo` to forget you immediately, `sudo -k` clears the timestamp so it'll ask again on the next invocation!

Also, [the project's logo](https://www.sudo.ws) is a sandwich based on [the XKCD Sandwich comic](https://xkcd.com/149/). Perhaps I should have limited the fun trivia to just this fact. 🤓
