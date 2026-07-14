"use client";

import { useActionState } from "react";
import { signIn, type FormState } from "./actions";

export function SignInForm() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    signIn,
    {},
  );

  return (
    <form action={formAction} className="mx-auto w-full max-w-md">
      <h1 className="font-display text-3xl font-semibold">Post the specials</h1>
      <p className="mt-3 text-lg leading-relaxed text-stone">
        Enter your password to get started.
      </p>

      <input
        type="password"
        name="password"
        autoComplete="current-password"
        autoFocus
        required
        aria-label="Password"
        className="mt-8 h-16 w-full rounded-xl border border-espresso/25 bg-card px-5 text-xl outline-none focus:border-clay"
      />

      {state.error && (
        <p role="alert" className="mt-4 text-lg font-medium text-clay-deep">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 h-16 w-full rounded-xl bg-clay text-xl font-semibold text-paper transition-colors hover:bg-clay-deep active:scale-[0.985] disabled:opacity-50"
      >
        {pending ? "Checking…" : "Continue"}
      </button>
    </form>
  );
}
