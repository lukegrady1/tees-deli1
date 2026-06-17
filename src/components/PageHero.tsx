import Link from "next/link";
import { CaretLeft } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/** Compact, consistent header for inner pages. One h1 per page lives here. */
export function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumb,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  /** Optional "back to parent" link, e.g. for /catering/* subpages. */
  breadcrumb?: { label: string; href: string };
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-4">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_20%_0%,rgba(181,84,59,0.06),transparent_60%)]"
      />
      <Container className="pb-14 pt-8 sm:pb-20 sm:pt-10">
        <Reveal className="max-w-3xl">
          {breadcrumb && (
            <Link
              href={breadcrumb.href}
              className="mb-5 flex w-fit items-center gap-1 text-sm font-medium text-stone transition-colors hover:text-clay"
            >
              <CaretLeft weight="bold" className="size-3.5" aria-hidden />
              {breadcrumb.label}
            </Link>
          )}
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone">
              {intro}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </Container>
    </section>
  );
}
