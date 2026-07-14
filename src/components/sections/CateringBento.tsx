import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { cateringOfferings } from "@/lib/business";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/**
 * Catering use-cases bento. CSS Grid with mixed tile sizes, one photo per tile,
 * thin sand borders, subtle hover lift. Breakfast Pizza is flagged with a clay
 * label — never a colored fill. Stacks to one column on mobile.
 */
export function CateringBento({ withHeading = true }: { withHeading?: boolean }) {
  return (
    <Section id="catering" tone="paper">
      {withHeading && (
        <Reveal className="mb-10 max-w-2xl">
          <Eyebrow>What we cater</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            One kitchen, every kind of gathering.
          </h2>
          <p className="mt-4 text-lg text-stone">
            From a Monday standup to a graduation party — we build the menu,
            deliver, and set it up.
          </p>
        </Reveal>
      )}

      <div className="grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cateringOfferings.map((o, i) => {
          const large = o.span === "large";
          const featured = o.featured === true;
          return (
            <Reveal
              key={o.slug}
              delay={i * 0.05}
              className={cn(large && "sm:col-span-2 lg:row-span-2")}
            >
              <Link
                href={`/catering/${o.slug}`}
                className={cn(
                  "group flex h-full flex-col overflow-hidden rounded-2xl border border-sand bg-card",
                  "transition-transform duration-200 ease-[var(--ease-calm)] hover:-translate-y-[3px]",
                )}
              >
                <Photo
                  label={o.title}
                  src={o.cardImage}
                  sizes={
                    large
                      ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw"
                      : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  }
                  ratio={large ? "3/2" : "16/9"}
                  className="rounded-none border-0"
                />
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-xl font-semibold">
                      {o.title}
                    </h3>
                    {featured && (
                      <span className="rounded-full border border-clay/40 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-clay">
                        Signature
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-stone">
                    {o.blurb}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-clay opacity-0 transition-opacity group-hover:opacity-100">
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
