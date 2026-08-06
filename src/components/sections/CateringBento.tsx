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
 * One tile per offering, with the title laid over the photo rather than stacked
 * under it, so the section stays short enough to take in at a glance. Two equal
 * columns on phones; from lg it becomes a real bento — four columns with the
 * first offering doubled in both directions, so the grid has a focal point
 * instead of reading as one more row of identical cards.
 *
 * Both layouts have to land on a whole number of rows or the grid ends on a
 * visible hole, and the count is whatever `cateringOfferings` holds — so the
 * last tile widens when the arithmetic leaves exactly one cell short.
 */
export function CateringBento({ withHeading = true }: { withHeading?: boolean }) {
  const count = cateringOfferings.length;
  // Cells consumed, counting the featured tile's span: 2 across on phones,
  // 2 × 2 from lg. Widening the last tile fixes a one-cell shortfall — that's
  // all it can fix, so any other remainder just leaves the final row short.
  const wideOnMobile = (2 + (count - 1)) % 2 === 1;
  const wideOnDesktop = (4 + (count - 1)) % 4 === 3;

  return (
    <Section id="catering" tone="paper">
      {withHeading && (
        <Reveal className="mx-auto mb-8 max-w-2xl text-center sm:mb-12">
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

      <div className="grid auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:gap-4 lg:auto-rows-[14rem] lg:grid-cols-4">
        {cateringOfferings.map((o, i) => {
          const featured = i === 0;
          const last = i === count - 1;

          return (
            <Reveal
              key={o.slug}
              delay={i * 0.04}
              className={cn(
                "min-h-0",
                featured && "col-span-2 lg:row-span-2",
                !featured && wideOnMobile && last && "col-span-2 lg:col-span-1",
                !featured && wideOnDesktop && last && "lg:col-span-2",
              )}
            >
              <Link
                href={`/catering/${o.slug}`}
                className={cn(
                  "group relative flex size-full items-end overflow-hidden rounded-2xl border border-sand",
                  "bg-espresso transition-transform duration-200 ease-[var(--ease-calm)] hover:-translate-y-[3px]",
                )}
              >
                {o.cardImage ? (
                  <Image
                    src={o.cardImage}
                    alt=""
                    fill
                    sizes={
                      featured
                        ? "(max-width: 1024px) 100vw, 50vw"
                        : "(max-width: 1024px) 50vw, 25vw"
                    }
                    className="object-cover transition-transform duration-500 ease-[var(--ease-calm)] group-hover:scale-[1.04]"
                  />
                ) : (
                  <ForkKnife
                    aria-hidden
                    weight="thin"
                    className="absolute right-4 top-4 size-7 text-paper/40"
                  />
                )}

                {/* Scrim: solid at the base and still ~75% where the blurb sits,
                    because several of these photos are bright (foil trays, a
                    white tent) and paper text washed out over them. Clear by
                    85% up so the photo itself still reads. */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-espresso from-15% via-espresso/75 via-45% to-transparent to-85%"
                />

                <div className="relative w-full p-4 max-sm:text-center sm:p-5">
                  <h3
                    className={cn(
                      "font-display font-semibold leading-tight text-paper",
                      featured
                        ? "text-xl sm:text-2xl lg:text-3xl"
                        : "text-base sm:text-lg",
                    )}
                  >
                    {o.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-1 line-clamp-2 leading-snug text-paper/75",
                      featured
                        ? "max-w-sm text-sm sm:mt-2 sm:text-base"
                        : "hidden text-sm sm:block",
                    )}
                  >
                    {o.blurb}
                  </p>
                  <span className="mt-2 hidden items-center gap-1 text-sm font-medium text-paper opacity-0 transition-opacity group-hover:opacity-100 lg:inline-flex">
                    Learn more
                    <ArrowUpRight weight="regular" className="size-4" aria-hidden />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
