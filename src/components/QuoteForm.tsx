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
  if (!f.eventDate) e.eventDate = "Pick the date of your event.";
  if (!f.headcount.trim()) {
    e.headcount = "Tell us roughly how many people.";
  } else {
    // Number("") is 0 and Number("abc") is NaN, so test the parsed value
    // rather than trusting the number input to have kept the field clean.
    const n = Number(f.headcount);
    if (!Number.isFinite(n) || n <= 0)
      e.headcount = "Headcount should be a positive number.";
  }
  return e;
}

export function QuoteForm() {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState(false);
  // Bot trap. Hidden from people, so anything in it means the submission is
  // automated — the API route drops those.
  const [website, setWebsite] = useState("");
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
    setFailed(false);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website }),
      });
      if (!res.ok) throw new Error(`Quote POST failed: ${res.status}`);
      setDone(true);
    } catch {
      // Never show the thank-you screen on a failure — the visitor would walk
      // away believing Tom has their event details. The fallback tells them to
      // call, and their answers stay in the fields so they can retry.
      setFailed(true);
    } finally {
      setSubmitting(false);
    }
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
            setFailed(false);
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
      // `relative` anchors the off-screen honeypot to this form rather than the
      // page, so it can't drag out the document's scroll width.
      className="relative rounded-2xl border border-sand bg-card p-6 sm:p-8"
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

        <Labeled id={`${uid}-date`} label="Event date" error={errors.eventDate}>
          <input
            id={`${uid}-date`}
            type="date"
            className={cn(field, errors.eventDate && "border-clay")}
            value={values.eventDate}
            onChange={(e) => set("eventDate", e.target.value)}
          />
        </Labeled>

        <Labeled id={`${uid}-head`} label="Headcount" error={errors.headcount}>
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

      {/* Off-screen rather than display:none — some bots skip hidden fields but
          fill anything they can reach. tabIndex/autoComplete keep it out of the
          way of real people using a keyboard or autofill. */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label htmlFor={`${uid}-website`}>Website</label>
        <input
          id={`${uid}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {failed && (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-clay bg-clay/[0.06] p-3 text-sm text-espresso"
        >
          Something went wrong sending that. Please try again, or call us on{" "}
          <a
            href={`tel:${business.phone.tel}`}
            className="font-medium text-clay underline-offset-4 hover:underline"
          >
            {business.phone.display}
          </a>{" "}
          — we&rsquo;ll take the details over the phone.
        </p>
      )}

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
