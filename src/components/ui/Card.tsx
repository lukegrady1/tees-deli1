import { cn } from "@/lib/cn";

/** Card — thin sand border, white surface, light rounding. No heavy shadow. */
export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-sand bg-card",
        className,
      )}
    >
      {children}
    </div>
  );
}
