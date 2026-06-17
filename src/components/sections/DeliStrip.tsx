import { ArrowRight, ForkKnife } from "@phosphor-icons/react/dist/ssr";
import { business, heroDeliItems } from "@/lib/business";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";

/** Secondary path: the walk-in deli. Real text items, Order on Toast CTA. */
export function DeliStrip() {
  return (
    <Section tone="sand">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16">
        <Reveal>
          <Photo label="Made-to-order deli sandwich, fresh off the grill" ratio="4/3" />
        </Reveal>

        <Reveal delay={0.08}>
          <Eyebrow>Walk in &amp; grab lunch</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            The deli counter.
          </h2>
          <p className="mt-4 text-lg text-stone">
            Made-to-order breakfast &amp; lunch — call ahead or order online for
            pickup.
          </p>

          <ul className="mt-6 divide-y divide-sand border-y border-sand">
            {heroDeliItems.map((item) => (
              <li key={item.name} className="flex items-baseline gap-3 py-3">
                <ForkKnife
                  weight="thin"
                  className="size-4 shrink-0 translate-y-1 text-clay"
                  aria-hidden
                />
                <span className="font-medium text-espresso">{item.name}</span>
                {item.desc && (
                  <span className="text-sm text-stone">{item.desc}</span>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={business.links.toast} external size="lg">
              Order on Toast
            </Button>
            <Button href="/menu" variant="outline" size="lg">
              See full menu
              <ArrowRight weight="regular" className="size-4" aria-hidden />
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
