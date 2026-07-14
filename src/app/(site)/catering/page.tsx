import type { Metadata } from "next";
import { Check } from "@phosphor-icons/react/dist/ssr";
import {
  business,
  cateringCategories,
  bbqEvents,
  sitePhotos,
} from "@/lib/business";
import { PageHero } from "@/components/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { CateringBento } from "@/components/sections/CateringBento";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { SocialProof } from "@/components/sections/SocialProof";
import { QuoteSection } from "@/components/sections/QuoteSection";

export const metadata: Metadata = {
  title: "Catering",
  description:
    "Full-service catering for offices, colleges, and private events across the Greater Worcester area — corporate breakfasts & lunches, boxed lunches, BBQs, graduations, and more. Get a quote.",
  alternates: { canonical: "/catering" },
};

export default function CateringPage() {
  return (
    <>
      <PageHero
        eyebrow="Catering"
        title={<>Catering that makes you look good.</>}
        intro={`Our primary craft: full-service catering for businesses, colleges, and private functions across the ${business.serviceArea}. We build the menu, deliver, and set up — you take the credit.`}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button href="/contact" size="lg">
            Get a Catering Quote
          </Button>
          <Button href={`tel:${business.phone.tel}`} variant="outline" size="lg">
            Call {business.phone.display}
          </Button>
        </div>
      </PageHero>

      {/* Full offerings list */}
      <Section tone="sand">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <Eyebrow>Everything we cater</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              If you&rsquo;re hosting it, we can feed it.
            </h2>
            <p className="mt-4 text-lg text-stone">
              We specialize in corporate breakfast &amp; lunch meetings, college
              athletic team meals, and company &amp; private barbecues.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {cateringCategories.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-3 rounded-xl border border-sand bg-card px-4 py-3"
                >
                  <Check
                    weight="bold"
                    className="mt-0.5 size-4 shrink-0 text-clay"
                    aria-hidden
                  />
                  <span className="text-espresso">{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Use-case bento (reused) */}
      <CateringBento withHeading />

      {/* Boxed lunches highlight */}
      <Section tone="paper">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Photo
              label="Custom boxed lunches, packed and labeled for a visiting team"
              src={sitePhotos.boxedLunches}
              sizes="(max-width: 1024px) 92vw, 45vw"
              ratio="4/3"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <Eyebrow>For the teams</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Boxed lunches built for game day.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-stone">
              We serve home and visiting sports teams — including colleges like{" "}
              {business.reputation.colleges.join(" and ")} — and we&rsquo;re the
              top choice for visiting teams on quality, price, and prompt
              service. Order from the menu or build a custom box for a quote.
            </p>
            <div className="mt-7">
              <Button href="/contact" size="lg">
                Quote a team order
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Gallery — real photos from catered events */}
      <Section tone="sand">
        <Reveal className="mb-8 max-w-2xl">
          <Eyebrow>Gallery</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            A taste of what we set up.
          </h2>
          <p className="mt-4 text-lg text-stone">
            Real cookouts and events from around the Worcester area.
          </p>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {bbqEvents.map((g, i) => (
            <Reveal key={g.image} delay={(i % 3) * 0.06}>
              <figure>
                <Photo
                  label={g.caption}
                  src={g.image}
                  ratio="4/3"
                  sizes="(max-width: 768px) 45vw, 30vw"
                />
                <figcaption className="mt-2 text-sm text-stone">
                  {g.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      <HowItWorks />
      <SocialProof />
      <QuoteSection />
    </>
  );
}
