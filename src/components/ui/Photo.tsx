import Image from "next/image";
import { ForkKnife } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

/**
 * Framed photo slot. Pass `src` to show a real image (object-cover within the
 * chosen aspect ratio); omit it to render the designed warm-neutral placeholder.
 * `label` is the alt text / accessible label either way.
 */
export function Photo({
  label,
  src,
  sizes,
  ratio = "4/3",
  className,
  tone = "sand",
}: {
  label: string;
  src?: string;
  sizes?: string;
  ratio?: "4/3" | "3/2" | "16/9" | "1/1" | "3/4";
  className?: string;
  tone?: "sand" | "espresso";
}) {
  const dark = tone === "espresso";

  if (src) {
    return (
      <div
        style={{ aspectRatio: ratio.replace("/", " / ") }}
        className={cn(
          "relative w-full overflow-hidden rounded-2xl bg-sand",
          className,
        )}
      >
        <Image
          src={src}
          alt={label}
          fill
          sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${label} (photo)`}
      style={{ aspectRatio: ratio.replace("/", " / ") }}
      className={cn(
        "relative isolate flex w-full items-end overflow-hidden rounded-2xl",
        dark ? "bg-espresso text-paper/70" : "bg-sand text-stone",
        className,
      )}
    >
      {/* Soft warm wash so the slot reads as a photo frame, not an empty box */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10",
          dark
            ? "bg-[radial-gradient(120%_90%_at_20%_0%,rgba(181,84,59,0.22),transparent_60%)]"
            : "bg-[radial-gradient(120%_90%_at_80%_0%,rgba(181,84,59,0.10),transparent_55%),linear-gradient(180deg,rgba(33,28,23,0.04),rgba(33,28,23,0.10))]",
        )}
      />
      <ForkKnife
        aria-hidden
        weight="thin"
        className={cn(
          "absolute right-4 top-4 size-7 opacity-40",
          dark ? "text-paper" : "text-stone",
        )}
      />
      <span className="relative m-4 max-w-[80%] text-sm font-medium leading-snug">
        {label}
      </span>
    </div>
  );
}
