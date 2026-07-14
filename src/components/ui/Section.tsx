import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Tone = "paper" | "sand" | "espresso";

const toneClass: Record<Tone, string> = {
  paper: "bg-paper text-espresso",
  sand: "bg-sand text-espresso",
  espresso: "bg-espresso text-paper",
};

/**
 * Vertical rhythm wrapper. `tone="espresso"` is how deep "trust" blocks are
 * rendered in this variant — never a colored block.
 */
export function Section({
  tone = "paper",
  className,
  containerClassName,
  id,
  children,
  bare = false,
}: {
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  id?: string;
  children: React.ReactNode;
  /** Skip the inner Container (for full-bleed content). */
  bare?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        // Tighter vertical rhythm on phones so sections don't each eat a
        // screen; sm+ keeps the original desktop spacing untouched.
        "relative scroll-mt-28 py-10 sm:py-24",
        toneClass[tone],
        className,
      )}
    >
      {bare ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}

/** Small eyebrow label used above section headings. */
export function Eyebrow({
  children,
  onDark = false,
}: {
  children: React.ReactNode;
  onDark?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-block text-xs font-semibold uppercase tracking-[0.18em]",
        onDark ? "text-clay/90" : "text-clay",
      )}
    >
      {children}
    </span>
  );
}
