export type OpenGraphCard = {
  title: string;
  subtitle: string;
  section?: string;
  date?: string;
};

// Keep image URLs identical for canonical paths with or without a trailing slash.
export function openGraphImagePath(pathname: string) {
  const page = pathname.replace(/^\/+|\/+$/g, "") || "index";
  return `/opengraph/${page}.png`;
}
