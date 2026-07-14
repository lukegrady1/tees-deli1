import {
  Megaphone,
  FacebookLogo,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import { business, dailySpecial } from "@/lib/business";
import { formatPostedLabel, getFlyer } from "@/lib/specials";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Daily specials. Mirrors how they post a flyer on Facebook: a single flyer
 * image is the content.
 *
 * The flyer is whatever the owner last posted at /admin. Until he posts one — or
 * if he takes it down — we fall back to `dailySpecial` in business.ts, and to a
 * placeholder if that's empty too.
 */
export async function DailySpecials({
  tone = "paper",
}: {
  tone?: "paper" | "sand";
}) {
  const flyer = await resolveFlyer();

  return (
    <Section id="specials" tone={tone}>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Eyebrow>Daily specials</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            Fresh off the board.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-stone">
            We post a new specials flyer regularly — the same one you&rsquo;ll
            find on our Facebook page. Check here for today&rsquo;s deals, or
            give us a call to hear what&rsquo;s cooking.
          </p>
          {flyer?.postedLabel && (
            <p className="mt-3 text-sm font-medium text-stone">
              Latest flyer: {flyer.postedLabel}
            </p>
          )}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              href={business.links.facebook}
              external
              variant="outline"
              size="lg"
            >
              <FacebookLogo weight="regular" className="size-4" aria-hidden />
              See specials on Facebook
            </Button>
            <Button href={`tel:${business.phone.tel}`} variant="ghost" size="lg">
              <Phone weight="regular" className="size-4" aria-hidden />
              {business.phone.display}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <figure className="mx-auto w-full max-w-sm">
            {flyer ? (
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-sand bg-card shadow-[0_30px_60px_-30px_rgba(33,28,23,0.35)]">
                {/* A posted flyer is served by a route handler rather than from
                    /public, so next/image buys nothing here. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={flyer.src}
                  alt={flyer.alt}
                  className="absolute inset-0 size-full object-contain p-2"
                />
              </div>
            ) : (
              <FlyerPlaceholder />
            )}
            <figcaption className="mt-3 text-center text-sm text-stone">
              Updated regularly — check back often.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}

type ResolvedFlyer = { src: string; alt: string; postedLabel: string | null };

/** Owner-posted flyer wins; the one committed in business.ts is the fallback. */
async function resolveFlyer(): Promise<ResolvedFlyer | null> {
  const posted = await getFlyer();

  if (posted) {
    const postedLabel = formatPostedLabel(posted.postedAt);
    return {
      // Trailing slash is canonical here (next.config trailingSlash), so linking
      // it directly avoids a 308 on every page view. postedAt busts the cache so
      // a replaced flyer shows up immediately.
      src: `/api/specials/flyer/?v=${encodeURIComponent(posted.postedAt)}`,
      alt: `TEE's Deli daily specials flyer, posted ${postedLabel}.`,
      postedLabel,
    };
  }

  if (dailySpecial.image) {
    return {
      src: dailySpecial.image,
      alt: dailySpecial.alt,
      postedLabel: dailySpecial.postedLabel,
    };
  }

  return null;
}

/** Empty-state slot shown until a flyer is published. */
function FlyerPlaceholder() {
  return (
    <div className="flex aspect-[3/4] flex-col items-center justify-center gap-5 rounded-2xl border-2 border-dashed border-stone/30 bg-sand/50 p-8 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-card text-clay">
        <Megaphone weight="thin" className="size-7" aria-hidden />
      </span>
      <div>
        <p className="font-display text-xl font-semibold text-espresso">
          Today&rsquo;s specials flyer
        </p>
        <p className="mt-2 text-sm leading-relaxed text-stone">
          This is where the daily specials flyer appears — post it here just like
          on Facebook.
        </p>
      </div>
    </div>
  );
}
