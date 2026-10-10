import type { AstroMarkdownOptions } from "@astrojs/markdown-remark";

import rehypeExternalLinks from "rehype-external-links";
import rehypeShiftHeading from "rehype-shift-heading";
import { defListHastHandlers, remarkDefinitionList } from "remark-definition-list";

export const markdownOptions: AstroMarkdownOptions = {
  rehypePlugins: [
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
};
