import type { CollectionEntry } from "astro:content";

import { SITE_TITLE, SITE_NAME, SITE_DESCRIPTION } from "~/constants";

export type PageStructuredData =
  | { type: "ProfilePage" }
  | { type: "CollectionPage"; items: { name: string; path: string }[] }
  | { type: "BlogPosting"; entry: CollectionEntry<"blog"> }
  | { type: "WebPage"; organization?: { name: string; url: string } };

export function createStructuredData(site: URL, url: URL, name: string, description: string, data: PageStructuredData) {
  const person = { "@id": new URL("#person", site).href };
  const website = { "@id": new URL("#website", site).href };
  const page = { "@id": `${url.href}#webpage` };
  const article = { "@id": `${url.href}#article` };
  const list = { "@id": `${url.href}#list` };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...person,
        "@type": "Person",
        name: SITE_NAME,
        url: site.href,
        jobTitle: SITE_TITLE,
        mainEntityOfPage: { "@id": new URL("#webpage", site).href },
      },
      {
        ...website,
        "@type": "WebSite",
        url: site.href,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        publisher: person,
      },
      {
        ...page,
        "@type": data.type === "BlogPosting" ? "WebPage" : data.type,
        url: url.href,
        name,
        description,
        inLanguage: "en",
        isPartOf: website,
        about: person,
        ...(data.type === "ProfilePage" && { mainEntity: person }),
        ...(data.type === "CollectionPage" && { mainEntity: list }),
        ...(data.type === "BlogPosting" && { mainEntity: article }),
        ...(data.type === "WebPage" &&
          data.organization && {
            mentions: { "@type": "Organization", ...data.organization },
          }),
      },
      ...(data.type === "CollectionPage"
        ? [
            {
              ...list,
              "@type": "ItemList",
              numberOfItems: data.items.length,
              itemListElement: data.items.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: item.name,
                url: new URL(item.path, site).href,
              })),
            },
          ]
        : []),
      ...(data.type === "BlogPosting"
        ? [
            {
              ...article,
              "@type": "BlogPosting",
              url: url.href,
              headline: data.entry.data.title,
              description: data.entry.data.description,
              datePublished: data.entry.data.publishDate.toISOString(),
              dateModified: data.entry.data.editDate?.toISOString(),
              keywords: data.entry.data.topics,
              inLanguage: "en",
              author: person,
              publisher: person,
              mainEntityOfPage: page,
              isPartOf: website,
            },
          ]
        : []),
    ],
  };
}

export function serializeStructuredData(data: ReturnType<typeof createStructuredData>) {
  // JSON is inserted as raw script text; prevent content from closing the script element.
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
