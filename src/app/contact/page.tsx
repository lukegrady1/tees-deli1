import type { Metadata } from "next";
import { Phone, EnvelopeSimple, ForkKnife } from "@phosphor-icons/react/dist/ssr";
import { business } from "@/lib/business";
import { PageHero } from "@/components/PageHero";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { HoursLocation } from "@/components/sections/HoursLocation";

export const metadata: Metadata = {
  title: "Contact & Quote",
  description:
    "Get a catering quote, find our hours, or get directions to TEE's Deli & Catering at 26 West Boylston Street, West Boylston, MA. Call (978) 729-2337.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's plan your catering."
        intro="Request a quote below, or reach us directly — we answer catering calls anytime from 6am to 10pm, any day."
      >
        <div className="flex flex-wrap gap-3">
          <a
            href={`tel:${business.phone.tel}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-sand bg-card px-4 py-2 text-sm font-medium text-espresso transition-colors hover:border-clay hover:text-clay"
          >
            <Phone weight="regular" className="size-4" aria-hidden />
            {business.phone.display}
          </a>
          <a
            href={`mailto:${business.email}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-sand bg-card px-4 py-2 text-sm font-medium text-espresso transition-colors hover:border-clay hover:text-clay"
          >
            <EnvelopeSimple weight="regular" className="size-4" aria-hidden />
            {business.email}
          </a>
          <a
            href={business.links.toast}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-sand bg-card px-4 py-2 text-sm font-medium text-espresso transition-colors hover:border-clay hover:text-clay"
          >
            <ForkKnife weight="regular" className="size-4" aria-hidden />
            Order on Toast
          </a>
        </div>
      </PageHero>

      <QuoteSection id="quote" tone="sand" />
      <HoursLocation />
    </>
  );
}
