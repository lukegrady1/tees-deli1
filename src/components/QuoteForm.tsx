"use client";

import { useId, useState } from "react";
import { CheckCircle, PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr";
import { cateringCategories, business } from "@/lib/business";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Fields = {
  name: string;
  contact: string;
  eventDate: string;
  headcount: string;
  type: string;
  notes: string;
};

const empty: Fields = {
  name: "",
  contact: "",
  eventDate: "",
  headcount: "",
  type: cateringCategories[0],
  notes: "",
};

type Errors = Partial<Record<keyof Fields, string>>;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Please add a name.";
  if (!f.contact.trim()) {
    e.contact = "Add a phone or email so we can reply.";
  } else {
    const looksEmail = /\S+@\S+\.\S+/.test(f.contact);
    const looksPhone = /[\d][\d\s().-]{6,}/.test(f.contact);
    if (!looksEmail && !looksPhone)
      e.contact = "Enter a valid phone number or email.";
  }
  if (f.headcount && Number(f.headcount) <= 0)
    e.headcount = "Headcount should be a positive number.";
  return e;
}

export function QuoteForm() {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const uid = useId();

  function set<K extends keyof Fields>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  // Proper handler — never a raw form submit. No personal data goes into URLs.
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    // TODO(integration): POST `values` to a real destination before launch
    // (e.g. /api/quote → email teesdelimart@msn.com, or a form service).
    // Confirmed with owner: demo-only for now — no network call is made.
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setDone(true);
  }

  if (done) {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-4 rounded-2xl border border-sand bg-card p-8"
      >
        <CheckCircle weight="fill" className="size-10 text-clay" aria-hidden />
        <h3 className="font-display text-2xl font-semibold">
          Thanks, {values.name.split(" ")[0] || "there"} — request received.
        </h3>
        <p className="max-w-prose text-stone">
          We&rsquo;ll be in touch shortly to build your menu. Need it sooner?
          Call us anytime 6am–10pm at{" "}
          <a
            href={`tel:${business.phone.tel}`}
            className="font-medium text-clay underline-offset-4 hover:underline"
          >
            {business.phone.display}
          </a>
          .
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setValues(empty);
            setDone(false);
          }}
        >
          Send another request
        </Button>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border border-sand bg-card px-4 py-3 text-base text-espresso " +
    "placeholder:text-stone/60 transition-colors focus:border-clay focus:outline-none " +
    "min-h-11";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-sand bg-card p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        <Labeled id={`${uid}-name`} label="Name" error={errors.name}>
          <input
            id={`${uid}-name`}
            className={cn(field, errors.name && "border-clay")}
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            autoComplete="name"
            placeholder="Your name"
          />
        </Labeled>

        <Labeled
          id={`${uid}-contact`}
          label="Phone or email"
          error={errors.contact}
        >
          <input
            id={`${uid}-contact`}
            className={cn(field, errors.contact && "border-clay")}
            value={values.contact}
            onChange={(e) => set("contact", e.target.value)}
            autoComplete="email"
            placeholder="(978) 000-0000 or you@email.com"
          />
        </Labeled>

        <Labeled id={`${uid}-date`} label="Event date" optional>
          <input
            id={`${uid}-date`}
            type="date"
            className={field}
            value={values.eventDate}
            onChange={(e) => set("eventDate", e.target.value)}
          />
        </Labeled>

        <Labeled
          id={`${uid}-head`}
          label="Headcount"
          optional
          error={errors.headcount}
        >
          <input
            id={`${uid}-head`}
            type="number"
            min={1}
            inputMode="numeric"
            className={cn(field, errors.headcount && "border-clay")}
            value={values.headcount}
            onChange={(e) => set("headcount", e.target.value)}
            placeholder="e.g. 25"
          />
        </Labeled>

        <Labeled
          id={`${uid}-type`}
          label="Catering type"
          className="sm:col-span-2"
        >
          <select
            id={`${uid}-type`}
            className={field}
            value={values.type}
            onChange={(e) => set("type", e.target.value)}
          >
            {cateringCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Labeled>

        <Labeled
          id={`${uid}-notes`}
          label="Notes"
          optional
          className="sm:col-span-2"
        >
          <textarea
            id={`${uid}-notes`}
            rows={4}
            className={cn(field, "resize-y")}
            value={values.notes}
            onChange={(e) => set("notes", e.target.value)}
            placeholder="Tell us about your event, dietary needs, delivery & setup…"
          />
        </Labeled>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={submitting}>
          <PaperPlaneTilt weight="regular" className="size-4" aria-hidden />
          {submitting ? "Sending…" : "Request my quote"}
        </Button>
        <p className="text-sm text-stone">
          Prefer to talk? Call{" "}
          <a
            href={`tel:${business.phone.tel}`}
            className="font-medium text-clay underline-offset-4 hover:underline"
          >
            {business.phone.display}
          </a>
          .
        </p>
      </div>
    </form>
  );
}

function Labeled({
  id,
  label,
  optional,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium text-espresso">
        {label}
        {optional && <span className="ml-1 text-stone/70">(optional)</span>}
      </label>
      {children}
      {error && (
        <span role="alert" className="text-sm text-clay-deep">
          {error}
        </span>
      )}
    </div>
  );
}
