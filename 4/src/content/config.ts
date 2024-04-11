import { z, defineCollection } from "astro:content";

const experiences = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    link: z.string(),
    location: z.string(),
    startDate: z.date(),
    endDate: z.date().nullish(),
    tags: z.array(z.string()),
    jobs: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    ),
  }),
});

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    readTime: z.number(),
    tags: z.array(z.string()),
    draft: z.boolean().nullish(),
  }),
});

export const collections = {
  experiences,
  posts,
};
