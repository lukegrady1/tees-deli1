import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { cateringOfferings } from "@/lib/business";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/** Cross-links to the other catering offerings. Used on each /catering/* page. */
export function MoreCatering({
  currentSlug,
  tone = "sand",
}: {
  currentSlug: string;
  tone?: "sand" | "paper";
}) {
  const others = cateringOfferings.filter((o) => o.slug !== currentSlug);

  return (
    <Section tone={tone}>
      <Reveal className="mb-8 max-w-2xl">
        <Eyebrow>More catering</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
          Explore the rest.
        </h2>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {others.map((o, i) => (
          <Reveal key={o.slug} delay={(i % 3) * 0.05} className="h-full">
            <Link
              href={`/catering/${o.slug}`}
              className="group flex h-full flex-col justify-between gap-6 rounded-2xl border border-sand bg-card p-5 transition-transform duration-200 ease-[var(--ease-calm)] hover:-translate-y-[3px]"
            >
              <div>
                <h3 className="font-display text-xl font-semibold">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">
                  {o.blurb}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-clay">
                View
                <ArrowUpRight
                  weight="regular"
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
