import { business, hours } from "@/lib/business";
import { cn } from "@/lib/cn";

/**
 * The storefront call-ahead caveat, in one place so every page that sends
 * someone to the deli says the same thing.
 *
 * The deli's hours move with the catering schedule, so any posted time is a
 * typical day rather than a promise — this is what keeps a customer from
 * driving over on a day the shop is out on a job. Catering is unaffected and
 * never carries this notice.
 */
export function WalkInNotice({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "rounded-xl border border-sand bg-paper p-3 text-sm text-espresso/85",
        className,
      )}
    >
      {hours.walkIn.note}{" "}
      <a
        href={`tel:${business.phone.tel}`}
        className="font-medium text-clay underline-offset-4 hover:underline"
      >
        Call {business.phone.display}
      </a>
    </p>
  );
}
