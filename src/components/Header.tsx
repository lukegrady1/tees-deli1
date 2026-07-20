"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { List, X, Phone, CaretDown } from "@phosphor-icons/react/dist/ssr";
import { business, nav, type NavItem } from "@/lib/business";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/**
 * Desktop nav item with a dropdown. The parent stays a real link (Catering
 * still opens /catering) and the caret is a separate control that toggles the
 * panel.
 *
 * Deliberately click-to-open rather than hover-to-open: with both, hovering
 * opens the panel and the click that follows immediately closes it again, so
 * the caret reads as broken. One trigger means mouse, keyboard, and touch all
 * behave the same.
 */
function NavDropdown({
  item,
  pathname,
}: {
  item: NavItem & { children: NavItem[] };
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = `nav-${item.label.toLowerCase().replace(/\W+/g, "-")}`;

  // A tap outside dismisses it. Pointerdown rather than click so the panel is
  // gone before the tapped element reacts.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // Navigating away closes it — the panel would otherwise hang over the new
  // page. Adjusted during render rather than in an effect: React re-runs this
  // component before committing, so the panel never paints over the new route.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  const isActive =
    pathname === item.href || pathname.startsWith(`${item.href}/`);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          buttonRef.current?.focus();
        }
      }}
    >
      <div className="flex items-center gap-1">
        <Link
          href={item.href}
          className={cn(
            "text-base font-medium transition-colors hover:text-clay",
            isActive ? "text-clay" : "text-espresso/80",
          )}
        >
          {item.label}
        </Link>
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${open ? "Hide" : "Show"} ${item.label} pages`}
          className="inline-flex size-6 items-center justify-center rounded-md text-espresso/70 transition-colors hover:text-clay"
        >
          <CaretDown
            weight="bold"
            aria-hidden
            className={cn(
              "size-3.5 transition-transform duration-200",
              open && "rotate-180",
            )}
          />
        </button>
      </div>

      {open && (
        <div
          id={panelId}
          className="absolute left-0 top-full z-50 w-72 pt-3"
        >
          <ul className="overflow-hidden rounded-2xl border border-sand bg-paper py-2 shadow-[0_24px_48px_-24px_rgba(33,28,23,0.45)]">
            {item.children.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block px-4 py-2.5 text-[0.95rem] transition-colors hover:bg-sand hover:text-clay",
                    pathname === child.href
                      ? "text-clay"
                      : "text-espresso/85",
                  )}
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

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
            src={"/tees-deli-logo.webp"}
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
            ) : item.children?.length ? (
              <NavDropdown
                key={item.label}
                item={{ ...item, children: item.children }}
                pathname={pathname}
              />
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
                // Sub-links render indented rather than behind an expander:
                // this sheet closes on any tap inside it, so a disclosure
                // button would dismiss the menu instead of opening the group.
                <div key={item.label} className="flex flex-col gap-1">
                  <Link
                    href={item.href}
                    className={cn(
                      "rounded-xl px-3 py-3 text-base font-medium hover:bg-sand",
                      pathname === item.href ? "text-clay" : "text-espresso/90",
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.children?.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        "rounded-xl py-2.5 pl-7 pr-3 text-[0.95rem] hover:bg-sand",
                        pathname === child.href
                          ? "text-clay"
                          : "text-espresso/75",
                      )}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
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
