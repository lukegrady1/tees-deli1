/**
 * basePath helper for assets in /public.
 *
 * On GitHub Pages the site is served from a subpath (/tees-deli1), set as
 * `basePath` in next.config. next/image with `unoptimized` does NOT prefix
 * basePath onto src values that point at the public folder, so we add it
 * ourselves for every image src. Keep this value in sync with next.config.
 */
export const BASE_PATH =
  process.env.NODE_ENV === "production" ? "/tees-deli1" : "";

/** Prefix a /public asset path with the basePath (e.g. "/logo.webp"). */
export const asset = (path: string): string => `${BASE_PATH}${path}`;
