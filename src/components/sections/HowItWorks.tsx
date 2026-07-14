import {
  ChatCircleText,
  NotePencil,
  Truck,
} from "@phosphor-icons/react/dist/ssr";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    icon: ChatCircleText,
    title: "Call or request a quote",
    body: "Tell us the date, headcount, and what you're hosting. No account, no fuss.",
  },
  {
    icon: NotePencil,
    title: "We build your custom menu",
    body: "Hot or cold, dietary needs handled — we tailor it to your room and budget.",
  },
  {
    icon: Truck,
    title: "We deliver & set up",
    body: "On time, set up clean, ready to serve. You focus on your guests.",
  },
];

export function HowItWorks() {
  return (
    <Section tone="sand">
      <Reveal className="mb-6 max-w-2xl sm:mb-10">
        <Eyebrow>How catering works</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
          Three steps, zero stress.
        </h2>
      </Reveal>

      <ol className="grid gap-3 sm:gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 0.08} className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-sand bg-card p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <s.icon
                  weight="thin"
                  className="size-9 text-espresso"
                  aria-hidden
                />
                <span className="font-display text-3xl font-semibold text-clay">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold sm:mt-5">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={0.1} className="mt-10">
        <Button href="/contact" size="lg">
          Start your quote
        </Button>
      </Reveal>
    </Section>
  );
}
