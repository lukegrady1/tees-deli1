import type { Metadata } from "next";
import Image from "next/image";
import { ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";
import { business, hours, menuSheets } from "@/lib/business";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { WalkInNotice } from "@/components/WalkInNotice";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "TEE's Deli breakfast & lunch menu — made-to-order egg sandwiches, deli classics, hot grill items, salads, and sides. Order online for pickup in West Boylston, MA.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <>
      <PageHero
        eyebrow="Deli menu"
        title="Breakfast & lunch, made to order."
        intro="Real, fresh deli food — no two orders the same. Walk in, call ahead, or order online for pickup."
      >
        <Button href={business.links.toast} external size="lg">
          Order on Toast
        </Button>
        <p className="mt-3 text-sm text-stone">{hours.walkIn.online}</p>
      </PageHero>

      <Section tone="paper" className="pt-0">
        {/* Above the menu, not below it — someone reading this page is deciding
            whether to come in, and the deli's hours move with the catering
            schedule. */}
        <WalkInNotice className="mb-8 max-w-2xl" />

        {/* The owner's printed menu sheets, shown as-is at his request. Each
            one opens full size in a new tab so the small print is readable on
            a phone. */}
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {menuSheets.map((sheet, i) => (
            <Reveal key={sheet.image} delay={0.08 + i * 0.06}>
              <figure>
                <a
                  href={sheet.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open the ${sheet.title} sheet full size`}
                  className="group relative block aspect-[3/4] overflow-hidden rounded-2xl border border-sand bg-card shadow-[0_30px_60px_-30px_rgba(33,28,23,0.35)]"
                >
                  <Image
                    src={sheet.image}
                    alt={sheet.alt}
                    fill
                    sizes="(max-width: 768px) 92vw, 560px"
                    priority={i < 2}
                    className="object-contain p-2"
                  />
                </a>
                <figcaption className="mt-3 flex items-center justify-between gap-4 text-sm text-stone">
                  <span className="font-medium text-espresso">{sheet.title}</span>
                  <a
                    href={sheet.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-clay underline-offset-4 hover:underline"
                  >
                    Open full size
                    <ArrowSquareOut weight="regular" className="size-4" aria-hidden />
                  </a>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-sm text-stone">
          Before ordering, please let our staff know about any food allergies or
          dietary restrictions in your party. Prices and items may change. Call{" "}
          <a
            href={`tel:${business.phone.tel}`}
            className="font-medium text-clay underline-offset-4 hover:underline"
          >
            {business.phone.display}
          </a>{" "}
          for daily specials or large pickup orders.
        </p>
      </Section>
    </>
  );
}
