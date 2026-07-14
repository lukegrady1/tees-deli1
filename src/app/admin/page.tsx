import type { Metadata } from "next";
import { isAdminConfigured, isSignedIn } from "@/lib/adminAuth";
import { formatPostedLabel, getFlyer } from "@/lib/specials";
import { SignInForm } from "./SignInForm";
import { FlyerUploader } from "./FlyerUploader";

export const metadata: Metadata = {
  title: "Post the specials",
  robots: { index: false, follow: false },
};

// Never prerender or cache this: it's per-request auth state, and if the
// password check short-circuits (unset env var) Next would otherwise bake in a
// static signed-out page.
export const dynamic = "force-dynamic";

/**
 * Where the owner posts the daily specials flyer. Deliberately one decision per
 * screen: sign in, choose a photo, put it up.
 */
export default async function AdminPage() {
  const configured = isAdminConfigured();
  const signedIn = configured && (await isSignedIn());
  const flyer = signedIn ? await getFlyer() : null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-6 py-16">
      {!configured ? (
        <p className="max-w-md text-lg text-stone">
          This page isn&rsquo;t set up yet — the <code>ADMIN_PASSWORD</code>{" "}
          environment variable is missing in Netlify.
        </p>
      ) : !signedIn ? (
        <SignInForm />
      ) : (
        <FlyerUploader
          current={
            flyer && {
              // postedAt busts the cache so a replaced flyer shows immediately.
              url: `/api/specials/flyer/?v=${encodeURIComponent(flyer.postedAt)}`,
              postedLabel: formatPostedLabel(flyer.postedAt),
            }
          }
        />
      )}
    </main>
  );
}
