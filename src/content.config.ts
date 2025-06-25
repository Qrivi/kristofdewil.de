import {glob} from "astro/loaders";
import {defineCollection, z} from "astro:content";

const experiences = defineCollection({
  loader: glob({pattern: "**/*.{md,mdx}", base: "./src/content/experiences"}),
  schema: () =>
    z.object({
      organization: z.string(),
      link: z.string(),
      title: z.string(),
      startDate: z.date(),
      endDate: z.date().optional(),
      locations: z.array(z.string()),
      topics: z.array(z.string()),
      summary: z.array(z.string()),
    })
})

const notes = defineCollection({
  loader: glob({pattern: "**/*.{md,mdx}", base: "./src/content/notes"}),
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
  experiences,
  notes,
};
