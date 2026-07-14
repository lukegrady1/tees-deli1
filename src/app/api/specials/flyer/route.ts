import { getFlyerImage } from "@/lib/specials";

/**
 * Serves the owner-uploaded specials flyer from Netlify Blobs.
 *
 * The homepage requests this with a `?v=<postedAt>` cache-buster, so the URL
 * changes whenever a new flyer is published and the response can be cached hard.
 */
export async function GET() {
  const flyer = await getFlyerImage();

  if (!flyer) {
    return new Response("No flyer posted", { status: 404 });
  }

  return new Response(flyer.body, {
    headers: {
      "Content-Type": flyer.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
