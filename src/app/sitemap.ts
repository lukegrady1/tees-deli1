import type { MetadataRoute } from "next";
import { SITE_URL, cateringOfferings } from "@/lib/business";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/catering",
    // Every catering offering's own page (breakfast-pizza included via its slug).
    ...cateringOfferings.map((o) => `/catering/${o.slug}`),
    "/menu",
    "/contact",
  ];
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
