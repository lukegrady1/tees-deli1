"use client";

import { useEffect, useState } from "react";
import { ForkKnife, Quotes } from "@phosphor-icons/react/dist/ssr";
import { business } from "@/lib/business";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/**
 * Persistent mobile conversion bar, fixed to the bottom on phones.
 *
 * On the homepage it stays hidden while the full-height hero is on screen and
 * slides up once you scroll past it (the hero carries its own CTAs). On every
 * other page — which has no #home-hero — it shows immediately.
 *
 * The <body> reserves matching bottom padding on small screens (see layout).
 */
export function MobileActionBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home-hero");
    if (!hero) {
      // No hero on this page → show right away.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
      return;
    }
    // Show once the hero has fully scrolled out of view.
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-sand bg-paper/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)] lg:hidden",
        "transition-transform duration-300 ease-[var(--ease-calm)] motion-reduce:transition-none",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
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
