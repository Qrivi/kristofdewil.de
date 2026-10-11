import type { APIRoute } from "astro";

import { createMarkdownProcessor } from "@astrojs/markdown-remark";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";

import { markdownOptions } from "~/markdown.config";

// RSS readers supply their own styling, so syntax highlighting is unnecessary.
const processor = createMarkdownProcessor({ ...markdownOptions, syntaxHighlight: false });

export const GET: APIRoute = async ({ site }) => {
  const markdown = await processor;
  const posts = (await getCollection("blog", ({ data }) => !data.draft && data.rss !== false)) //
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());

  const items = await Promise.all(
    posts.map(async (post) => {
      const link = `/blog/${post.id}`;
      const url = new URL(link, site);
      const { code } = await markdown.render(post.body ?? "");

      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.publishDate,
        link,
        categories: post.data.topics,
        content: sanitizeHtml(code, {
          allowedTags: [...sanitizeHtml.defaults.allowedTags, "img", "details", "summary"],
          allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            "*": ["id"],
            img: ["src", "alt", "title", "width", "height"],
          },
          transformTags: {
            "*": (tagName, attribs) => {
              // Feed readers need absolute URLs, including links to article headings.
              for (const attribute of ["href", "src"]) {
                if (attribs[attribute]) attribs[attribute] = new URL(attribs[attribute], url).href;
              }
              return { tagName, attribs };
            },
          },
        }),
      };
    }),
  );

  return rss({
    title: "Kristof Dewilde → Blog",
    description: "Blog posts by Kristof Dewilde about software development and technology.",
    site: site!,
    trailingSlash: false,
    customData: "<language>en</language>",
    items,
  });
};
