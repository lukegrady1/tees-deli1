import { Info } from "@phosphor-icons/react/dist/ssr";
import { serviceNotice } from "@/lib/business";
import { Container } from "@/components/ui/Container";

/**
 * Temporary service notice banner, above the hero so it's the first thing read.
 *
 * Server-rendered (not client) so the text is in the HTML for crawlers and
 * shows without a hydration flash. The expiry check runs at render time and the
 * homepage revalidates every 60s — see `serviceNotice` for the date handling.
 */
export function ServiceNotice() {
  const { body, signature, until } = serviceNotice;

  // Taken down manually, or the closure window has passed.
  if (!body) return null;
  if (Date.now() >= Date.parse(until)) return null;

  return (
    <aside aria-label="Service notice" className="border-b border-sand bg-clay/[0.06]">
      <Container className="py-5 sm:py-6">
        <div className="mx-auto flex max-w-3xl gap-3 sm:gap-4">
          <Info
            weight="regular"
            className="mt-0.5 size-5 shrink-0 text-clay"
            aria-hidden
          />
          <div>
            <p className="text-[0.95rem] leading-relaxed text-espresso sm:text-base">
              {body}
            </p>
            <p className="mt-2 font-display text-base font-semibold text-espresso">
              &mdash; {signature}
            </p>
          </div>
        </div>
      </Container>
    </aside>
  );
}
