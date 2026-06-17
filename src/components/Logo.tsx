import Link from "next/link";
import { cn } from "@/lib/cn";

/** Wordmark logo. Fraunces TEE's + small-caps descriptor. */
export function Logo({
  onDark = false,
  className,
}: {
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="TEE's Deli & Catering — home"
      className={cn("group inline-flex items-baseline gap-2", className)}
    >
      <span
        className={cn(
          "font-display text-2xl font-semibold leading-none tracking-tight",
          onDark ? "text-paper" : "text-espresso",
        )}
      >
        TEE&rsquo;s
      </span>
      <span
        className={cn(
          "text-[0.7rem] font-semibold uppercase tracking-[0.2em]",
          onDark ? "text-paper/60" : "text-stone",
        )}
      >
        Deli &amp; Catering
      </span>
    </Link>
  );
}
