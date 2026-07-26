"use client";

import { useEffect, useState } from "react";
import { Clock } from "@phosphor-icons/react/dist/ssr";
import { business, hours } from "@/lib/business";
import { cn } from "@/lib/cn";

type Status = { open: boolean; text: string } | null;

function computeStatus(): Status {
  const now = new Date();
  const h = now.getHours() + now.getMinutes() / 60;
  const open = h >= hours.walkIn.openHour && h < hours.walkIn.closeHour;
  // Hedged wording on purpose. This is the clock against a typical day, not a
  // reading of the actual door — the deli's hours move with the catering
  // schedule — so it must not read as a promise that they're open.
  return open
    ? { open: true, text: "Deli usually open now · til ≈ 2pm" }
    : { open: false, text: "Deli closed now · usually opens ≈ 6:30am" };
}

/**
 * Subtle live walk-in status, always paired with the call-ahead caveat.
 * Computed on the client at mount so it is always current — never a frozen
 * date. Catering is separately always-available, so "closed" here never means
 * you can't order catering.
 */
export function LiveHours({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  const [status, setStatus] = useState<Status>(null);

  useEffect(() => {
    // Intentional: compute the status from the client clock after mount so the
    // markup matches on hydration (the server can't know the visitor's time),
    // then keep it fresh every minute.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus(computeStatus());
    const id = setInterval(() => setStatus(computeStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span
        className={cn(
          "inline-flex items-center gap-2 text-sm",
          onDark ? "text-paper/75" : "text-stone",
        )}
        aria-live="polite"
      >
        <Clock weight="regular" className="size-4 shrink-0" aria-hidden />
        {status ? (
          <>
            <span
              aria-hidden
              className={cn(
                "size-2 rounded-full",
                status.open ? "bg-clay" : "bg-stone/50",
              )}
            />
            {status.text}
          </>
        ) : (
          // Static, non-misleading fallback before hydration.
          <span>Deli hours vary · catering 5am – 10pm</span>
        )}
      </span>

      {/* The caveat travels with the status — a bare "open now" would send
          people over on a day the deli is out on a job. Indented to clear the
          clock icon (size-4 + gap-2) so it hangs under the status text. */}
      <a
        href={`tel:${business.phone.tel}`}
        className={cn(
          "pl-6 text-sm underline-offset-4 hover:underline",
          onDark ? "text-paper/70 hover:text-paper" : "text-stone hover:text-clay",
        )}
      >
        {hours.walkIn.short} · {business.phone.display}
      </a>
    </div>
  );
}
