// @ts-check
import sitemap from "@astrojs/sitemap";
import vue from "@astrojs/vue";
import {
  // transformerCompactLineOptions,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationHighlight,
  // transformerRemoveLineBreak,
  // transformerRenderWhitespace,
} from "@shikijs/transformers";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";
import rehypeShiftHeading from "rehype-shift-heading";

// https://astro.build/config
export default defineConfig({
  site: "https://kristofdewil.de",
  integrations: [sitemap(), vue()],
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          rel: ["nofollow"],
          target: "_blank",
        },
      ],
      [
        rehypeShiftHeading,
        {
          shift: 2,
        },
      ],
    ],
    shikiConfig: {
      themes: {
        light: "material-theme-lighter",
        dark: "material-theme-darker",
      },
      transformers: [transformerNotationDiff(), transformerNotationHighlight(), transformerNotationErrorLevel()],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
