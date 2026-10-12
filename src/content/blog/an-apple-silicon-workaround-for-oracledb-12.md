---
title: An Apple Silicon workaround for OracleDB 12
description: A Colima setup for running OracleBD 12 containers on a Mac with an Apple Silicon chip.
publishDate: 2024-11-22
topics:
  - docker
  - macos
draft: false
---

During a project for a previous client, I had to deal with some seriously old codebases. They'd all been containerized before the move to Kubernetes, which helped... until I met OracleDB 12. That one refuses to run on Apple Silicon, and unlike most x86_64 images, you can't just emulate your way out of it.

The root cause is subtle. Most container tools handle the amd64→arm64 mismatch fine: they pull the image, QEMU's emulation steps in, and you pay a performance tax but it just works™. OracleDB 12 however breaks at a lower level, because it relies on certain kernel behaviors during initialization that QEMU doesn't faithfully replicate. The container spins up, hangs silently, and that's it. No logs, no crash, no useful signal. For comparison, OracleDB 19 emulated just fine under [OrbStack](https://orbstack.dev) on the same machine. The hanging is specific to version 12.

# Enter Colima

The fix isn't to emulate the OracleDB container, but to emulate the entire Docker environment. [Colima](https://colima.run) lets you spin up a lightweight Linux VM with a specific architecture, meaning the Docker daemon itself can run as x86_64. OracleDB 12 never knows it's on ARM hardware.

```shell
brew install colima
colima start --cpu 4 --memory 8 --arch x86_64
```

This creates a QEMU-backed x86_64 VM. Everything inside it — the daemon, the containers, the kernel interface — is x86_64. That's the difference that makes OracleDB 12 happy.

A couple of optional flags worth knowing about:

- `--vm-type=vz --vz-rosetta`: switches from QEMU to Apple's Virtualization Framework with Rosetta 2 for x86_64 translation. Faster in theory, but has Rosetta handle userspace binaries. If OracleDB 12's problem is at the kernel interface level, this may not help. I have not tested this.
- `--mount-type=virtiofs`: significantly faster volume mounts. But not needed if you're not mounting host directories into the container.

# Fitting it into your workflow

If you're already using OrbStack (or Docker Desktop), Colima registers itself as a separate Docker context. You don't need to touch your existing setup:

```shell
docker context use colima
docker compose up -d  # OracleDB 12 is alive in Colima
```

When you're done, switch back:

```shell
docker context ls # if you're unsure which contexts exist
docker context use orbstack
```

Colima and OrbStack run happily in parallel and can both forward ports to the host. My day-to-day rhythm once the VM was created:

```shell
colima start # remembers previous config, no need to repeat flags
docker context use colima
docker compose up -d oracle12
docker context use orbstack
docker compose up -d service1 service2 # or use service profiles or even a separate compose file for just OracleDB 12
# daily grind...
colima stop # optional, but frees up some RAM at the end of the day
```

The emulated VM is noticeably slower than OrbStack's native ARM environment, so I'd keep Colima reserved for containers that actually need x86_64. If you're using OracleDB 12 constantly and want Colima to start on boot:

```shell
brew services start colima
```

Bonus tip not to lose track of your context, as switching contexts manually is error-prone: [Starship](https://starship.rs) has a [Docker Context module](https://starship.rs/config/#docker-context) that shows your active context in the prompt whenever it detects a `Dockerfile` or `docker-compose.yml` in the project. Saved me from pushing to the wrong daemon more than once.
