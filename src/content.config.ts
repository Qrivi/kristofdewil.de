import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const notes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/notes" }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.date(),
      editDate: z.date().optional(),
      readTime: z.number(),
      topics: z.array(z.string()),
      draft: z.boolean().optional(),
    }),
});

export const collections = {
  notes,
};
