"use client";

/* The two images here are a local blob: preview and a flyer served by a route
   handler — neither is a /public file, so next/image buys nothing. */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { startTransition, useActionState, useRef, useState } from "react";
import { CheckCircle, Camera } from "@phosphor-icons/react";
import { publishFlyer, removeFlyer, signOut, type FormState } from "./actions";

export type CurrentFlyer = { url: string; postedLabel: string };

/** Longest edge of the uploaded image, in pixels. */
const MAX_EDGE = 1600;

/**
 * Shrink a phone photo before uploading it. A modern phone camera produces a
 * 4–8MB image, which is slow to upload on a deli's wifi and slower still for
 * every visitor to download. This gets it to a few hundred KB with no visible
 * loss at the size the flyer is displayed.
 *
 * Any failure here (an odd format, no canvas) falls back to the original file —
 * the server still validates type and size.
 */
async function shrink(file: File): Promise<File> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);

    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.85),
    );
    if (!blob) return file;

    return new File([blob], "flyer.jpg", { type: "image/jpeg" });
  } catch {
    return file;
  }
}

export function FlyerUploader({ current }: { current: CurrentFlyer | null }) {
  const [state, publish, publishing] = useActionState<FormState, FormData>(
    publishFlyer,
    {},
  );
  const [preview, setPreview] = useState<string | null>(null);
  const [preparing, setPreparing] = useState(false);
  const [confirmingRemove, setConfirmingRemove] = useState(false);
  const chosenFile = useRef<File | null>(null);

  async function onChoose(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setPreparing(true);
    const ready = await shrink(file);
    chosenFile.current = ready;

    setPreview((old) => {
      if (old) URL.revokeObjectURL(old);
      return URL.createObjectURL(ready);
    });
    setPreparing(false);
  }

  function onPublish() {
    if (!chosenFile.current) return;
    const data = new FormData();
    data.set("flyer", chosenFile.current);
    // The file is downscaled before we get here, so it can't be submitted via a
    // plain form action — dispatching by hand means we own the transition.
    startTransition(() => publish(data));
  }

  function startOver() {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    chosenFile.current = null;
  }

  // Posted. Confirm it loudly, then get out of the way. This has to win over the
  // preview screen below — after a publish the preview is still set.
  if (state.done) {
    return (
      <div className="mx-auto w-full max-w-md text-center">
        <CheckCircle
          weight="fill"
          className="mx-auto size-20 text-clay"
          aria-hidden
        />
        <h1 className="mt-6 font-display text-3xl font-semibold">
          It&rsquo;s on the website.
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-stone">
          Customers can see today&rsquo;s specials right now.
        </p>
        <Link
          href="/#specials"
          className="mt-8 flex h-16 w-full items-center justify-center rounded-xl bg-clay text-xl font-semibold text-paper hover:bg-clay-deep"
        >
          See it on the website
        </Link>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 h-14 w-full rounded-xl border border-espresso/25 text-lg font-semibold text-espresso hover:border-espresso/60"
        >
          Post another flyer
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <h1 className="font-display text-3xl font-semibold">
        Today&rsquo;s specials
      </h1>

      {preview ? (
        <>
          <p className="mt-3 text-lg leading-relaxed text-stone">
            This is what customers will see. Look right?
          </p>
          <img
            src={preview}
            alt="The flyer you just chose"
            className="mt-6 w-full rounded-2xl border border-sand bg-card"
          />
          <button
            onClick={onPublish}
            disabled={publishing}
            className="mt-6 h-16 w-full rounded-xl bg-clay text-xl font-semibold text-paper transition-colors hover:bg-clay-deep active:scale-[0.985] disabled:opacity-50"
          >
            {publishing ? "Putting it up…" : "Put it on the website"}
          </button>
          <button
            onClick={startOver}
            disabled={publishing}
            className="mt-3 h-14 w-full rounded-xl text-lg font-semibold text-stone underline-offset-4 hover:underline disabled:opacity-50"
          >
            Pick a different photo
          </button>
        </>
      ) : (
        <>
          {current ? (
            <>
              <p className="mt-3 text-lg leading-relaxed text-stone">
                This flyer is on the website now. You posted it{" "}
                {current.postedLabel}. It stays up until you replace it.
              </p>
              <img
                src={current.url}
                alt="The flyer currently on the website"
                className="mt-6 w-full rounded-2xl border border-sand bg-card"
              />
            </>
          ) : (
            <p className="mt-3 text-lg leading-relaxed text-stone">
              No flyer is posted right now. Take a photo of today&rsquo;s flyer,
              or pick one from your phone.
            </p>
          )}

          <label className="mt-6 flex h-16 w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-clay text-xl font-semibold text-paper transition-colors hover:bg-clay-deep active:scale-[0.985]">
            <Camera weight="regular" className="size-6" aria-hidden />
            {preparing
              ? "Getting it ready…"
              : current
                ? "Post a new flyer"
                : "Choose flyer photo"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={onChoose}
              className="sr-only"
            />
          </label>
        </>
      )}

      {state.error && (
        <p role="alert" className="mt-5 text-lg font-medium text-clay-deep">
          {state.error}
        </p>
      )}

      {current && !preview && (
        <div className="mt-12 border-t border-sand pt-6">
          {confirmingRemove ? (
            <>
              <p className="text-lg text-stone">
                Take the flyer down? The specials section will go back to normal
                until you post a new one.
              </p>
              <div className="mt-4 flex gap-3">
                <form action={removeFlyer} className="flex-1">
                  <button
                    type="submit"
                    className="h-14 w-full rounded-xl border border-clay text-lg font-semibold text-clay-deep hover:bg-clay/5"
                  >
                    Yes, take it down
                  </button>
                </form>
                <button
                  onClick={() => setConfirmingRemove(false)}
                  className="h-14 flex-1 rounded-xl border border-espresso/25 text-lg font-semibold hover:border-espresso/60"
                >
                  Keep it up
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => setConfirmingRemove(true)}
              className="text-base font-medium text-stone underline underline-offset-4"
            >
              Take this flyer down
            </button>
          )}
        </div>
      )}

      <form action={signOut} className="mt-8">
        <button
          type="submit"
          className="text-base font-medium text-stone underline underline-offset-4"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}
