// @ts-check

import { rehypeHeadingIds, unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

import packageData from "./package.json" with { type: "json" };
import { markdownOptions } from "./src/markdown.config";
import { rehypeHeadingLinks } from "./src/utils/rehype-heading-links";

// https://astro.build/config
export default defineConfig({
  server: {
    port: 4321,
    allowedHosts: true, // fine for dev
  },
  site: packageData.homepage,
  compressHTML: true,
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Pretendard",
      cssVariable: "--font-value-sans",
      subsets: ["latin", "latin-ext"],
      fallbacks: ["Inter Variable", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Literata",
      cssVariable: "--font-value-serif",
      subsets: ["latin", "latin-ext"],
      fallbacks: ["Georgia", "Cambria", "Times New Roman", "Times", "serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "JetBrains Mono",
      cssVariable: "--font-value-mono",
      subsets: ["latin", "latin-ext"],
      fallbacks: ["JetBrains Mono Variable", "JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
    },
  ],
  integrations: [mdx(), sitemap()],
  markdown: {
    processor: unified({
      ...markdownOptions,
      rehypePlugins: [...(markdownOptions.rehypePlugins ?? []), rehypeHeadingIds, rehypeHeadingLinks],
    }),
    shikiConfig: markdownOptions.shikiConfig,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
