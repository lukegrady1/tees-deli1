"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Force the viewport to the top on every route change. Skips when the URL has a
 * hash so in-page anchor links (e.g. /catering/barbecues#menu) still land on
 * their section. Uses "instant" to bypass the global smooth-scroll behavior.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
