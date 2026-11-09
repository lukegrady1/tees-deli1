import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Netlify serves the images as-is (no Image Optimization configured yet).
  images: { unoptimized: true },
  // Keep the /route/ trailing-slash URLs the site already ships and is indexed on.
  trailingSlash: true,
  experimental: {
    // The specials flyer is uploaded through a Server Action. Phone photos get
    // downscaled in the browser first, but leave headroom for a big one.
    serverActions: { bodySizeLimit: "6mb" },
  },
  async redirects() {
    // The pre-2026 site was flat .html files on a shared host. Google still
    // crawls those URLs (Search Console lists them under "Not found (404)"),
    // and a few of them carry inbound links, so each one is sent permanently
    // to the page that replaced it instead of dying as a 404. Dots are
    // escaped so they match literally, not as a wildcard.
    const legacy: Record<string, string> = {
      "/index\\.html": "/",
      "/catering\\.html": "/catering/",
      "/menus\\.html": "/menu/",
      "/daily-breakfast\\.html": "/menu/",
      "/daily-lunch\\.html": "/menu/",
      "/tee-pack\\.html": "/menu/",
      "/thanksgiving-menu\\.html": "/catering/hot-entrees/",
      "/platters\\.html": "/catering/platters/",
      "/boxed-lunches\\.html": "/catering/college-team-boxed-lunches/",
      "/breakfast-pizza\\.html": "/catering/breakfast-pizza/",
      "/bereavement\\.html": "/catering/bereavement-meals/",
      "/photo-gallery\\.html": "/catering/",
      // An early slug for the breakfast page that Google picked up before it
      // was renamed.
      "/catering/corporate-breakfast-lunch/": "/catering/breakfast-meetings/",
    };
    return Object.entries(legacy).map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
