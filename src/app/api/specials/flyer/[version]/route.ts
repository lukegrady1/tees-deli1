import { getFlyerImage } from "@/lib/specials";

/**
 * Serves the owner-uploaded specials flyer from Netlify Blobs.
 *
 * The version is part of the *path*, not a query string, on purpose. The
 * response is cached for a year, and Netlify's CDN keys route-handler responses
 * on the path only (its Netlify-Vary header lists just Next's own internal
 * query params), so a `?v=` cache-buster was ignored and every new flyer kept
 * serving the first one that was cached. A new path per post is a new cache key.
 *
 * Whatever the version says, this always serves the flyer that is up now; the
 * segment exists only to give each post its own URL. See flyerUrl() in
 * lib/specials.ts.
 */
export async function GET() {
  const flyer = await getFlyerImage();

  if (!flyer) {
    return new Response("No flyer posted", {
      status: 404,
      headers: { "Cache-Control": "no-store" },
    });
  }

  return new Response(flyer.body, {
    headers: {
      "Content-Type": flyer.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
