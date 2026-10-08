import { FacebookLogo, Phone } from "@phosphor-icons/react/dist/ssr";
import { business } from "@/lib/business";
import { formatPostedLabel, getFlyer } from "@/lib/specials";
import { Section, Eyebrow, centerOnPhone } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Daily specials. Mirrors how they post a flyer on Facebook: a single flyer
 * image is the content.
 *
 * The flyer is whatever the owner last posted at /admin. Until he posts one — or
 * if he takes it down — the slot points people to Facebook instead.
 */
export async function DailySpecials({
  tone = "paper",
}: {
  tone?: "paper" | "sand";
}) {
  const flyer = await resolveFlyer();

  return (
    <Section id="specials" tone={tone}>
      <div className="grid items-center gap-6 sm:gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className={centerOnPhone}>
          <Eyebrow>Daily specials</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            Fresh off the board.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-stone">
            We post a new specials flyer regularly — the same one you&rsquo;ll
            find on our Facebook page. Check here for today&rsquo;s deals, or
            give us a call to hear what&rsquo;s cooking.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center">
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
          {/* The flyer is the whole point of this section and the one thing that
              changes daily — give it room. Full width on phones, larger than the
              old max-w-sm from sm up. */}
          <figure className="mx-auto w-full max-w-sm sm:max-w-md lg:max-w-lg">
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
              <NoFlyer />
            )}
            {flyer && (
              <figcaption className="mt-3 text-center text-sm font-medium text-stone">
                Specials for {flyer.postedLabel}
              </figcaption>
            )}
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}

type ResolvedFlyer = { src: string; alt: string; postedLabel: string };

/** The owner-posted flyer, or null if none is up. */
async function resolveFlyer(): Promise<ResolvedFlyer | null> {
  const posted = await getFlyer();
  if (!posted) return null;

  const postedLabel = formatPostedLabel(posted.postedAt);
  return {
    // Trailing slash is canonical here (next.config trailingSlash), so linking
    // it directly avoids a 308 on every page view. postedAt busts the cache so
    // a replaced flyer shows up immediately.
    src: `/api/specials/flyer/?v=${encodeURIComponent(posted.postedAt)}`,
    alt: `TEE's Deli daily specials flyer for ${postedLabel}.`,
    postedLabel,
  };
}

/** What fills the flyer slot when nothing is posted. */
function NoFlyer() {
  return (
    <div className="flex aspect-[3/4] flex-col items-center justify-center gap-5 rounded-2xl border border-sand bg-card p-8 text-center shadow-[0_30px_60px_-30px_rgba(33,28,23,0.35)]">
      <span className="flex size-14 items-center justify-center rounded-full bg-sand text-clay">
        <FacebookLogo weight="regular" className="size-7" aria-hidden />
      </span>
      <div>
        <p className="font-display text-xl font-semibold text-espresso">
          No specials posted yet
        </p>
        <p className="mt-2 text-sm leading-relaxed text-stone">
          Check our Facebook page for today&rsquo;s specials.
        </p>
      </div>
      <Button href={business.links.facebook} external variant="outline">
        <FacebookLogo weight="regular" className="size-4" aria-hidden />
        Open Facebook
      </Button>
    </div>
  );
}
