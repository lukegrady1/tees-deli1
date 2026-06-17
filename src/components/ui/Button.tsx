import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "outlineLight" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-tight " +
  "transition-[transform,background-color,border-color,color] duration-150 ease-[var(--ease-calm)] " +
  "active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50 " +
  // Tap target ≥ 44px
  "min-h-11";

const variants: Record<Variant, string> = {
  // The one accent — primary CTA only.
  primary: "bg-clay text-paper hover:bg-clay-deep shadow-sm",
  // Secondary — outlined espresso on light backgrounds.
  outline:
    "border border-espresso/25 bg-transparent text-espresso hover:border-espresso/60 hover:bg-espresso/[0.04]",
  // Outlined for use on espresso/dark blocks.
  outlineLight:
    "border border-paper/30 bg-transparent text-paper hover:border-paper/70 hover:bg-paper/[0.06]",
  ghost: "text-clay hover:text-clay-deep underline-offset-4 hover:underline",
};

const sizes: Record<Size, string> = {
  md: "px-5 text-sm",
  lg: "px-7 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type AsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AsLink = CommonProps & {
  href: string;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export function Button(props: AsButton | AsLink) {
  // Strip the styling-only props so only DOM-valid attributes hit the element.
  const { variant = "primary", size = "md", className, children, ...rest } =
    props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, external, ...anchorRest } = rest as Omit<
      AsLink,
      keyof CommonProps
    >;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...anchorRest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
