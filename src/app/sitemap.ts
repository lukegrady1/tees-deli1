import type { MetadataRoute } from "next";
import { SITE_URL, cateringOfferings } from "@/lib/business";

export const dynamic = "force-static";

/**
 * Every URL here carries its trailing slash because `trailingSlash: true` in
 * next.config makes `/catering` a 308 to `/catering/`. Search Console was
 * reporting the slash-less sitemap entries as "Page with redirect" and
 * "Discovered – currently not indexed" — a sitemap must list the final,
 * canonical form of each URL, never one that redirects.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/catering/",
    // Every catering offering's own page (breakfast-pizza included via its slug).
    ...cateringOfferings.map((o) => `/catering/${o.slug}/`),
    "/menu/",
    "/contact/",
  ];
  const lastModified = new Date();
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
