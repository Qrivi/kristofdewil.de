// @ts-check
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";
import rehypeShiftHeading from "rehype-shift-heading";
import { defListHastHandlers, remarkDefinitionList } from "remark-definition-list";

import packageData from "./package.json" assert { type: "json" };

// https://astro.build/config
export default defineConfig({
  server: {
    port: 4321,
    allowedHosts: true, // fine for dev
  },
  site: packageData.homepage,
  integrations: [mdx(), react(), sitemap()],
  markdown: {
    rehypePlugins: [
      [rehypeExternalLinks, { rel: ["nofollow"], target: "_blank" }],
      [rehypeShiftHeading, { shift: 2 }],
    ],
    remarkPlugins: [remarkDefinitionList],
    remarkRehype: { handlers: defListHastHandlers },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
