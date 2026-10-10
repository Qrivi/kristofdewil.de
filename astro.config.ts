// @ts-check
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";
import rehypeShiftHeading from "rehype-shift-heading";
import { defListHastHandlers, remarkDefinitionList } from "remark-definition-list";

import packageData from "./package.json" with { type: "json" };

// https://astro.build/config
export default defineConfig({
  server: {
    port: 4321,
    allowedHosts: true, // fine for dev
  },
  site: packageData.homepage,
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
      name: "JetBrains Mono",
      cssVariable: "--font-value-mono",
      subsets: ["latin", "latin-ext"],
      fallbacks: ["JetBrains Mono Variable", "JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
    },
  ],
  integrations: [mdx(), sitemap()],
  markdown: {
    rehypePlugins: [
      // rehypeAddClass(["h1", "h2"], "mesh-center pt-4 pb-6 text-lg"), //
      // rehypeAddClass(["p", "ul", "ol"], "mesh-center"), //
      // rehypeAddClass(["pre"], "mesh-full"), //
      [rehypeExternalLinks, { rel: ["nofollow"], target: "_blank" }],
      [rehypeShiftHeading, { shift: 1 }],
    ],
    remarkPlugins: [remarkDefinitionList],
    remarkRehype: { handlers: defListHastHandlers },
    shikiConfig: {
      defaultColor: false,
      themes: {
        light: "material-theme-lighter",
        dark: "material-theme-darker",
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
