import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { business, cateringOfferings } from "@/lib/business";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  // A 404 should never be indexed; the status code says so, this makes it explicit.
  robots: { index: false, follow: true },
};

/**
 * Branded 404. Unmatched URLs render here through the root layout only (the
 * (site) layout doesn't apply), so the header and footer are pulled in by
 * hand. Most hits are old teesdeli.com links that no longer exist, so the
 * page points at the sections those visitors were most likely after.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />
      <main className="relative z-10 flex-1">
        <Container className="py-20 sm:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">
            404
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            That page isn&rsquo;t on the menu.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-stone">
            The link you followed may be from our old website. Everything is
            still here &mdash; try one of the pages below, or call us at{" "}
            <a href={`tel:${business.phone.tel}`} className="font-medium text-espresso">
              {business.phone.display}
            </a>
            .
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/" size="lg">
              Back to the homepage
              <ArrowRight weight="regular" className="size-4" aria-hidden />
            </Button>
            <Button href="/menu" variant="outline" size="lg">
              See the deli menu
            </Button>
          </div>
          <ul className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {cateringOfferings.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/catering/${o.slug}`}
                  className="text-clay underline-offset-4 hover:underline"
                >
                  {o.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/catering" className="text-clay underline-offset-4 hover:underline">
                All catering
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-clay underline-offset-4 hover:underline">
                Contact &amp; quote
              </Link>
            </li>
          </ul>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
