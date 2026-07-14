import type { Metadata } from "next";
import { business, menu } from "@/lib/business";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { MenuExplorer } from "@/components/MenuExplorer";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "TEE's Deli breakfast & lunch menu — made-to-order egg sandwiches, deli classics, hot grill items, salads, and soups. Order online for pickup in West Boylston, MA.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <>
      <PageHero
        eyebrow="Deli menu"
        title="Breakfast & lunch, made to order."
        intro="Real, fresh deli food — no two orders the same. Walk in, call ahead, or order online for pickup."
      >
        <Button href={business.links.toast} external size="lg">
          Order on Toast
        </Button>
      </PageHero>

      <Section tone="paper" className="pt-0">
        <MenuExplorer breakfast={menu.breakfast} lunch={menu.lunch} />
        <p className="mt-8 text-sm text-stone">
          Before ordering, please let our staff know about any food allergies or
          dietary restrictions in your party. Prices and items may change. Call{" "}
          <a
            href={`tel:${business.phone.tel}`}
            className="font-medium text-clay underline-offset-4 hover:underline"
          >
            {business.phone.display}
          </a>{" "}
          for daily specials or large pickup orders.
        </p>
      </Section>
    </>
  );
}
