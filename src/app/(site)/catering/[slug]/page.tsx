import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, ArrowRight, Phone } from "@phosphor-icons/react/dist/ssr";
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
  const hasMenu = Boolean(d.flyer || d.pricing);

  // The photo+highlights section is always paper; everything after it
  // alternates sand/paper regardless of which optional sections are present.
  let toneStep = 0;
  const nextTone = (): "sand" | "paper" =>
    toneStep++ % 2 === 0 ? "sand" : "paper";
  const galleryTone = d.gallery ? nextTone() : undefined;
  const includesTone = nextTone();
  const menuTone = hasMenu ? nextTone() : undefined;
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

      {/* Photo + highlights */}
      <Section tone="paper" className="pt-0">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Photo
              label={d.photoLabel}
              src={d.heroImage}
              sizes="(max-width: 1024px) 92vw, 560px"
              ratio="4/3"
              className="shadow-[0_30px_60px_-30px_rgba(33,28,23,0.35)]"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <Eyebrow>Why it works</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              What you get.
            </h2>
            <ul className="mt-6 space-y-5">
              {d.highlights.map((h) => (
                <li key={h.title} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-1.5 size-2 shrink-0 rounded-full bg-clay"
                  />
                  <div>
                    <p className="font-medium text-espresso">{h.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-stone">
                      {h.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Real event gallery, when available */}
      {d.gallery && d.gallery.length > 0 && (
        <Section tone={galleryTone}>
          <Reveal className="mb-8 max-w-2xl">
            <Eyebrow>Recent events</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              We&rsquo;ve done this before.
            </h2>
            <p className="mt-4 text-lg text-stone">
              A few of the cookouts we&rsquo;ve set up around the Worcester area.
            </p>
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

      {/* What we can include + use cases */}
      <Section tone={includesTone}>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <Eyebrow>What we can include</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Tailored to your event.
            </h2>
            <ul className="mt-6 grid gap-3">
              {d.includes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-sand bg-card px-4 py-3"
                >
                  <Check
                    weight="bold"
                    className="mt-0.5 size-4 shrink-0 text-clay"
                    aria-hidden
                  />
                  <span className="text-espresso">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08} className="lg:pt-2">
            <Eyebrow>Perfect for</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              When to call us.
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {d.useCases.map((u) => (
                <span
                  key={u}
                  className="rounded-full border border-sand bg-card px-4 py-2 text-sm text-espresso"
                >
                  {u}
                </span>
              ))}
            </div>
            <p className="mt-6 max-w-sm text-stone">
              Not sure where your event fits? Call us anytime 6am–10pm and
              we&rsquo;ll build something that works.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Menu & pricing — editable text first, printed flyer as reference */}
      {(d.flyer || d.pricing) && (
        <Section id="menu" tone={menuTone}>
          <Reveal className="mb-8 max-w-2xl">
            <Eyebrow>The details</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Menu &amp; pricing.
            </h2>
            <p className="mt-4 text-lg text-stone">
              Here&rsquo;s the {o.title.toLowerCase()} menu and pricing. Prices
              and options may change — call us to confirm and customize for your
              event.
            </p>
          </Reveal>

          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
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
                        Additional charges
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

            {d.flyer && (
              <Reveal delay={0.08}>
                <figure>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-sand bg-card shadow-[0_30px_60px_-30px_rgba(33,28,23,0.35)]">
                    <Image
                      src={d.flyer.image}
                      alt={d.flyer.alt}
                      fill
                      sizes="(max-width: 1024px) 92vw, 560px"
                      className="object-contain p-2"
                    />
                  </div>
                  <figcaption className="mt-3 text-center text-sm text-stone">
                    The printed {o.title.toLowerCase()} flyer.
                  </figcaption>
                </figure>
              </Reveal>
            )}
          </div>
        </Section>
      )}

      <MoreCatering currentSlug={o.slug} tone={moreTone} />
      <QuoteSection tone={quoteTone} />
    </>
  );
}
