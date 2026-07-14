import { Quotes } from "@phosphor-icons/react/dist/ssr";
import { business } from "@/lib/business";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/** Trust block — espresso, not a colored block. Paper text on espresso. */
export function SocialProof() {
  const { reputation } = business;
  return (
    <Section tone="espresso">
      <div className="grid gap-8 sm:gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">
            Trusted locally
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
            Feeding teams at{" "}
            <span className="text-clay">{reputation.colleges[0]}</span> &{" "}
            <span className="text-clay">{reputation.colleges[1]}</span>.
          </h2>
          <p className="mt-5 max-w-md text-paper/70">
            We&rsquo;re the go-to for visiting and home college teams across
            Worcester — and for offices that want a spread that shows up on time.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="grid gap-5 sm:gap-6">
          <div className="flex items-baseline gap-4 border-b border-paper/10 pb-6">
            <span className="font-display text-5xl font-semibold text-paper">
              {reputation.recommendRate}
            </span>
            <span className="text-paper/70">{reputation.note}</span>
          </div>
          <figure className="relative">
            <Quotes
              weight="fill"
              className="absolute -left-1 -top-2 size-8 text-clay/30"
              aria-hidden
            />
            <blockquote className="pl-9 text-lg leading-relaxed text-paper/90">
              {reputation.sentiments[0]}
            </blockquote>
            <figcaption className="mt-3 pl-9 text-sm text-paper/55">
              Paraphrased from public reviews
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
