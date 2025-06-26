---
title: Running OracleDB 12 on Apple Silicon with Colima
description: OracleDB 12 won't run on ARM, not even in an emulated container, but there's a workaround.
publishDate: 2024-11-22
topics:
  - docker
  - macos
draft: false
---

In a previous work project, I had to deal with some pretty old codebases. Fortunately, they had all been containerized before the move to Kubernetes, but some of their dependencies were… ancient. One of those was OracleDB 12. And here’s the kicker: OracleDB 12 refuses to run on Apple Silicon — not even inside a container.

The issue? CPU architecture differences. OracleDB 12 is strictly for x86_64 (aka amd64), while my MacBook runs on aarch64 (aka arm64). Most container tools can emulate the architecture mismatch — at a performance cost — but for some reason, that trick doesn’t work with OracleDB 12. I had other projects requiring OracleDB 19, which emulated just fine in OrbStack on my Mac, but not 12. The container would spin up and just hang. No logs, no crashes, no love.

# Enter: Colima

Like with all dev headaches, there’s a workaround, and in this case, it’s [Colima](https://github.com/abiosoft/colima). Colima is an alternative, lightweight containerization tool with one important superpower: it lets you customize the tiny Linux VM that runs your containers.

The trick here is to not emulate the OracleDB container itself but rather the entire x86_64 Docker environment — a tiny x86_64 VM within which the OracleDB 12 container will run. That difference was enough to get OracleDB 12 running on my Apple Silicon MacBook Pro.

Installing Colima is a one-liner with Homebrew:
```shell
brew install colima
```

Then, start it with a few arguments to suit your needs:
```shell
colima start --cpu 4 --memory 8 --arch x86_64
```

Optional tuning includes:
-	`--vm-type=vz --vz-rosetta`: uses Rosetta instead of QEMU for emulation (but I haven’t yet tried this)
-	`--mount-type=virtiofs`: can drastically improve shared file performance (but I didn't need to mount any volumes)

# Colima and my workflow

I already had the `docker` and `docker-compose` CLIs installed, since I normally roll with [OrbStack](https://orbstack.dev). So all I had to do was switch the Docker context over to Colima:
```shell
docker context use colima
```

After that, my daily dance looked like this:
```shell
colima start          # No need to re-pass args; starts the previously created VM
docker context use colima
docker compose up -d  # OracleDB 12 is alive!
```

And once the DB was up, I’d switch back to OrbStack for everything else:
```shell
docker context use orbstack
```

Colima’s emulated VM is still noticeably slower than OrbStack, so I’d recommend only using it for containers that really need the emulated environment — like OracleDB 12. The nice thing is you can run both in parallel, and since both forward ports to the host, they can even interop smoothly.

If I wasn’t using OracleDB 12 all the time, I’d stop Colima after work with:
```shell
colima stop
```

But if you are using it regularly, you could consider having it auto-start on boot:
```shell
brew services start colima
```

Bonus tip: I use [Starship](https://starship.rs) for my shell prompt, and it has [a neat Docker Context module](https://starship.rs/config/#docker-context) that (you'd never guess) shows the active Docker context when it detects a `Dockerfile` or `docker-compose.yml` inside your project. Saved me a bunch of manual `docker context ls`.
