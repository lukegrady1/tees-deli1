import type { Metadata } from "next";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { business, breakfastPizza } from "@/lib/business";
import { PageHero } from "@/components/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { MoreCatering } from "@/components/sections/MoreCatering";
import { QuoteSection } from "@/components/sections/QuoteSection";

export const metadata: Metadata = {
  title: "Breakfast Pizza",
  description:
    "Our signature half-sheet focaccia Breakfast Pizza feeds 8–12 — House Special, Western, Veggie, Gluten-Free, the new Double, and more. Ready-to-bake or delivered hot. From $29.99.",
  alternates: { canonical: "/catering/breakfast-pizza" },
};

export default function BreakfastPizzaPage() {
  return (
    <>
      <PageHero
        eyebrow="Signature product"
        title="The Breakfast Pizza."
        intro={breakfastPizza.pitch}
        breadcrumb={{ label: "Catering", href: "/catering" }}
      >
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {[
            breakfastPizza.feeds,
            breakfastPizza.base,
            `From ${breakfastPizza.startingPrice}`,
          ].map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-2 text-sm font-medium text-espresso"
            >
              <span aria-hidden className="size-1.5 rounded-full bg-clay" />
              {s}
            </span>
          ))}
        </div>
      </PageHero>

      {/* Varieties + pricing */}
      <Section tone="paper" className="pt-0">
        <Reveal className="mb-8 max-w-2xl">
          <Eyebrow>Varieties &amp; pricing</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            Pick your pizza.
          </h2>
          <p className="mt-4 text-stone">
            Prices shown where set; everything else is priced on call so we can
            tailor it to your order. Half sizes from {breakfastPizza.halfPrice}.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {breakfastPizza.varieties.map((v, i) => (
            <Reveal key={v.name} delay={(i % 3) * 0.05}>
              <div className="flex h-full flex-col rounded-2xl border border-sand bg-card p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold text-espresso">
                    {v.name}
                  </h3>
                  <span
                    className={
                      v.price.startsWith("$")
                        ? "font-display text-lg font-semibold text-clay"
                        : "text-sm font-medium text-stone"
                    }
                  >
                    {v.price}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-stone">
                  {v.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Hero photo + formats */}
      <Section tone="sand">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Photo
              label="Top-down half-sheet breakfast pizza, House Special"
              src="/breakfast-pizza.webp"
              sizes="(max-width: 1024px) 92vw, 560px"
              ratio="4/3"
              className="shadow-[0_30px_60px_-30px_rgba(33,28,23,0.35)]"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <Eyebrow>How it comes</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Two ways to serve it.
            </h2>
            <ul className="mt-6 space-y-3">
              {breakfastPizza.formats.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check
                    weight="bold"
                    className="mt-1 size-4 shrink-0 text-clay"
                    aria-hidden
                  />
                  <span className="text-espresso">{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" size="lg">
                Order for an event
              </Button>
              <Button
                href={business.links.toast}
                external
                variant="outline"
                size="lg"
              >
                Order on Toast
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Use cases */}
      <Section tone="paper">
        <Reveal className="mb-8 max-w-2xl">
          <Eyebrow>Perfect for</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            More than just meetings.
          </h2>
        </Reveal>
        <div className="flex flex-wrap gap-3">
          {breakfastPizza.useCases.map((u) => (
            <span
              key={u}
              className="rounded-full border border-sand bg-card px-4 py-2 text-sm text-espresso"
            >
              {u}
            </span>
          ))}
        </div>
      </Section>

      <MoreCatering currentSlug="breakfast-pizza" tone="sand" />
      <QuoteSection tone="paper" />
    </>
  );
}
