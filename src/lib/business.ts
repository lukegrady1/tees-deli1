/**
 * Single source of truth for TEE's Deli & Catering business facts.
 * All facts come from the project handoff (DESIGN.md §2). Do not invent
 * menu items, prices, hours, or testimonials — mark unknowns "priced on call".
 */

export const business = {
  name: "TEE's Deli & Catering",
  shortName: "TEE's Deli",
  tagline: "Deli + full-service catering",
  address: {
    street: "26 West Boylston Street, Unit #5",
    city: "West Boylston",
    region: "MA",
    postalCode: "01583",
    full: "26 West Boylston Street, Unit #5, West Boylston, MA 01583",
  },
  // They moved from this permanently-closed address ~2 years ago.
  formerAddress: "939 Southbridge Street, Worcester",
  phone: { display: "(978) 729-2337", tel: "+19787292337" },
  email: "teesdelimart@msn.com",
  serviceArea: "Greater Worcester & West Boylston, MA",
  geo: { lat: 42.366, lng: -71.785 }, // approximate, West Boylston St
  links: {
    toast:
      "https://www.toasttab.com/tees-deli-catering-26-west-boylston-street",
    facebook: "https://www.facebook.com/teesdeli",
    maps: "https://www.google.com/maps/search/?api=1&query=26+West+Boylston+Street+Unit+5+West+Boylston+MA+01583",
  },
  reputation: {
    recommendRate: "96%",
    note: "of Facebook reviewers recommend",
    colleges: ["Holy Cross", "WPI"],
    // Paraphrased sentiment only — never paste long verbatim reviews.
    sentiments: [
      "Visiting teams come back for the quality, fair pricing, and prompt service.",
      "Offices love a hot, fresh spread that shows up on time and set up right.",
    ],
  },
} as const;

/** Hours expressed as managed/current state — never a frozen single date. */
export const hours = {
  walkIn: {
    label: "Walk-in storefront",
    summary: "≈ 6:30am – 2pm daily",
    note: "Hours shift as catering jobs come in — call ahead to confirm.",
    openHour: 6.5,
    closeHour: 14,
  },
  catering: {
    label: "Pre-scheduled catering",
    summary: "5am – 10pm, 7 days a week",
  },
  consults: {
    label: "Catering consults",
    summary: "Call anytime 6am – 10pm, any day",
  },
} as const;

export type NavItem = { label: string; href: string; external?: boolean };

export const nav: NavItem[] = [
  { label: "Catering", href: "/catering" },
  { label: "Menu", href: "/menu" },
  { label: "Order", href: business.links.toast, external: true },
  { label: "Contact", href: "/contact" },
];

/** Content for an individual catering offering's own page. */
export type CateringDetail = {
  eyebrow: string;
  intro: string;
  photoLabel: string;
  metaDescription: string;
  highlights: { title: string; body: string }[];
  includes: string[];
  useCases: string[];
  /** Optional real photo for the hero/highlights slot (else a placeholder). */
  heroImage?: string;
  /** Optional gallery of real event photos. */
  gallery?: { image: string; caption: string }[];
  /** Optional printed menu/flyer image shown on the offering's page. */
  flyer?: { image: string; alt: string };
  /**
   * Optional pricing, transcribed as editable text (crawlable + easy to update).
   * Update these values when prices change — no need to re-shoot the flyer.
   */
  pricing?: {
    rate: string;
    rateNote?: string;
    fees?: { label: string; value: string; note?: string }[];
    additional?: { label: string; value: string }[];
    fineprint?: string[];
  };
};

export type CateringOffering = {
  slug: string;
  title: string;
  blurb: string; // short copy for the bento grid
  span?: "large";
  featured?: boolean;
  /**
   * Photo for this offering's tile in the bento grid (homepage + /catering).
   * Omit it and the tile renders the designed placeholder instead of a broken
   * image — so only set this once the file actually exists in /public.
   */
  cardImage?: string;
  /**
   * Detail content for the offering's own page at /catering/<slug>.
   * Breakfast Pizza has a dedicated, hand-built page instead, so it omits this.
   */
  detail?: CateringDetail;
};

/** Real photos from catered BBQ events (branded TEE's setups). */
export const bbqEvents: { image: string; caption: string }[] = [
  {
    image: "/technetics-family-bbq2.webp",
    caption: "Technetics company family BBQ",
  },
  {
    image: "/holy-cross-athletic-staff-bbq.webp",
    caption: "Holy Cross athletic staff BBQ",
  },
  { image: "/curran-graduation-bbq.webp", caption: "Curran graduation BBQ" },
  {
    image: "/shrewsbury-track-field-bbq.webp",
    caption: "Shrewsbury track & field team BBQ",
  },
  { image: "/premier-optical-bbq.webp", caption: "Premier Optical company BBQ" },
  { image: "/technetics-family-bbq.webp", caption: "Technetics family BBQ" },
  {
    image: "/chicken-kabobs-grill.webp",
    caption: "Chicken kabobs over the grill",
  },
  {
    image: "/tees-tent-backyard.webp",
    caption: "Our tent up for a backyard cookout",
  },
  {
    image: "/bbq-staff-grilling.webp",
    caption: "Our crew on the grill, mid-service",
  },
  {
    image: "/bbq-grill-setup-lawn.webp",
    caption: "Grill, griddle and tent, set up on the lawn",
  },
];

/** Catering offerings — power the bento grid AND each offering's own page. */
export const cateringOfferings: CateringOffering[] = [
  {
    slug: "corporate-breakfast-lunch",
    title: "Corporate Breakfast & Lunch",
    blurb:
      "Hot or cold spreads for meetings and offices, delivered and set up across the Worcester area.",
    span: "large",
    cardImage: "/office-buffet-line.webp",
    detail: {
      eyebrow: "Corporate catering",
      intro:
        "Our bread and butter. Hot or cold breakfasts and luncheons for offices, meetings, and training days — built to your headcount, delivered, and set up so you can keep the meeting moving.",
      photoLabel:
        "Corporate luncheon buffet, hot and cold options laid out for an office",
      metaDescription:
        "Corporate breakfast & lunch catering in the Greater Worcester area — continental or full breakfasts and hot or cold luncheons, delivered and set up. Get a quote.",
      highlights: [
        {
          title: "Breakfast, your way",
          body: "Continental or full breakfasts to start the day right.",
        },
        {
          title: "Hot or cold luncheons",
          body: "Corporate lunch spreads tailored to the room and the budget.",
        },
        {
          title: "Delivered & set up",
          body: "On time, set up clean, ready to serve — you take the credit.",
        },
      ],
      includes: [
        "Continental or full breakfasts",
        "Corporate luncheons (hot or cold)",
        "Boxed lunches",
        "Breakfast Pizza for meetings",
      ],
      useCases: [
        "Team meetings",
        "Client presentations",
        "Training days",
        "All-hands & early starts",
      ],
      heroImage: "/office-buffet-line.webp",
      gallery: [
        {
          image: "/sandwich-wrap-platters.webp",
          caption: "Sandwich and wrap platters for a cold luncheon",
        },
        {
          image: "/chicken-broccoli-rice-trays.webp",
          caption: "Hot trays — chicken, broccoli and rice",
        },
        {
          image: "/sausage-peppers-trays.webp",
          caption: "Sausage, peppers and onions, ready to travel",
        },
        {
          image: "/meatball-trays.webp",
          caption: "Meatball trays for a hot buffet",
        },
        {
          image: "/antipasto-platter.webp",
          caption: "Antipasto platter",
        },
        {
          image: "/seafood-salad-rolls-platter.webp",
          caption: "Seafood salad rolls, platter-ready",
        },
      ],
    },
  },
  {
    slug: "college-team-boxed-lunches",
    title: "College Team Boxed Lunches",
    blurb:
      "The go-to for home and visiting teams — quality, price, and prompt service.",
    cardImage: "/boxed-lunches-stacked.webp",
    detail: {
      eyebrow: "For the teams",
      intro:
        "We're the top choice for home and visiting teams across Worcester — including colleges like Holy Cross and WPI — on quality, price, and prompt service. Order from the menu or build a custom box for a quote.",
      photoLabel:
        "Custom boxed lunches packed and labeled for a visiting team",
      metaDescription:
        "Boxed lunches for college and visiting sports teams in Worcester — serving teams at Holy Cross, WPI and beyond on quality, price, and prompt service. Build a custom box.",
      highlights: [
        {
          title: "Built for game day",
          body: "Portable, satisfying boxes that travel well and show up on time.",
        },
        {
          title: "Quality, price, prompt",
          body: "Why visiting teams keep coming back — three things, every time.",
        },
        {
          title: "Menu or custom",
          body: "Order straight from the menu or build a custom box for a quote.",
        },
      ],
      includes: ["Boxed lunches", "Concessions", "Tailgates"],
      useCases: [
        "Home & visiting teams",
        "Game-day travel",
        "Tournaments & meets",
        "Team meals",
      ],
      heroImage: "/boxed-lunches-open.webp",
      gallery: [
        {
          image: "/team-meals-containers.webp",
          caption: "Individual hot meals — pasta, rice and grilled chicken",
        },
        {
          image: "/boxed-salads-grilled-chicken.webp",
          caption: "Grilled chicken salads, boxed with dressing and cutlery",
        },
        {
          image: "/team-meals-boxed-lineup.webp",
          caption: "Boxed meals and salads lined up for a team",
        },
        {
          image: "/bagged-lunches-rows.webp",
          caption: "Bagged lunches, ready for pickup",
        },
        {
          image: "/bagged-lunches-tables.webp",
          caption: "A full team's worth of bagged lunches",
        },
        {
          image: "/college-tailgate-grills.webp",
          caption: "Game-day tailgate, grills fired up",
        },
      ],
    },
  },
  {
    slug: "barbecues",
    title: "Company & Family Barbecues",
    blurb:
      "Full-service cookouts for staff appreciation days and family gatherings.",
    cardImage: "/technetics-family-bbq2.webp",
    detail: {
      eyebrow: "Cookouts",
      intro:
        "Full-service barbecues for companies and families — from staff appreciation days to backyard gatherings. We bring the cookout to you, set up and ready to serve.",
      photoLabel:
        "Backyard barbecue spread, trays of grilled favorites ready to serve",
      metaDescription:
        "Company & family barbecue catering in the Greater Worcester area — full-service cookouts, tailgates, and concessions, delivered and set up. Get a quote.",
      highlights: [
        {
          title: "Company cookouts",
          body: "Staff appreciation days and team celebrations done right.",
        },
        {
          title: "Family gatherings",
          body: "Backyard barbecues without the backyard work.",
        },
        {
          title: "Tailgates & concessions",
          body: "Game-day spreads and concession-style service, too.",
        },
      ],
      includes: ["Company & family barbecues", "Tailgates", "Concessions"],
      useCases: [
        "Staff appreciation",
        "Family gatherings",
        "Tailgates",
        "Summer cookouts",
      ],
      heroImage: "/technetics-family-bbq2.webp",
      gallery: bbqEvents,
      flyer: {
        image: "/barbecue-menu.webp",
        alt: "Printed TEE's Basic Barbecue catering menu and pricing sheet.",
      },
      pricing: {
        rate: "$18.00 per person",
        rateNote:
          "Food cost per head, with no add-ons or changes. Suggested menu based on 50 guests.",
        fees: [
          {
            label: "Set-up fee",
            value: "$325.00",
            note: "Includes grill & griddle, tent & serving tables (grill area), two attendants (up to two hours grilling time), and travel time (one hour round trip).",
          },
        ],
        additional: [
          { label: "Sales tax (West Boylston based)", value: "7%" },
          { label: "Gratuity", value: "Customer discretion" },
          {
            label: "Additional travel time",
            value: "$60.00 / half hour + $0.75 / mile",
          },
          { label: "Extra attendant", value: "$60.00 / hour" },
          { label: "Plates, napkins, utensils, etc.", value: "5% of food cost" },
        ],
        fineprint: [
          "Permits (propane & Board of Health) vary by town and typically run $25–$100; required only for parties that need our on-site grilling service.",
        ],
      },
    },
  },
  {
    slug: "graduations-reunions",
    title: "Graduations & Reunions",
    blurb: "Graduation parties and class reunions handled end to end.",
    // A real graduation TEE's catered — already in /public, previously unused.
    cardImage: "/curran-graduation-bbq.webp",
    detail: {
      eyebrow: "Celebrations",
      intro:
        "Graduation parties and class reunions, handled end to end. Tell us the headcount and the vibe — we build the menu, deliver, and set up so you can be a guest at your own party.",
      photoLabel: "Graduation party platters and display, set up for guests",
      metaDescription:
        "Graduation party and class reunion catering in the Greater Worcester area — full-service spreads built to your headcount, delivered and set up. Get a quote.",
      highlights: [
        {
          title: "Graduation parties",
          body: "Crowd-pleasing spreads for the big day.",
        },
        {
          title: "Class reunions",
          body: "Feed the whole class without lifting a finger.",
        },
        {
          title: "Built to your headcount",
          body: "Scaled to your guest list and your budget.",
        },
      ],
      includes: ["Graduation parties", "Class reunions"],
      useCases: [
        "Graduation parties",
        "Class reunions",
        "Milestone celebrations",
        "Family events",
      ],
      heroImage: "/curran-graduation-bbq.webp",
      gallery: [
        {
          image: "/graduation-party-2023.webp",
          caption: "Graduation party, tented for the rain",
        },
        {
          image: "/graduation-party-tent.webp",
          caption: "Grad party setup in the backyard",
        },
        {
          image: "/garden-party-buffet.webp",
          caption: "Garden party buffet, guests served",
        },
        {
          image: "/tees-tents-backyard-party.webp",
          caption: "Two tents up for a backyard celebration",
        },
      ],
    },
  },
  {
    slug: "bereavement-meals",
    title: "Bereavement Meals",
    blurb:
      "Thoughtful, fuss-free spreads delivered when families need them most.",
    // Deliberately a quiet, plain platter shot — nothing celebratory here.
    cardImage: "/sandwich-wrap-platters.webp",
    detail: {
      eyebrow: "With care",
      intro:
        "Thoughtful, fuss-free meals delivered when families need them most. We handle the food and the setup with care and on short notice, so you can focus on the people who matter.",
      photoLabel:
        "Bereavement meal, simple and comforting, delivered and set up",
      metaDescription:
        "Bereavement meal catering in the Greater Worcester area — thoughtful, fuss-free spreads delivered and set up with care, on short notice. Get a quote.",
      highlights: [
        {
          title: "Handled with care",
          body: "Comforting food, set up quietly so you don't have to think about it.",
        },
        {
          title: "Short notice welcome",
          body: "We understand timing is rarely planned — call us anytime.",
        },
        {
          title: "Delivered & set up",
          body: "We bring it, set it, and get out of the way.",
        },
      ],
      includes: ["Bereavement meals"],
      useCases: ["Receptions", "Family gatherings", "Short-notice needs"],
      heroImage: "/sandwich-wrap-platters.webp",
      flyer: {
        image: "/bereavement-meals.webp",
        alt: "Printed TEE's Deli bereavement meals menu and pricing sheet.",
      },
      pricing: {
        rate: "$25.00 per person",
        rateNote:
          "Plus sales tax. Suggested luncheon buffet based on about 50 guests — fully customizable.",
        additional: [
          { label: "Hall table & chairs set-up", value: "Additional charge" },
          { label: "Permits (if needed)", value: "Additional charge" },
        ],
        fineprint: [
          "Price includes set-up, tend & cleanup (one attendant for three hours), plates, napkins, utensils, chafing dishes with Sterno, and travel time (up to one hour round trip).",
          "The menu is a suggested starting point — tell us what you have in mind and we'll put together an estimate for you.",
        ],
      },
    },
  },
  {
    slug: "breakfast-pizza",
    title: "Breakfast Pizza",
    blurb: "Our signature half-sheet focaccia pizza — feeds 8–12.",
    featured: true,
    cardImage: "/breakfast-pizza.webp",
    // Has its own dedicated page at /catering/breakfast-pizza (no generic detail).
  },
];

/**
 * Photos for the slots that aren't tied to a catering offering.
 *
 * TO ADD ONE: drop the image in /public, then set the path here. Leave a value
 * undefined and the designed placeholder renders instead — never a broken image.
 * Real TEE's photos only (their Facebook is the source); stock food shots
 * misrepresent what customers actually get.
 */
export const sitePhotos: Record<"boxedLunches", string | undefined> = {
  // /catering "Boxed lunches built for game day".
  boxedLunches: "/team-meals-boxed-lineup.webp",
};

/** Look up an offering by slug. */
export function getOffering(slug: string): CateringOffering | undefined {
  return cateringOfferings.find((o) => o.slug === slug);
}

/** Every distinct catering category from the handoff. */
export const cateringCategories = [
  "Continental or full breakfasts",
  "Corporate luncheons (hot or cold)",
  "Boxed lunches",
  "Concessions",
  "Company & family barbecues",
  "Tailgates",
  "Graduation parties",
  "Bereavement meals",
  "Class reunions",
] as const;

/** Breakfast Pizza — signature product. Prices only where known. */
export const breakfastPizza = {
  feeds: "Feeds 8–12 people",
  base: "Focaccia-base, half-sheet-pan, thick-crust",
  startingPrice: "$29.99",
  pitch:
    "Not the same old bagels, danish, muffins & doughnuts. A thick-crust focaccia pizza built for a room full of people.",
  formats: ["Ready-to-bake", "Delivered ready-to-serve"],
  varieties: [
    {
      name: "House Special",
      detail: "Eggs, American cheese, peppers, onions, sausage, ham, bacon",
      price: "$32.99",
    },
    { name: "Egg-less", detail: "All the flavor, no eggs", price: "Priced on call" },
    { name: "Sausage", detail: "Classic sausage", price: "Priced on call" },
    { name: "Western", detail: "Peppers, onions, ham", price: "Priced on call" },
    { name: "Corned Beef Hash", detail: "Diner-style hash", price: "Priced on call" },
    { name: "Vegetarian", detail: "Veg-forward, no meat", price: "Priced on call" },
    { name: "Cheeseburger", detail: "Burger-inspired", price: "Priced on call" },
    { name: "Gluten-Free", detail: "GF base available", price: "Priced on call" },
    {
      name: "Double Breakfast Pizza",
      detail: "New — double up for bigger rooms",
      price: "$47.99",
    },
  ],
  halfPrice: "$17.99",
  useCases: [
    "Office meetings",
    "Kids' sleepovers",
    "Bereavement gifts",
    "Vacations (freeze & bring)",
    "Holiday brunch & mornings",
    "Church socials",
  ],
} as const;

/**
 * Real, text-based menu — transcribed from the storefront menus (replacing the
 * old image-only menus per the brief: crawlable, accessible, no JPEG menus).
 * Prices as printed; omit price for choice/option lines.
 */
export type MenuItem = { name: string; desc?: string; price?: string };
export type MenuGroup = { group: string; items: MenuItem[] };

export const menu: { breakfast: MenuGroup[]; lunch: MenuGroup[] } = {
  breakfast: [
    {
      group: "Breakfast Sandwiches",
      items: [
        {
          name: "Egg, Meat & Cheese",
          price: "$6.75",
          desc: "Meats: ham, bacon or sausage. Breads: bagel, bulkie, English muffin, or sliced white, wheat or marble rye.",
        },
        { name: "Meat & Cheese", price: "$5.75" },
        { name: "Egg & Cheese", price: "$4.75" },
      ],
    },
    {
      group: "Breakfast Wraps",
      items: [
        {
          name: "The “Lunchwrecker”",
          price: "$10.50",
          desc: "Two slices bacon, two slices ham, two sausage links, two slices American cheese, two sliced tomatoes and two scrambled eggs in a white flour tortilla.",
        },
        {
          name: "The Western Wrap",
          price: "$9.99",
          desc: "Two scrambled eggs with diced ham, onions, red & green bell peppers and American cheese in a white flour tortilla.",
        },
        {
          name: "The Steakfast Wrap",
          price: "$10.99",
          desc: "Two scrambled eggs with shaved steak, onions, red & green bell peppers and American cheese in a white flour tortilla.",
        },
        {
          name: "The “Bacon-ater” Wrap",
          price: "$10.50",
          desc: "Two scrambled eggs with four slices of bacon and American cheese in a wrap.",
        },
        {
          name: "The “Snausages” Wrap",
          price: "$8.99",
          desc: "Two scrambled eggs with two sausage patties, onions and cheddar cheese.",
        },
      ],
    },
    {
      group: "Breakfast on Texas Toast",
      items: [
        {
          name: "Breakfast Sandwich on Texas Toast",
          price: "$8.99",
          desc: "Two eggs with bacon, ham or sausage and cheese.",
        },
        {
          name: "Western on Texas Toast",
          price: "$9.99",
          desc: "Two-egg Western omelet served on Texas toast.",
        },
        {
          name: "Shaved Steak on Texas Toast",
          price: "$10.99",
          desc: "Two-egg omelet with shaved steak, peppers, onions and cheese.",
        },
      ],
    },
    {
      group: "Sides & Add-ons",
      items: [
        { name: "Home Fries", price: "$2.99" },
        { name: "Extra Egg", price: "$1.75" },
        { name: "Extra Meat", price: "$2.50" },
        {
          name: "Bagel, Bulkie or English Muffin w/ Butter",
          price: "$1.99",
        },
        { name: "Bagel or Bulkie Roll with Cream Cheese", price: "$2.99" },
        { name: "Toast", price: "$1.99", desc: "White, wheat or marble rye." },
      ],
    },
  ],
  lunch: [
    {
      group: "Deli Sandwiches",
      items: [
        { name: "Grilled Chicken", price: "$8.50" },
        { name: "Roast Turkey", price: "$8.50" },
        { name: "TEE’s Italian", price: "$8.50" },
        { name: "Roast Beef", price: "$8.50" },
        { name: "Ham", price: "$8.50" },
        { name: "Chicken Salad", price: "$8.50" },
        { name: "Tuna Salad", price: "$8.99" },
        { name: "Hard Salami", price: "$8.99" },
        { name: "Cranberry Walnut Chicken Salad", price: "$8.99" },
        { name: "Chicken Caesar Salad Wrap", price: "$8.99" },
        { name: "Vegetarian", price: "$6.99" },
        { name: "Vegan", price: "$6.99" },
        {
          name: "Bread choices",
          desc: "Sliced white, wheat, marble rye or Texas toast; white, wheat or tomato wraps; sub and bulkie rolls.",
        },
      ],
    },
    {
      group: "Grilled Sandwiches",
      items: [
        {
          name: "Steak & Cheese",
          price: "$9.50",
          desc: "Add peppers & onions — $10.50.",
        },
        { name: "Pastrami", price: "$11.99" },
        {
          name: "Buffalo Chicken",
          price: "$9.50",
          desc: "With ranch or blue cheese.",
        },
        {
          name: "Barbecue Chicken",
          price: "$9.50",
          desc: "With cheddar cheese.",
        },
        { name: "Teriyaki Chicken", price: "$9.50" },
        { name: "Tuna Melt on Marble Rye", price: "$9.99" },
        {
          name: "Ball Park Sausage",
          price: "$8.99",
          desc: "With peppers and onions.",
        },
        { name: "Cheeseburger", price: "$10.99" },
      ],
    },
    {
      group: "Texas Toasties",
      items: [
        { name: "BLTEE with mayo", price: "$10.99" },
        { name: "Grilled Chicken BLTEE w/ mayo", price: "$10.99" },
        { name: "Turkey BLTEE with mayo", price: "$10.99" },
        {
          name: "Chicken Cheddar Melt",
          price: "$10.99",
          desc: "Grilled chicken with bacon, ranch and cheddar cheese.",
        },
        { name: "Ham and Swiss", price: "$9.50" },
        { name: "Chicken Salad Melt", price: "$9.50" },
      ],
    },
    {
      group: "SpecialTEE — Steak Subs",
      items: [
        {
          name: "Shaved Steak Bomb",
          price: "$10.99",
          desc: "Shaved steak with American cheese, peppers, onions and mushrooms on a sub roll.",
        },
        {
          name: "The Tornado",
          price: "$10.99",
          desc: "Shaved steak with provolone, roasted red peppers, grilled onions and Genoa hard salami on a sub roll.",
        },
        {
          name: "The Olympian",
          price: "$10.99",
          desc: "Shaved steak with American cheese, cheddar, onion rings and barbecue sauce on a sub roll.",
        },
        {
          name: "Marinated Steak Tips Sub",
          price: "$13.99",
          desc: "Tender sirloin steak tips in TEE’s special marinade on a sub roll with your favorite toppings.",
        },
      ],
    },
    {
      group: "SpecialTEE — Chicken Sandwiches",
      items: [
        {
          name: "The Rocket",
          price: "$11.99",
          desc: "House special — grilled chicken with bacon, sweet capicola, roasted red peppers, provolone, sautéed diced tomatoes, olive oil and Italian seasonings on a sub roll.",
        },
        {
          name: "Chicken Cheddar Melt (sub)",
          price: "$10.99",
          desc: "Grilled chicken with bacon, cheddar cheese and ranch on a sub roll.",
        },
        {
          name: "Grilled Chicken BLTEE Melt",
          price: "$10.50",
          desc: "Grilled chicken with bacon, lettuce, tomato, American cheese and mayo, grilled on Texas toast.",
        },
        {
          name: "Mediterranean Wrap",
          price: "$9.50",
          desc: "Grilled chicken with Kalamata olives, feta, pepperoncini and Greek dressing, seared on the grill.",
        },
        {
          name: "TEE’s Asian Wrap",
          price: "$9.50",
          desc: "Grilled chicken with roasted red peppers, diced cucumbers, shaved carrots, rice and TEE’s Asian sauce, seared on the grill.",
        },
      ],
    },
    {
      group: "Turkey Sandwiches",
      items: [
        {
          name: "The Crusader Special",
          price: "$9.99",
          desc: "Sliced turkey breast with tomato, onion, Swiss and Thousand Island, grilled on wheat bread.",
        },
        {
          name: "Turkey Reuben",
          price: "$9.99",
          desc: "Sliced turkey breast with sauerkraut, Swiss and Thousand Island, grilled on wheat bread.",
        },
        {
          name: "Turkey Rachel",
          price: "$9.99",
          desc: "Sliced turkey breast with cole slaw, Swiss and Thousand Island, grilled on wheat bread.",
        },
      ],
    },
    {
      group: "Salads",
      items: [
        {
          name: "Tossed Salad",
          price: "$5.50",
          desc: "Side tossed salad — $3.99.",
        },
        {
          name: "Tossed Salad with Grilled Chicken",
          price: "$8.50",
          desc: "With buffalo, teriyaki or barbecue chicken $9.50; shaved steak $10.99; chicken salad $8.50; cranberry-walnut chicken salad $9.50; tuna salad $9.50.",
        },
        {
          name: "Greek Salad",
          price: "$7.50",
          desc: "With grilled chicken — $9.99.",
        },
        {
          name: "Chef Salad",
          price: "$9.99",
          desc: "Hard-boiled egg, ham, turkey, provolone & American cheese.",
        },
        {
          name: "Caesar Salad",
          price: "$6.50",
          desc: "With grilled chicken $9.50; grilled veggies $8.99; shaved steak $11.99; cheeseburger $12.99; steak tips $14.99.",
        },
        {
          name: "Dressing choices",
          desc: "House broccoli, golden Italian, zesty Italian, balsamic, red wine vinaigrette, blue cheese, ranch, Thousand Island, Greek, classic Caesar, and oil & vinegar.",
        },
      ],
    },
    {
      group: "Coaches Meals",
      items: [
        {
          name: "Coaches Meal",
          price: "From ~$12.00",
          desc: "A joint effort of TEE’s and Holy Cross’ football coaching staff: any Grilled or SpecialTEE sandwich served over rice pilaf or penne pasta instead of bread, with toppings to your liking. Price increases with added ingredients.",
        },
      ],
    },
    {
      group: "Sides",
      items: [
        { name: "Red Bliss Potato Salad", price: "$2.99" },
        { name: "Italian Pasta Salad", price: "$2.99" },
        { name: "Cole Slaw", price: "$2.99" },
        { name: "Broccoli/Bacon Salad", price: "$3.50" },
        { name: "Small Chocolate Chip Cookie", price: "$1.25" },
        { name: "Bag of 1 oz. Lay’s Chips", price: "$1.25" },
      ],
    },
    {
      group: "Beverages",
      items: [
        { name: "12 oz. Can of Coke", price: "$1.75" },
        { name: "12 oz. Can of Diet Coke", price: "$1.75" },
        { name: "12 oz. Can of Sprite", price: "$1.75" },
        { name: "12 oz. Can of Ginger Ale", price: "$1.75" },
        { name: "16 oz. Bottle of Water", price: "$1.25" },
      ],
    },
  ],
};

/**
 * FALLBACK specials flyer only.
 *
 * The live flyer is whatever the owner last posted at /admin — it's stored in
 * Netlify Blobs and always wins over this (see lib/specials.ts). This is what
 * the homepage shows before he has ever posted one, or if he takes his down.
 * Set `image` to null to show the "no flyer posted" placeholder instead.
 */
export const dailySpecial: {
  image: string | null;
  alt: string;
  postedLabel: string | null;
} = {
  image: "/daily-special-6-15.webp",
  alt: "TEE's Deli daily specials for June 15 — Breakfast: “Kinglish” muffin sandwich with two eggs, sausage, onions and cheddar, served with home fries, $10.99. Lunch: Chicken Parmesan sub with choice of side, $12.99.",
  postedLabel: "June 15",
};

/**
 * Canonical site URL, used for metadata, sitemap, robots and JSON-LD.
 * Set NEXT_PUBLIC_SITE_URL in Netlify to the live domain — Netlify's own `URL`
 * covers deploys until then. Keep this in sync when a custom domain is added.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.URL ??
  "http://localhost:3000";
