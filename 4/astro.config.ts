import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import rehypeShikiji, { type RehypeShikijiOptions } from "rehype-shikiji";
import rehypeShiftHeading, {
  type Options as RehypeShiftHeadingOptions,
} from "rehype-shift-heading";

import {
  transformerCompactLineOptions,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationHighlight,
  transformerRemoveLineBreak,
  transformerRenderWhitespace,
} from "shikiji-transformers";

const rehypeShiftHeadingOptions: RehypeShiftHeadingOptions = {
  shift: 2,
};

const rehypeShikijiOptions: RehypeShikijiOptions = {
  themes: {
    light: "material-theme-lighter",
    dark: "material-theme-darker",
  },
  transformers: [
    transformerNotationDiff(),
    transformerNotationHighlight(),
    transformerNotationErrorLevel(),
  ],
};

// https://astro.build/config
export default defineConfig({
  integrations: [vue()],
  markdown: {
    rehypePlugins: [
      [rehypeShiftHeading, rehypeShiftHeadingOptions],
      [rehypeShikiji, rehypeShikijiOptions],
    ],
    syntaxHighlight: false,
  },
});
