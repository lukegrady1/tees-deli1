import { Hero } from "@/components/sections/Hero";
import { CateringBento } from "@/components/sections/CateringBento";
import { SocialProof } from "@/components/sections/SocialProof";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { BreakfastPizzaFeature } from "@/components/sections/BreakfastPizzaFeature";
import { DeliStrip } from "@/components/sections/DeliStrip";
import { DailySpecials } from "@/components/sections/DailySpecials";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { HoursLocation } from "@/components/sections/HoursLocation";

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
