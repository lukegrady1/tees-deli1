import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Admin access is a single shared password (Netlify env var ADMIN_PASSWORD),
 * good enough for "the owner posts a flyer" and nothing more sensitive.
 *
 * The cookie holds a hash of the password rather than the password itself, so
 * the secret isn't sitting in plaintext in his phone's cookie jar.
 */

const COOKIE_NAME = "tees_admin";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // a year — he shouldn't re-enter it

function tokenFor(password: string): string {
  return createHash("sha256").update(`tees-deli-admin:${password}`).digest("hex");
}

/** Constant-time compare so the token can't be guessed a byte at a time. */
function matches(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

/** False when ADMIN_PASSWORD is unset, so a misconfigured deploy locks down. */
export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function isCorrectPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return matches(tokenFor(password), tokenFor(expected));
}

export async function isSignedIn(): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const cookie = (await cookies()).get(COOKIE_NAME)?.value;
  if (!cookie) return false;
  return matches(cookie, tokenFor(expected));
}

export async function signInCookie(password: string): Promise<void> {
  (await cookies()).set(COOKIE_NAME, tokenFor(password), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function signOutCookie(): Promise<void> {
  (await cookies()).delete(COOKIE_NAME);
}
