import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

import { smartPunctuation } from "~/utils/text-util";

// Normalize frontmatter once for pages, listing cards, metadata, and RSS.
const prose = z.string().transform(smartPunctuation);

const StackCategory = z.enum(["backend", "frontend", "data", "devops", "testing", "other"]);
export type StackCategory = z.infer<typeof StackCategory>;

export const stackCategoryLabels = {
  backend: "Backend",
  frontend: "Frontend",
  data: "Data",
  devops: "DevOps",
  testing: "Testing",
  other: "Other tools",
} satisfies Record<StackCategory, string>;

// ----------//

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: () =>
    z.object({
      title: prose,
      description: prose,
      publishDate: z.date(),
      editDate: z.date().optional(),
      topics: z.array(z.string()),
      draft: z.boolean().optional(),
      rss: z.boolean().optional(),
    }),
});

const career = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/career" }),
  schema: () =>
    z.object({
      organization: prose,
      description: prose,
      link: z.string(),
      title: prose,
      startDate: z.date(),
      endDate: z.date().optional(),
      locations: z.array(z.string()),
      technologies: z.partialRecord(StackCategory, z.array(z.string().min(1)).min(1)),
      summary: z.array(z.string()),
    }),
});

export const collections = {
  blog,
  career,
};
