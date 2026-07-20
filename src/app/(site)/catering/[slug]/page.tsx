import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Phone } from "@phosphor-icons/react/dist/ssr";
import {
  business,
  cateringOfferings,
  getOffering,
  SITE_URL,
} from "@/lib/business";
import { PageHero } from "@/components/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { MoreCatering } from "@/components/sections/MoreCatering";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { cn } from "@/lib/cn";

// Only the offerings that have generic detail content are valid here;
// Breakfast Pizza is served by its own sibling route. Unknown slugs → 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return cateringOfferings
    .filter((o) => o.detail)
    .map((o) => ({ slug: o.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const o = getOffering(slug);
  if (!o?.detail) return {};
  return {
    title: o.title,
    description: o.detail.metaDescription,
    alternates: { canonical: `/catering/${o.slug}` },
  };
}

export default async function CateringOfferingPage({ params }: Params) {
  const { slug } = await params;
  const o = getOffering(slug);
  if (!o?.detail) notFound();
  const d = o.detail;
  const hasMenu = Boolean(d.flyers?.length || d.pricing);
  const sideBySideFlyers = (d.flyers?.length ?? 0) > 1;

  // These pages are the owner's flyers plus his own words — the menu leads,
  // real photos follow, and nothing here is invented marketing copy.
  // Whichever section lands first sits flush against the hero (pt-0) and stays
  // paper; the rest alternate. Assigned in render order — `nextTone` advances
  // on each call.
  let toneStep = 0;
  const nextTone = (): "sand" | "paper" =>
    toneStep++ % 2 === 0 ? "sand" : "paper";
  const galleryTone = hasMenu ? nextTone() : ("paper" as const);
  const moreTone = nextTone();
  const quoteTone = nextTone();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Catering", item: `${SITE_URL}/catering` },
      {
        "@type": "ListItem",
        position: 2,
        name: o.title,
        item: `${SITE_URL}/catering/${o.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PageHero
        eyebrow={d.eyebrow}
        title={o.title}
        intro={d.intro}
        breadcrumb={{ label: "Catering", href: "/catering" }}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button href="/contact" size="lg">
            Get a Quote
            <ArrowRight weight="regular" className="size-4" aria-hidden />
          </Button>
          <Button href={`tel:${business.phone.tel}`} variant="outline" size="lg">
            <Phone weight="regular" className="size-4" aria-hidden />
            Call {business.phone.display}
          </Button>
        </div>
      </PageHero>

      {/* Menu & pricing — editable text first, printed flyer as reference */}
      {hasMenu && (
        <Section id="menu" tone="paper" className="pt-0">
          <Reveal className="mb-8 max-w-2xl">
            <Eyebrow>The details</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Menu &amp; pricing.
            </h2>
            <p className="mt-4 text-lg text-stone">
              Here&rsquo;s the {d.menuLabel ?? o.title.toLowerCase()} menu and
              pricing. Prices and options may change — call us to confirm and
              customize for your event.
            </p>
          </Reveal>

          {/* One flyer sits beside the price card. Two or more take the full
              width side by side instead, with the price card stacked above —
              sharing a half-width column would render each sheet too small to
              read, which is the whole point of showing them. */}
          <div
            className={cn(
              "grid items-start gap-8 lg:gap-12",
              !sideBySideFlyers && "lg:grid-cols-2",
            )}
          >
            {d.pricing && (
              <Reveal>
                <div className="rounded-2xl border border-sand bg-card p-6 sm:p-8">
                  <p className="font-display text-3xl font-semibold text-espresso">
                    {d.pricing.rate}
                  </p>
                  {d.pricing.rateNote && (
                    <p className="mt-1 text-sm text-stone">
                      {d.pricing.rateNote}
                    </p>
                  )}

                  {d.pricing.fees && d.pricing.fees.length > 0 && (
                    <div className="mt-6 space-y-4 border-t border-sand pt-6">
                      {d.pricing.fees.map((f) => (
                        <div key={f.label}>
                          <div className="flex items-baseline justify-between gap-4">
                            <span className="font-medium text-espresso">
                              {f.label}
                            </span>
                            <span className="shrink-0 font-display font-semibold text-clay">
                              {f.value}
                            </span>
                          </div>
                          {f.note && (
                            <p className="mt-1 text-sm leading-relaxed text-stone">
                              {f.note}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {d.pricing.additional && d.pricing.additional.length > 0 && (
                    <div className="mt-6 border-t border-sand pt-6">
                      <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-stone">
                        {d.pricing.additionalLabel ?? "Additional charges"}
                      </h3>
                      <ul className="mt-3 divide-y divide-sand">
                        {d.pricing.additional.map((a) => (
                          <li
                            key={a.label}
                            className="flex items-baseline justify-between gap-4 py-2.5"
                          >
                            <span className="text-espresso">{a.label}</span>
                            <span className="shrink-0 text-right text-sm font-medium text-stone">
                              {a.value}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {d.pricing.fineprint?.map((line) => (
                    <p
                      key={line}
                      className="mt-4 text-sm leading-relaxed text-stone"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </Reveal>
            )}

            {d.flyers && d.flyers.length > 0 && (
              <div
                className={cn(
                  "grid gap-8",
                  sideBySideFlyers && "lg:grid-cols-2 lg:gap-12",
                )}
              >
                {d.flyers.map((f, i) => (
                  <Reveal key={f.image} delay={0.08 + i * 0.06}>
                    <figure>
                      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-sand bg-card shadow-[0_30px_60px_-30px_rgba(33,28,23,0.35)]">
                        <Image
                          src={f.image}
                          alt={f.alt}
                          fill
                          sizes="(max-width: 1024px) 92vw, 560px"
                          className="object-contain p-2"
                        />
                      </div>
                      <figcaption className="mt-3 text-center text-sm text-stone">
                        {f.caption}
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </Section>
      )}

      {/* Real event gallery, when available */}
      {d.gallery && d.gallery.length > 0 && (
        <Section tone={galleryTone}>
          {/* No blurb here — the strapline used to talk about cookouts, which
              was wrong on every page but Barbecues. The captions are real and
              specific, so they carry it. */}
          <Reveal className="mb-8 max-w-2xl">
            <Eyebrow>From our kitchen</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              The real thing.
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {d.gallery.map((g, i) => (
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
      )}

      <MoreCatering currentSlug={o.slug} tone={moreTone} />
      <QuoteSection tone={quoteTone} />
    </>
  );
}
