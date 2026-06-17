import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  EnvelopeSimple,
  MapPin,
  FacebookLogo,
  ForkKnife,
} from "@phosphor-icons/react/dist/ssr";
import { business, hours, nav } from "@/lib/business";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="bg-espresso text-paper">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          {/* Brand + address */}
          <div>
            <Link
              href="/"
              aria-label={`${business.name} — home`}
              className="inline-flex rounded-2xl bg-paper p-3 shadow-sm transition-transform duration-150 ease-[var(--ease-calm)] hover:-translate-y-0.5"
            >
              <Image
                src="/tees-deli-logo.webp"
                alt={`${business.name} logo`}
                width={2048}
                height={1299}
                className="h-20 w-auto"
                priority={false}
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/70">
              Deli storefront and full-service catering for the{" "}
              {business.serviceArea}.
            </p>
            <address className="mt-5 not-italic">
              <a
                href={business.links.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-2 text-sm text-paper/80 transition-colors hover:text-clay"
              >
                <MapPin weight="regular" className="mt-0.5 size-4 shrink-0" aria-hidden />
                {business.address.full}
              </a>
            </address>
            <p className="mt-3 text-xs text-paper/55">
              We moved from {business.formerAddress} — find us in West Boylston
              now.
            </p>
          </div>

          {/* On mobile these two columns sit side by side to cut the scroll;
              on md+ md:contents dissolves the wrapper into the 3-col grid. */}
          <div className="grid grid-cols-2 gap-6 md:contents">
          {/* Explore */}
          <nav aria-label="Footer">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/50">
              Explore
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              {nav.map((item) => (
                <li key={item.label}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-paper/80 transition-colors hover:text-clay"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-paper/80 transition-colors hover:text-clay"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact + hours */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/50">
              Get in touch
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${business.phone.tel}`}
                  className="inline-flex items-center gap-2 text-paper/80 transition-colors hover:text-clay"
                >
                  <Phone weight="regular" className="size-4" aria-hidden />
                  {business.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${business.email}`}
                  className="inline-flex items-center gap-2 text-paper/80 transition-colors hover:text-clay"
                >
                  <EnvelopeSimple weight="regular" className="size-4" aria-hidden />
                  {business.email}
                </a>
              </li>
              <li>
                <a
                  href={business.links.toast}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-paper/80 transition-colors hover:text-clay"
                >
                  <ForkKnife weight="regular" className="size-4" aria-hidden />
                  Order on Toast
                </a>
              </li>
              <li>
                <a
                  href={business.links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-paper/80 transition-colors hover:text-clay"
                >
                  <FacebookLogo weight="regular" className="size-4" aria-hidden />
                  Facebook
                </a>
              </li>
            </ul>
            <div className="mt-5 space-y-1 text-xs text-paper/55">
              <p>{hours.walkIn.label}: {hours.walkIn.summary}</p>
              <p>{hours.catering.label}: {hours.catering.summary}</p>
            </div>
          </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-paper/10 pt-6 text-xs text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {business.name}. All rights
            reserved.
          </p>
          <p>{business.serviceArea}</p>
        </div>
      </Container>
    </footer>
  );
}
