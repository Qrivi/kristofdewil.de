import type { APIRoute, GetStaticPaths } from "astro";

import { getCollection } from "astro:content";

import type { OpenGraphCard } from "~/utils/open-graph";

import { BLOG_DESCRIPTION, CAREER_DESCRIPTION, SITE_NAME, SITE_TITLE } from "~/constants";
import { isPublishedPost } from "~/utils/blog-util";
import { dateOfCareerForHuman, dateOfPostForHuman } from "~/utils/date-util";
import { renderOpenGraphCard } from "~/utils/render-open-graph";

export const prerender = true;

export const getStaticPaths = (async () => {
  const [blog, career] = await Promise.all([getCollection("blog", isPublishedPost), getCollection("career")]);

  const cards: { page: string; card: OpenGraphCard }[] = [
    { page: "index", card: { title: SITE_NAME, subtitle: SITE_TITLE } },
    { page: "blog", card: { title: "Blog", subtitle: BLOG_DESCRIPTION } },
    { page: "career", card: { title: "Career", subtitle: CAREER_DESCRIPTION } },
    { page: "404", card: { title: "Page not found", subtitle: "The page you are looking for does not exist." } },
    ...blog.map(({ id, data }) => ({
      page: `blog/${id}`,
      card: { title: data.title, subtitle: data.description, section: "Blog", date: dateOfPostForHuman(data.publishDate) },
    })),
    ...career.map(({ id, data }) => ({
      page: `career/${id}`,
      card: {
        title: data.organization,
        subtitle: data.title,
        section: "Career",
        date: `${dateOfCareerForHuman(data.startDate)} — ${dateOfCareerForHuman(data.endDate)}`,
      },
    })),
  ];

  return cards.map(({ page, card }) => ({ params: { page }, props: { card } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOpenGraphCard(props.card);
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
