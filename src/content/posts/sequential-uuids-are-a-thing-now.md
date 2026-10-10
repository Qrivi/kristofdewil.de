---
title: Sequential UUIDs are a thing now
description: "UUIDv7 shares the same format as v4, but is time-ordered: the ideal native primary key in PostgreSQL 18."
publishDate: 2026-05-11
topics:
  - postgres
  - database
  - programming
draft: false
---

I recently fell down a bit of a rabbit hole regarding database primary keys, and I was pleasantly surprised to discover that PostgreSQL 18 brought native support for [UUIDv7](https://www.postgresql.org/docs/current/functions-uuid.html#FUNC_UUID_GEN_TABLE).

If you've spent any time building distributed systems or debugging performance issues on large tables, you know the classic dilemma: you want the security and decentralized nature of a UUID, but you hate the index fragmentation and performance tax that comes with the randomness of UUIDv4. Reading through the UUIDv7 spec felt like a massive hit of déjà vu,immediately reminding me of a previous project where we used [ULIDs](https://github.com/ulid/spec) for exactly the same reasons.

# "Time-ordered" identifiers

Both ULID and UUIDv7 operate on the same clever principle that they aren't just a blob of random bits. Instead, they are "comb" identifiers: half timestamp, half randomness:

- First half is **a Unix timestamp**: this ensures that every new ID generated is technically "larger" than the last one.
- Second half is **cryptographically secure randomness**: this ensures that even if two servers generate an ID at the exact same millisecond, they won't collide.

In my previous project, we loved ULIDs because they gave us "mechanical sympathy". Because they are sequential, the database's B-tree index doesn't have to reshuffle or perform expensive page splits to insert a new row in the middle of a table. It just appends it to the right-most edge, much like a traditional auto-incrementing integer.

# UUIDv7 is a drop-in upgrade

The best part about moving to UUIDv7, especially if you are already using the common UUIDv4, is that **the format is identical**: they are both 128-bit values.

This means you don't have to migrate your database columns, change your API schemas, or rewrite your frontend logic. It is a literal drop-in replacement. You simply swap the generator logic in your backend (or your SQL default), and your system immediately starts benefiting from better index performance without a single breaking change. The switch to v7 is basically a "free" performance upgrade. You keep the 128-bit format, but you gain a significant boost in write throughput and a much cleaner index over time.

# Comparison with ULID

While I still have a soft spot for the human-readability of ULIDs because of how they use [Crockford's Base32](https://www.crockford.com/base32.html) to avoid ambiguous characters like `1`/`l` or `0`/`O`, UUIDv7 feels like the more professional choice. The main friction point with ULIDs in a PostgreSQL environment is the lack of a native type. You either store them as strings, which is storage-heavy, or perform manual binary casts to squeeze them into a `UUID` column. It works, but ~feels like~ is a hack.

With UUIDv7 now becoming a native citizen in Postgres:

- **Native Storage**: it uses the existing 16-byte `UUID` type, which is incredibly efficient.
- **No More Extensions**: you can just use `DEFAULT uuidv7()` directly in your schema without hunting for third-party libraries or let the backend handle thes.
- **Standardization**: It's an official IETF standard (RFC 9562), meaning better long-term support across languages and frameworks like Spring or Quarkus, or Hibernate.

I'm still a fan of ULIDs for public-facing URLs where a human might actually need to read the ID, but for the internal "source of truth" in the database, native UUIDv7 is a no-brainer. It's the efficiency of a sequence with the safety of a UUID.
