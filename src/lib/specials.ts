import { getStore } from "@netlify/blobs";

/**
 * The current daily-specials flyer, stored in Netlify Blobs so the owner can
 * replace it from /admin without a code change or a redeploy.
 *
 * A flyer stays up until it is replaced or removed — it does not expire.
 *
 * Blobs are only wired up when running on Netlify (or under `netlify dev`).
 * Under a plain `next dev` every read here returns null, so the site falls back
 * to the built-in flyer in business.ts. That is why each call is guarded.
 */

const STORE_NAME = "specials";
const FLYER_KEY = "flyer";

export type Flyer = {
  contentType: string;
  /** ISO timestamp of when it was posted — also used to cache-bust the image. */
  postedAt: string;
};

function flyerStore() {
  // "strong" so the owner sees his own upload immediately; the default
  // (eventual) can serve the previous flyer for a few seconds after a write.
  return getStore({ name: STORE_NAME, consistency: "strong" });
}

function isFlyer(value: unknown): value is Flyer {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return typeof v.contentType === "string" && typeof v.postedAt === "string";
}

/** Metadata for the flyer currently on the site, or null if none is posted. */
export async function getFlyer(): Promise<Flyer | null> {
  try {
    const result = await flyerStore().getMetadata(FLYER_KEY);
    return result && isFlyer(result.metadata) ? result.metadata : null;
  } catch {
    return null;
  }
}

/** The flyer's image bytes, for the route that serves it. */
export async function getFlyerImage(): Promise<
  { body: ArrayBuffer; contentType: string } | null
> {
  try {
    const result = await flyerStore().getWithMetadata(FLYER_KEY, {
      type: "arrayBuffer",
    });
    if (!result?.data || !isFlyer(result.metadata)) return null;
    return { body: result.data, contentType: result.metadata.contentType };
  } catch {
    return null;
  }
}

/** Publish a new flyer, replacing whatever is currently up. */
export async function saveFlyer(
  body: ArrayBuffer,
  contentType: string,
  postedAt: string,
): Promise<void> {
  const metadata: Flyer = { contentType, postedAt };
  await flyerStore().set(FLYER_KEY, body, { metadata });
}

/** Take the current flyer down. The site reverts to its built-in fallback. */
export async function clearFlyer(): Promise<void> {
  await flyerStore().delete(FLYER_KEY);
}

/** "July 14" — how a posted date reads on the homepage and in the admin. */
export function formatPostedLabel(postedAt: string): string {
  return new Date(postedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    timeZone: "America/New_York",
  });
}
