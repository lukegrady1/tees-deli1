import { Hero } from "@/components/sections/Hero";
import { CateringBento } from "@/components/sections/CateringBento";
import { SocialProof } from "@/components/sections/SocialProof";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { BreakfastPizzaFeature } from "@/components/sections/BreakfastPizzaFeature";
import { DeliStrip } from "@/components/sections/DeliStrip";
import { DailySpecials } from "@/components/sections/DailySpecials";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { HoursLocation } from "@/components/sections/HoursLocation";

/**
 * The specials flyer is owner-editable, so the homepage can't be baked once at
 * build time. Publishing revalidates this page immediately; this is the backstop
 * if that ever fails to fire.
 */
export const revalidate = 60;

export default function Home() {
  return (
    <>
      <Hero />
      <CateringBento />
      <SocialProof />
      <HowItWorks />
      <BreakfastPizzaFeature />
      <DeliStrip />
      <DailySpecials />
      <QuoteSection />
      <HoursLocation />
    </>
  );
}
