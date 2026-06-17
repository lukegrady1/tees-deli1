"use client";

import { useEffect, useState } from "react";
import { Clock } from "@phosphor-icons/react/dist/ssr";
import { hours } from "@/lib/business";
import { cn } from "@/lib/cn";

type Status = { open: boolean; text: string } | null;

function computeStatus(): Status {
  const now = new Date();
  const h = now.getHours() + now.getMinutes() / 60;
  const open = h >= hours.walkIn.openHour && h < hours.walkIn.closeHour;
  return open
    ? { open: true, text: "Walk-in open now · til ≈ 2pm" }
    : { open: false, text: "Walk-in closed · opens ≈ 6:30am" };
}

/**
 * Subtle live walk-in status. Computed on the client at mount so it is always
 * current — never a frozen date. Catering is separately always-available, so
 * "closed" here never means you can't order catering.
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
    <span
      className={cn(
        "inline-flex items-center gap-2 text-sm",
        onDark ? "text-paper/75" : "text-stone",
        className,
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
        <span>Walk-in ≈ 6:30am – 2pm · catering 5am – 10pm</span>
      )}
    </span>
  );
}
