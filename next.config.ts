import type { NextConfig } from "next";

// GitHub Pages project sites are served from https://<user>.github.io/<repo>/,
// so production assets/links must be prefixed with the repo name. Dev stays at root.
const isProd = process.env.NODE_ENV === "production";
const repoBasePath = "/tees-deli1";

const nextConfig: NextConfig = {
  // Static HTML export — GitHub Pages serves files only (no Node server).
  output: "export",
  // Pages has no Image Optimization server, so serve images as-is.
  images: { unoptimized: true },
  // Emit /route/index.html so nested paths resolve cleanly on static hosting.
  trailingSlash: true,
  basePath: isProd ? repoBasePath : undefined,
  // NOTE: next.config redirects() are NOT supported by `output: export`, so the
  // old /breakfast-pizza -> /catering/breakfast-pizza redirect was removed.
};

export default nextConfig;
