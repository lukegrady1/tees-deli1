import { ArrowRight, ForkKnife } from "@phosphor-icons/react/dist/ssr";
import { business } from "@/lib/business";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { LiveHours } from "@/components/LiveHours";

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] items-start overflow-hidden pt-4">
      {/* Warm wash anchoring the type side */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_15%_20%,rgba(181,84,59,0.06),transparent_60%)]"
      />
      <Container className="grid items-start gap-12 pb-16 pt-4 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="max-w-xl">
          {/* Location tag: hidden on phones, shown on tablet/desktop (sm+).
              Hidden via the wrapper since the badge itself is inline-flex. */}
          <Reveal className="hidden sm:block">
            <span className="inline-flex items-center gap-2 rounded-full border border-sand bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-stone">
              <ForkKnife weight="regular" className="size-3.5 text-clay" aria-hidden />
              {business.serviceArea}
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.04] tracking-tight sm:text-5xl lg:text-[3.6rem]">
              Catering that makes
              <br />
              you look <span className="text-clay">good.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-stone">
              Full-service catering for offices, college teams, and private
              functions across the Worcester area — plus a fresh, made-to-order
              deli when you walk in.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/contact" size="lg">
                Get a Catering Quote
                <ArrowRight weight="regular" className="size-4" aria-hidden />
              </Button>
              <Button
                href={business.links.toast}
                external
                variant="outline"
                size="lg"
              >
                Order Online
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-7">
              <LiveHours />
            </div>
          </Reveal>
        </div>

        {/* Hero services flyer — shown whole on a clean card */}
        <Reveal delay={0.1} className="lg:pl-4">
          <Photo
            label="TEE's Deli & Catering — full-service catering for corporate and private events, breakfasts, luncheons, dinners, barbecues (up to 500 people), boxed lunches, anniversary parties, bereavement meals, class reunions, and chef-for-hire; plus pickup and Breakfast Pizza."
            src="/homepage-hero.webp"
            fit="contain"
            ratio="3/4"
            sizes="(max-width: 1024px) 92vw, 560px"
            className="border border-sand bg-card shadow-[0_30px_60px_-30px_rgba(33,28,23,0.35)]"
          />
        </Reveal>
      </Container>
    </section>
  );
}
