import Image from "next/image";
import { ArrowRight, ForkKnife } from "@phosphor-icons/react/dist/ssr";
import { business } from "@/lib/business";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { LiveHours } from "@/components/LiveHours";

export function Hero() {
  return (
    <section
      id="home-hero"
      className="relative flex min-h-[100dvh] items-start overflow-hidden pt-4"
    >
      {/* Warm wash anchoring the type side */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_15%_20%,rgba(181,84,59,0.06),transparent_60%)]"
      />
      <Container className="grid items-start gap-6 pb-10 pt-4 sm:gap-12 sm:pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
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
              TEE&rsquo;s Deli &amp; Catering in{" "}
              <span className="text-clay">West Boylston, MA</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-stone">
              <span className="font-medium text-espresso">
                Catering that makes you look good.
              </span>{" "}
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

        {/* Photo mosaic in place of the old services flyer — the flyer now
            lives on /catering, next to the list it duplicates.
            One tall frame plus two squares: the 3/5 + 2/5 split gives the tall
            cell a ~3:4 box, which is the native shape of the subs photo, so
            nothing important gets cropped away. */}
        <Reveal delay={0.1} className="lg:pl-4">
          <div className="grid grid-cols-5 gap-3 sm:gap-4">
            <figure className="col-span-3 row-span-2 overflow-hidden rounded-2xl border border-sand bg-card shadow-[0_30px_60px_-30px_rgba(33,28,23,0.35)]">
              <Image
                src="/deli-subs-italian.webp"
                alt="Six three-foot Italian subs built to order on the prep table at TEE's Deli"
                width={1216}
                height={1600}
                priority
                sizes="(max-width: 1024px) 55vw, 350px"
                className="size-full object-cover"
              />
            </figure>
            <figure className="col-span-2 aspect-square overflow-hidden rounded-2xl border border-sand bg-card shadow-[0_30px_60px_-30px_rgba(33,28,23,0.35)]">
              <Image
                src="/breakfast-pizza.webp"
                alt="A half-sheet TEE's breakfast pizza — eggs, bacon, ham and roasted peppers on focaccia"
                width={1796}
                height={1318}
                priority
                sizes="(max-width: 1024px) 37vw, 235px"
                className="size-full object-cover"
              />
            </figure>
            <figure className="col-span-2 aspect-square overflow-hidden rounded-2xl border border-sand bg-card shadow-[0_30px_60px_-30px_rgba(33,28,23,0.35)]">
              <Image
                src="/platter-wraps.webp"
                alt="A catering platter of assorted wraps, cut and arranged for a luncheon"
                width={827}
                height={827}
                sizes="(max-width: 1024px) 37vw, 235px"
                className="size-full object-cover"
              />
            </figure>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
