import { ForkKnife, Quotes } from "@phosphor-icons/react/dist/ssr";
import { business } from "@/lib/business";
import { Button } from "@/components/ui/Button";

/**
 * Persistent mobile conversion bar. Fixed to the bottom of the viewport on
 * phones only. The <body> reserves matching bottom padding on small screens
 * (see layout) so it never overlaps content or the footer.
 */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-sand bg-paper/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)] lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3 px-4 py-3">
        <Button href="/contact" variant="primary" className="w-full">
          <Quotes weight="regular" className="size-4" aria-hidden />
          Get a Quote
        </Button>
        <Button
          href={business.links.toast}
          external
          variant="outline"
          className="w-full"
        >
          <ForkKnife weight="regular" className="size-4" aria-hidden />
          Order
        </Button>
      </div>
    </div>
  );
}
