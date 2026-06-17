import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { breakfastPizza } from "@/lib/business";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";

/** Appetite-driven but calm. Witty copy, restrained styling. */
export function BreakfastPizzaFeature() {
  return (
    <Section tone="paper">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <Eyebrow>Signature</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            The Breakfast Pizza.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-stone">
            {breakfastPizza.pitch}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {breakfastPizza.varieties.slice(0, 6).map((v) => (
              <span
                key={v.name}
                className="rounded-full border border-sand bg-card px-3 py-1 text-sm text-espresso"
              >
                {v.name}
              </span>
            ))}
            <span className="rounded-full border border-clay/40 px-3 py-1 text-sm font-medium text-clay">
              + more
            </span>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Stat label={breakfastPizza.feeds} />
            <Stat label={`From ${breakfastPizza.startingPrice}`} />
            <Stat label="Ready-to-bake or delivered hot" />
          </div>

          <div className="mt-8">
            <Button href="/catering/breakfast-pizza" size="lg">
              See the varieties
              <ArrowRight weight="regular" className="size-4" aria-hidden />
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2">
          <Photo
            label="Half-sheet focaccia breakfast pizza, top-down — feeds 8 to 12"
            src="/breakfast-pizza.webp"
            sizes="(max-width: 1024px) 92vw, 560px"
            ratio="4/3"
            className="shadow-[0_30px_60px_-30px_rgba(33,28,23,0.35)]"
          />
        </Reveal>
      </div>
    </Section>
  );
}

function Stat({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-medium text-espresso">
      <span aria-hidden className="size-1.5 rounded-full bg-clay" />
      {label}
    </span>
  );
}
