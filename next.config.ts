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
};

export default nextConfig;
