import { Phone } from "@phosphor-icons/react/dist/ssr";
import { business } from "@/lib/business";
import { Section, Eyebrow, centerOnPhone } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
// The quote form is switched off for now — see the note below.
// import { QuoteForm } from "@/components/QuoteForm";

export function QuoteSection({
  id = "quote",
  tone = "sand",
}: {
  id?: string;
  tone?: "sand" | "paper";
}) {
  return (
    <Section id={id} tone={tone}>
      <div className="grid gap-6 sm:gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal className={`${centerOnPhone} lg:pt-2`}>
          <Eyebrow>Get a catering quote</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            Tell us about your event.
          </h2>
          <p className="mt-4 max-w-md text-lg text-stone">
            Give us a call with the date, headcount and what you have in mind,
            and we&rsquo;ll start building your menu.
          </p>
        </Reveal>

        {/* TEMPORARY (October 2026): the quote form is commented out until
            the Resend account and Netlify variables in QUOTE-FORM-EMAIL.md
            are in place — a form that can't deliver is worse than none.
            To bring it back, delete the call card below, restore the import
            above, and put this back:

        <Reveal delay={0.08}>
          <QuoteForm />
        </Reveal>
        */}
        <Reveal delay={0.08}>
          <div
            className={`${centerOnPhone} rounded-2xl border border-sand bg-card p-6 shadow-[0_30px_60px_-30px_rgba(33,28,23,0.35)] sm:p-8`}
          >
            <p className="text-sm font-medium uppercase tracking-wide text-stone">
              Call to get started
            </p>
            <a
              href={`tel:${business.phone.tel}`}
              className="mt-3 inline-flex items-center gap-3 font-display text-3xl font-semibold text-espresso transition-colors hover:text-clay sm:text-4xl"
            >
              <Phone weight="regular" className="size-8 shrink-0" aria-hidden />
              {business.phone.display}
            </a>
            <p className="mt-4 text-stone">
              We answer catering calls from 6am to 10pm, any day.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
