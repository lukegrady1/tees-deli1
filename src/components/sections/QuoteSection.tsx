import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { QuoteForm } from "@/components/QuoteForm";

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
        <Reveal className="lg:pt-2">
          <Eyebrow>Get a catering quote</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            Tell us about your event.
          </h2>
          <p className="mt-4 max-w-md text-lg text-stone">
            A few details is all we need to start building your menu. We&rsquo;ll
            follow up fast — usually same day.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <QuoteForm />
        </Reveal>
      </div>
    </Section>
  );
}
