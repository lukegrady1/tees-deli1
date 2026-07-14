# Posting the daily specials

## For the owner

1. On your phone, go to **teesdeli.com/admin** (bookmark it — add it to your home screen).
2. Type the password. You only have to do this once; the phone remembers you.
3. Tap **Choose flyer photo** and pick today's flyer, or take a photo of it.
4. Check the picture looks right, then tap **Put it on the website**.

That's it. The flyer is on the homepage right away.

It stays up until you post a new one — it will **not** disappear overnight. To
take it down without replacing it, tap **Take this flyer down**.

## For whoever maintains the site

The flyer lives in [Netlify Blobs](https://docs.netlify.com/build/data-and-storage/netlify-blobs/),
not in the repo, so posting one needs no commit and no deploy.

- `src/app/admin/` — the sign-in and upload screens, and their Server Actions.
- `src/lib/specials.ts` — reads/writes the flyer blob.
- `src/lib/adminAuth.ts` — the shared-password check.
- `src/app/api/specials/flyer/route.ts` — serves the flyer image.
- `src/components/sections/DailySpecials.tsx` — renders it on the homepage.

Two Netlify environment variables:

| Variable | Purpose |
| --- | --- |
| `ADMIN_PASSWORD` | The password for `/admin`. Without it, `/admin` locks itself. |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap and JSON-LD. |

Uploads are downscaled in the browser to 1600px / JPEG before they're sent, so a
phone photo arrives as a few hundred KB rather than several MB. The server
re-checks type and size regardless.

If no flyer has been posted (or the owner takes his down), the homepage falls
back to `dailySpecial` in `src/lib/business.ts`, then to a placeholder.

Auth is a single shared password, not user accounts — appropriate for a flyer
uploader, not for anything sensitive. Don't reuse the password elsewhere.
