import type { APIRoute } from "astro";

import mdxRenderer from "@astrojs/mdx/server.js";
import rss from "@astrojs/rss";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { getCollection, render } from "astro:content";
import sanitizeHtml from "sanitize-html";

export const GET: APIRoute = async ({ site }) => {
  const container = await AstroContainer.create();
  container.addServerRenderer({ renderer: mdxRenderer });
  const posts = (await getCollection("blog", ({ data }) => !data.draft && data.rss !== false)) //
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());

  const items = await Promise.all(
    posts.map(async (post) => {
      const link = `/blog/${post.id}`;
      const url = new URL(link, site);
      // Render compiled content so MDX imports and components work just as on the site.
      const { Content } = await render(post);
      const code = await container.renderToString(Content, { request: new Request(url) });

      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.publishDate,
        link,
        categories: post.data.topics,
        content: sanitizeHtml(code, {
          // Layout-only code breaks can appear as literal markup in feed readers.
          allowedTags: [...sanitizeHtml.defaults.allowedTags.filter((tag) => tag !== "wbr"), "img", "details", "summary"],
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
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
    customData: `
      <language>en</language>
      <atom:link href="${new URL("rss.xml", site)}" rel="self" type="application/rss+xml" />
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <image>
        <url>${new URL("feed-icon.png", site)}</url>
        <title>Kristof Dewilde → Blog</title>
        <link>${site}</link>
        <width>128</width>
        <height>128</height>
      </image>
    `,
    items,
  });
};
