import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const experiences = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/experiences" }),
  schema: ({ image }) =>
    z.object({
      organization: z.string(),
      description: z.string(),
      link: z.string(),
      logo: image(),
      locationMap: z.object({
        image: z.string().min(1),
        alt: z.string().min(1),
        link: z.url(),
      }),
      titles: z.array(z.string()),
      startDate: z.date(),
      endDate: z.date().nullish(),
      locations: z.array(z.string()),
      technologies: z.partialRecord(z.enum(["backend", "frontend", "frontend-mobile", "data", "devops", "testing", "other"]), z.array(z.string().min(1)).min(1)),
      summary: z.array(z.string()),
    }),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.date(),
      editDate: z.date().nullish(),
      topics: z.array(z.string()),
      draft: z.boolean().nullish(),
    }),
});

export const collections = {
  experiences,
  posts,
};
