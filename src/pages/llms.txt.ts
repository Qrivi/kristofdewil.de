import type { APIRoute } from "astro";

import { getCollection } from "astro:content";

import { isPublishedPost } from "~/utils/blog-util";

export const GET: APIRoute = async ({ site }) => {
  const posts = (await getCollection("blog", isPublishedPost)).sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
  const careers = (await getCollection("career")).sort((a, b) => b.data.startDate.getTime() - a.data.startDate.getTime());

  const toListItem = (title: string, path: string, description: string) => `- [${title}](${new URL(path, site).href}): ${description}`;

  const content = [
    "# Kristof Dewilde",
    "",
    "> Personal website of Kristof Dewilde, a software engineer with a backend-leaning full stack profile and a focus on Java. The site contains his professional background and blog posts about software development, operating systems, developer tooling, and technical troubleshooting. The content is in English.",
    "",
    "Start with the home page for an introduction and the career timeline for professional experience. Blog posts share practical solutions and lessons from technical projects. Links below point to the website's HTML pages; dedicated Markdown versions are not available.",
    "",
    "## Website",
    toListItem("Home", "/", "About Kristof, with recent blog posts and career highlights."),
    toListItem("Blog", "/blog", "All blog posts about things built, fixed, and figured out."),
    toListItem("Career", "/career", "Professional experience, roles, contributions, and technology stacks, newest first."),
    "",
    "## Blog posts",
    ...posts.map((post) => toListItem(post.data.title, `/blog/${post.id}`, post.data.description)),
    "",
    "## Career experience",
    ...careers.map((career) => toListItem(`${career.data.organization} — ${career.data.title}`, `/career/${career.id}`, career.data.description)),
    "",
    "## Optional",
    toListItem("RSS feed", "/rss.xml", "Full-content feed of published blog posts that are included in RSS."),
    toListItem("Sitemap", "/sitemap-index.xml", "XML sitemap index for discovering website pages."),
    "",
  ].join("\n");

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
