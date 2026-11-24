import {
  SITE_URL,
  breakfastPizza,
  business,
  cateringCategories,
  cateringOfferings,
  hours,
  menuSheets,
} from "@/lib/business";

/**
 * /llms.txt (llmstxt.org): a plain-markdown summary of the deli for AI
 * assistants and AI search. Built from lib/business.ts like the pages and the
 * JSON-LD, so prices and hours can't disagree with them. Lives outside the
 * (site) group so it isn't wrapped in the site layout; it serves at /llms.txt.
 */
export const dynamic = "force-static";

const url = (path: string) => `${SITE_URL.replace(/\/$/, "")}${path}`;

export function GET() {
  const lines = [
    `# ${business.name}`,
    "",
    `> Deli and full-service catering company in ${business.address.city}, MA, serving ${business.serviceArea}. Breakfast and lunch sandwiches at the walk-in counter, and catering for offices, college teams (including ${business.reputation.colleges.join(" and ")}), barbecues, parties and bereavement meals.`,
    "",
    "## Business details",
    "",
    `- Name: ${business.name}`,
    `- Address: ${business.address.full}`,
    `- Phone: ${business.phone.display}`,
    `- Email: ${business.email}`,
    `- Order online: ${business.links.toast}`,
    `- Facebook: ${business.links.facebook}`,
    `- Service area: ${business.serviceArea}`,
    `- Note: TEE's moved from ${business.formerAddress}; that address is permanently closed.`,
    "",
    "## Hours",
    "",
    `- ${hours.walkIn.label}: ${hours.walkIn.summary}. ${hours.walkIn.note}`,
    `- ${hours.walkIn.online}`,
    `- ${hours.catering.label}: ${hours.catering.summary}`,
    `- ${hours.consults.label}: ${hours.consults.summary}`,
    "",
    "## Catering",
    "",
    ...cateringOfferings.map((o) => {
      const rate = o.detail?.pricing?.rate;
      return `- [${o.title}](${url(`/catering/${o.slug}/`)}): ${o.blurb}${rate ? ` (${rate})` : ""}`;
    }),
    "",
    `Catering covers: ${cateringCategories.join(", ")}.`,
    "",
    "## Breakfast Pizza",
    "",
    `${breakfastPizza.pitch} ${breakfastPizza.base}. ${breakfastPizza.feeds}, from ${breakfastPizza.startingPrice}; ${breakfastPizza.formats.join(" or ").toLowerCase()}.`,
    "",
    ...breakfastPizza.varieties.map((v) => `- ${v.name}: ${v.detail} (${v.price})`),
    "",
    "## Daily menu",
    "",
    ...menuSheets.flatMap((m) => [`### ${m.title}`, "", m.alt, ""]),
    "## Pages",
    "",
    `- [Home](${url("/")})`,
    `- [Catering](${url("/catering/")})`,
    `- [Menu](${url("/menu/")})`,
    `- [Contact and catering quote](${url("/contact/")})`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
