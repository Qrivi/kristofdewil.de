import type { AstroMarkdownOptions } from "@astrojs/markdown-remark";

import rehypeExternalLinks from "rehype-external-links";
import rehypeShiftHeading from "rehype-shift-heading";
import { defListHastHandlers, remarkDefinitionList } from "remark-definition-list";

import { rehypeInlineCodeBreaks } from "./utils/rehype-inline-code-breaks";

export const markdownOptions: AstroMarkdownOptions = {
  rehypePlugins: [[rehypeExternalLinks, { rel: ["nofollow"], target: "_blank" }], [rehypeShiftHeading, { shift: 1 }], rehypeInlineCodeBreaks],
  remarkPlugins: [remarkDefinitionList],
  remarkRehype: { handlers: defListHastHandlers },
  shikiConfig: {
    defaultColor: false,
    themes: {
      light: "material-theme-lighter",
      dark: "material-theme-darker",
    },
  },
};
