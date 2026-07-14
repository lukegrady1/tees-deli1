import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ForkKnife } from "@phosphor-icons/react/dist/ssr";
import { cateringOfferings } from "@/lib/business";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/**
 * Catering use-cases grid.
 *
 * Six equal tiles, with the title laid over the photo rather than stacked under
 * it — the whole section fits on roughly one screen, so nobody has to scroll to
 * find out what we cater. Two columns on phones, three from lg.
 */
export function CateringBento({ withHeading = true }: { withHeading?: boolean }) {
  return (
    <Section id="catering" tone="paper">
      {withHeading && (
        <Reveal className="mb-8 max-w-2xl">
          <Eyebrow>What we cater</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            One kitchen, every kind of gathering.
          </h2>
          <p className="mt-3 text-lg text-stone">
            From a Monday standup to a graduation party — we build the menu,
            deliver, and set it up.
          </p>
        </Reveal>
      )}

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {cateringOfferings.map((o, i) => (
          <Reveal key={o.slug} delay={i * 0.04}>
            <Link
              href={`/catering/${o.slug}`}
              className={cn(
                "group relative flex h-40 items-end overflow-hidden rounded-2xl border border-sand sm:h-48 lg:h-56",
                "bg-espresso transition-transform duration-200 ease-[var(--ease-calm)] hover:-translate-y-[3px]",
              )}
            >
              {o.cardImage ? (
                <Image
                  src={o.cardImage}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-[var(--ease-calm)] group-hover:scale-[1.04]"
                />
              ) : (
                <ForkKnife
                  aria-hidden
                  weight="thin"
                  className="absolute right-4 top-4 size-7 text-paper/40"
                />
              )}

              {/* Scrim: dark enough at the base to keep the title legible over
                  any photo, but clearing by halfway up so the photo still reads. */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/60 via-35% to-transparent to-70%"
              />

              <div className="relative w-full p-4">
                <h3 className="font-display text-base font-semibold leading-tight text-paper sm:text-lg">
                  {o.title}
                </h3>
                <p className="mt-1 line-clamp-2 hidden text-sm leading-snug text-paper/75 sm:block">
                  {o.blurb}
                </p>
                <span className="mt-2 hidden items-center gap-1 text-sm font-medium text-paper opacity-0 transition-opacity group-hover:opacity-100 lg:inline-flex">
                  Learn more
                  <ArrowUpRight weight="regular" className="size-4" aria-hidden />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
