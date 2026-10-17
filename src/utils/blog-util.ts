import type { CollectionEntry } from "astro:content";

// Share the build-time publication rule between routes, listings, and feeds.
export const isPublishedPost = ({ data }: CollectionEntry<"blog">) => !data.draft && data.publishDate <= new Date();
