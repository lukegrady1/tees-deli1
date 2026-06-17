"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { List, X, Phone } from "@phosphor-icons/react/dist/ssr";
import { business, nav } from "@/lib/business";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { asset } from "@/lib/basePath";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Subtle border/elevation once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-200",
        scrolled || open
          ? "border-b border-sand bg-paper/90 backdrop-blur-md"
          : "border-b border-transparent bg-paper/70 backdrop-blur-sm",
      )}
    >
      <Container className="flex h-28 items-center justify-between gap-4">
        <Link href="/" aria-label={`${business.name} — home`} className="inline-flex">
          <Image
            src={asset("/tees-deli-logo.webp")}
            alt={`${business.name} logo`}
            width={2048}
            height={1299}
            priority
            className="h-20 w-auto sm:h-24"
          />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {nav.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-medium text-espresso/80 transition-colors hover:text-clay"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "text-base font-medium transition-colors hover:text-clay",
                  pathname === item.href
                    ? "text-clay"
                    : "text-espresso/80",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${business.phone.tel}`}
            className="hidden items-center gap-2 rounded-xl px-3 py-2 text-base font-medium text-espresso/80 transition-colors hover:text-clay sm:inline-flex"
          >
            <Phone weight="regular" className="size-5" aria-hidden />
            <span className="hidden xl:inline">{business.phone.display}</span>
            <span className="xl:hidden">Call</span>
          </a>

          {/* Wrapper controls visibility — the Button's base `inline-flex`
              would otherwise override a `hidden` utility on the button itself. */}
          <span className="hidden lg:inline-flex">
            <Button href="/contact" size="lg">
              Get a Quote
            </Button>
          </span>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-12 items-center justify-center rounded-xl text-espresso lg:hidden"
          >
            {open ? (
              <X weight="regular" className="size-7" />
            ) : (
              <List weight="regular" className="size-7" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="lg:hidden"
          // Any tap inside (a nav link or the call link) dismisses the menu.
          onClick={() => setOpen(false)}
        >
          <Container className="flex flex-col gap-1 border-t border-sand py-4">
            {nav.map((item) =>
              item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl px-3 py-3 text-base font-medium text-espresso/90 hover:bg-sand"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "rounded-xl px-3 py-3 text-base font-medium hover:bg-sand",
                    pathname === item.href ? "text-clay" : "text-espresso/90",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
            <a
              href={`tel:${business.phone.tel}`}
              className="mt-1 inline-flex items-center gap-2 rounded-xl px-3 py-3 text-base font-medium text-espresso/90 hover:bg-sand"
            >
              <Phone weight="regular" className="size-5" aria-hidden />
              {business.phone.display}
            </a>
          </Container>
        </div>
      )}
    </header>
  );
}
