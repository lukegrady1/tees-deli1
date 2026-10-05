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
    // From the September 2026 printed menu: "General operating hours are
    // Monday thru Friday 6:30am – 1:30pm." Still a typical day, not a promise:
    // a catering delivery can close the door mid-morning, so every place the
    // storefront hours appear has to carry the caveat — see `note`/`short`.
    summary: "Mon – Fri 6:30am – 1:30pm (hours vary)",
    note: "We do temporarily close and re-open on days we have scheduled catering deliveries, so please call before you head over — or check Facebook for any upcoming scheduled closings.",
    /** Compact version for tight spots (footer, live status line). */
    short: "Hours vary — please call ahead",
    openHour: 6.5,
    closeHour: 13.5,
    /** Toast online ordering opens later than the door does. */
    online: "Online ordering Mon – Fri 8:30am – 1:30pm",
  },
  catering: {
    label: "Pre-scheduled catering",
    summary: "5am – 10pm, 7 days a week",
  },
  consults: {
    label: "Catering consults",
    summary: "Any day until 8pm, except during the lunch hour",
  },
} as const;

/**
 * Time-boxed service notice, shown at the top of the homepage until `until`
 * passes — then it stops rendering on its own, so it can't linger past the
 * closure and turn away customers once the deli is back to normal.
 *
 * `until` is an absolute instant with an explicit Eastern offset: the shop and
 * its customers are in Massachusetts but Netlify's servers run UTC, so "end of
 * July" has to be pinned to local time or the notice would vanish at 8pm on the
 * 31st. The homepage revalidates every 60s, so expiry lands within the minute.
 *
 * TO EXTEND: move `until`. TO TAKE IT DOWN EARLY: set `body` to null.
 * Verbatim from the owner's Facebook post of July 14, 2026.
 */
export const serviceNotice: {
  body: string | null;
  signature: string;
  until: string;
} = {
  body: "Hi everyone! Please be advised that for the remainder of the month of July we will only be available for pre-scheduled catering jobs and events. Walk-in, call ahead and online ordering will not be available. Thank you for your understanding and continued patronage.",
  signature: "Tom",
  until: "2026-08-01T00:00:00-04:00",
};

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  /**
   * Sub-links shown in a dropdown under this item. The parent stays a real
   * link — the dropdown supplements it, so Catering still opens /catering.
   */
  children?: NavItem[];
};

export const nav: NavItem[] = [
  {
    label: "Catering",
    href: "/catering",
    // Mirrors `cateringOfferings` below. Kept as an explicit list rather than
    // derived from it so the nav wording and order can differ from the grid's.
    children: [
      { label: "Breakfast Meetings", href: "/catering/breakfast-meetings" },
      { label: "Luncheons", href: "/catering/luncheons" },
      { label: "College Team Boxed Lunches", href: "/catering/college-team-boxed-lunches" },
      { label: "Company & Family Barbecues", href: "/catering/barbecues" },
      { label: "Hot Entrées", href: "/catering/hot-entrees" },
      { label: "Party Platters", href: "/catering/platters" },
      { label: "Bereavement Meals", href: "/catering/bereavement-meals" },
      { label: "Breakfast Pizza", href: "/catering/breakfast-pizza" },
    ],
  },
  { label: "Menu", href: "/menu" },
  { label: "Order", href: business.links.toast, external: true },
  { label: "Contact", href: "/contact" },
];

/**
 * Content for an individual catering offering's own page.
 *
 * `intro` is the owner's own wording, carried over from teesdeli.com verbatim
 * — these pages deliberately carry no written-for-us marketing copy. If a page
 * needs to say more, take it from the client, don't compose it here. (An
 * earlier version had invented "highlights", "includes" and "useCases" blocks;
 * they were removed for exactly this reason.)
 */
export type CateringDetail = {
  eyebrow: string;
  intro: string;
  photoLabel: string;
  metaDescription: string;
  /** Optional real photo, used as the card/gallery lead (else a placeholder). */
  heroImage?: string;
  /** Optional gallery of real event photos. */
  gallery?: { image: string; caption: string }[];
  /**
   * Optional printed menu/flyer images shown on the offering's page, in order.
   * More than one when the owner hands out several sheets for the same service.
   * These stay images on purpose — the printed layout is how the client wants
   * the menu read, so don't transcribe them into text here.
   *
   * The exception is a sheet that has been retired (see Boxed Lunches): once
   * the image comes off a page, everything it said has to be carried by
   * `pricing.lists` and the rest of the pricing block instead, or the page
   * quietly loses information the customer needs.
   */
  flyers?: { image: string; alt: string; caption: string }[];
  /**
   * How this offering is named mid-sentence, as in "Here's the ___ menu".
   * Defaults to the lowercased title, which suits plain descriptive names
   * ("bereavement meals") but mangles the ones carrying an article or
   * capitals — "The TEE-Pack" would come out as "the the tee-pack".
   */
  menuLabel?: string;
  /**
   * Optional pricing, transcribed as editable text (crawlable + easy to update).
   * Update these values when prices change — no need to re-shoot the flyer.
   */
  pricing?: {
    rate: string;
    rateNote?: string;
    /**
     * Labelled lists with no prices against them — what's in the box, the
     * protein choices, the bread choices. This is where a retired flyer's
     * content goes: the priced rows belong in `additional`, everything else
     * the sheet told the customer belongs here.
     */
    lists?: { label: string; items: string[] }[];
    fees?: { label: string; value: string; note?: string }[];
    additional?: { label: string; value: string }[];
    /**
     * Heading for the `additional` list. Defaults to "Additional charges",
     * which only fits when the rows really are surcharges — set it to
     * something truthful when the list is a price menu or a set of options.
     */
    additionalLabel?: string;
    fineprint?: string[];
  };
};

export type CateringOffering = {
  slug: string;
  title: string;
  blurb: string; // short copy for the bento grid
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
    slug: "breakfast-meetings",
    title: "Breakfast Meetings",
    blurb:
      "Continental or full breakfasts for meetings and offices, delivered and set up.",
    cardImage: "/breakfast-pastry-platter.webp",
    detail: {
      eyebrow: "Corporate catering",
      intro:
        "Our Corporate Breakfast Meeting catering offers various options to suit your guests, or we can customize something for you. All bagels, muffins, pastries, and doughnuts are made fresh daily. Ideally, please provide a 24-hour notice, but we can handle last-minute requests if needed.",
      photoLabel: "Breakfast pastry platter, made fresh for a morning meeting",
      metaDescription:
        "Corporate breakfast catering in the Greater Worcester area — continental or full breakfasts from $7.99 per person, delivered and set up. Get a quote.",
      heroImage: "/breakfast-pastry-platter.webp",
      gallery: [
        {
          image: "/breakfast-pastry-platter.webp",
          caption: "Bagels, danish and pastries, made fresh daily",
        },
        {
          image: "/breakfast-pizza.webp",
          caption: "Breakfast pizza — one of the packages",
        },
      ],
      flyers: [
        {
          image: "/catering-breakfast-flyer.webp",
          alt: "TEE's Deli breakfast catering sheet. Six packages priced per person: bagels, danish, muffins and donuts with coffee, tea and water $7.99; breakfast pizza with coffee, tea and water $9.50; breakfast sandwiches with home fries or tater tots $9.50; breakfast sandwiches with coffee, tea and water $9.50; pastries with fruit, yogurt, coffee, tea and water $7.99; scrambled eggs, bacon, sausage and home fries or tater tots $13.99. Add-ons include an airpot of coffee $18.99, fruit bowl $39.99, and breakfast pizza $32.99 full or $17.99 half.",
          caption: "Breakfast catering — packages and add-ons.",
        },
      ],
      pricing: {
        rate: "$7.99 – $13.99 per person",
        rateNote:
          "Six packages, from bagels and pastries up to scrambled eggs with bacon and sausage. The sheet alongside has each one.",
        additional: [
          { label: "Airpot of coffee", value: "$18.99" },
          { label: "Bagel, danish, muffin or donut", value: "$2.79" },
          { label: "Fruit bowl", value: "$39.99" },
          { label: "Home fries or tater tots", value: "$2.79" },
          { label: "Sausage (3 links)", value: "$2.79" },
          { label: "Bacon (3 slices)", value: "$3.50" },
          { label: "Breakfast sandwich", value: "$6.75" },
          { label: "Breakfast pizza (full / half)", value: "$32.99 / $17.99" },
          { label: "Juice / water", value: "$1.79 / $1.29" },
        ],
        additionalLabel: "Add-ons",
        fineprint: [
          "All bagels, muffins, pastries, and doughnuts are made fresh daily.",
        ],
      },
    },
  },
  {
    slug: "luncheons",
    title: "Luncheons",
    blurb:
      "Corporate luncheons, hot or cold — built to the room and the budget.",
    cardImage: "/office-buffet-line.webp",
    detail: {
      eyebrow: "Corporate catering",
      intro:
        "Corporate luncheons are a specialty at TEE's Deli & Catering. Our Chicken, Tuna, and Cranberry Walnut Chicken salads are prepared daily from scratch. Additionally, we offer a variety of freshly made side dishes, including Red Bliss Potato Salad, Macaroni Salad, Italian Pasta Salad, Cole Slaw, Apple Pear Slaw, and Broccoli/Bacon Salad.",
      photoLabel:
        "Corporate luncheon buffet, hot and cold options laid out for an office",
      metaDescription:
        "Corporate luncheon catering in the Greater Worcester area — hot or cold lunch packages from $10.50 per person, delivered and set up. Get a quote.",
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
      flyers: [
        {
          image: "/catering-luncheons-flyer.webp",
          alt: "TEE's Deli luncheons sheet, priced per person. Five lunch packages from $10.50 to $13.99 covering subs, grilled sandwiches, wraps, hot entrées and deli platters, plus substitutions, 5-quart side salad bowls from $29.99, and desserts from $8.99.",
          caption: "Luncheons — packages, sides and desserts.",
        },
      ],
      pricing: {
        rate: "$10.50 – $13.99 per person",
        rateNote:
          "Five packages, from a sub with chips and a cookie up to a hot entrée or deli platter. All prices per person.",
        additional: [
          { label: "5qt side salad bowl, feeds twenty", value: "$29.99 – $39.99" },
          { label: "Cookies, one dozen", value: "$8.99" },
          { label: "Cookie platter (small 4doz / large 7doz)", value: "$29.99 / $45.99" },
          { label: "Half sheet brownies (24 count)", value: "$34.99" },
          { label: "Cookie & brownie platter", value: "$45.99" },
          { label: "Soda instead of bottled water", value: "+$0.75" },
          { label: "Side dish instead of chips", value: "+$2.00" },
          { label: "Brownie instead of a cookie", value: "+$1.00" },
        ],
        additionalLabel: "Sides, desserts & substitutions",
        fineprint: [
          "Please inform us of any dietary restrictions in your group.",
        ],
      },
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
        "TEE's Deli offers boxed lunches for home and visiting teams, serving colleges like Holy Cross and WPI in Worcester. With quality food, great prices, and prompt service, we are the top choice for visiting teams. Order from our menu or customize your own, and we'll provide a quote.",
      photoLabel:
        "Custom boxed lunches packed and labeled for a visiting team",
      metaDescription:
        "Boxed lunches for college and visiting sports teams in Worcester — serving teams at Holy Cross, WPI and beyond on quality, price, and prompt service. Build a custom box.",
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
      // No flyer image here on purpose. The printed sheet only exists at the
      // old $11.50 price — the re-export at $11.99 came back with spelling
      // errors — so the sheet is off the page and everything it said is
      // transcribed below. Restore a `flyers` entry only with a clean sheet at
      // the current price, and check nothing below goes stale when you do.
      pricing: {
        rate: "$11.99 per box",
        rateNote:
          "TEE's Deli Basic Box — a sandwich, a 1oz bag of chips, a 1.5oz chocolate chip cookie, and a banana or a 16oz water.",
        lists: [
          {
            label: "Protein choices",
            items: [
              "Turkey",
              "Italian",
              "Chicken salad",
              "Roast beef",
              "Tuna",
              "Grilled chicken",
              "Ham",
              "Chicken Caesar",
              "Vegan, vegetarian and PBJ also available",
            ],
          },
          {
            label: "Bread choices",
            items: [
              "7″ sub roll",
              "Bulkie roll",
              "Sliced white, wheat or marble rye",
              "12″ wrap — white, wheat or tomato",
              "Gluten-free, $1.00 more",
            ],
          },
        ],
        additionalLabel: "Options & add-ons",
        additional: [
          { label: "Make it a large sub", value: "+$2.00" },
          { label: "Upgrade to a 4.5oz cookie", value: "+$2.00" },
          { label: "Grilled instead of cold sandwich", value: "+$3.00" },
          { label: "Gluten-free bread", value: "+$1.00" },
          { label: "Add 20oz Poland Springs water", value: "+$1.25" },
          {
            label: "Add 20oz Gatorade, Snapple or Vitamin Water",
            value: "+$2.00",
          },
        ],
        fineprint: [
          "Every lunch comes in a 9″ × 4″ × 3″ box or a 12lb paper bag with napkins and mayo and mustard packs, labeled with the sandwich name, the person's name, or a number.",
        ],
      },
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
        "All our BBQ set-ups are different depending what and where we have to work with. Corporate and Private Barbecues are a specialty of TEE's Deli.",
      photoLabel:
        "Backyard barbecue spread, trays of grilled favorites ready to serve",
      metaDescription:
        "Company & family barbecue catering in the Greater Worcester area — full-service cookouts, tailgates, and concessions, delivered and set up. Get a quote.",
      heroImage: "/technetics-family-bbq2.webp",
      gallery: bbqEvents,
      // The TEE's Basic Barbecue sheet is off the page on purpose, the same
      // way the Boxed Lunches one is: the printed version exists only at the
      // old prices ($18.00 a head, $325.00 set-up, $60.00 rates) and still
      // lists ketchup, mustard and relish, which the owner has since dropped.
      // Everything it said is transcribed below. Restore a `flyers` entry for
      // it only with a clean sheet at the current prices, and check nothing
      // below goes stale when you do. The entrées/sides sheet stays — it
      // quotes no prices, so nothing on it can fall out of date.
      flyers: [
        {
          image: "/barbecue-entrees-sides.webp",
          alt: "Printed TEE's Deli barbecue sheet listing entrées — hot dogs, cheeseburgers, sausages, grilled chicken, steak tips, shaved steak — and side dishes.",
          caption: "Entrée and side dish choices.",
        },
      ],
      pricing: {
        rate: "$20.00 per person",
        rateNote:
          "Food cost per person, with no add-ons or changes. Suggested menu based on 50 guests — it's there to give you an idea of the food and where you may be price-wise.",
        lists: [
          {
            label: "Suggested menu, 50 guests",
            items: [
              "Hamburgers & veggie burgers — (24) 6oz Bubba Burgers",
              "Ball park sausage — (20) 4oz sweet Italian sausage",
              "Sliced grilled chicken breast — (10lbs) TEE's home marinade",
              "Hot dogs — (16) Kayem natural casing hot dogs",
            ],
          },
          {
            label: "Side dishes — all homemade, choose any two",
            items: [
              "Broccoli/bacon salad",
              "Italian pasta salad",
              "Red bliss potato salad",
              "Cole slaw",
              "Apple pear slaw",
              "Macaroni salad (mayo base)",
            ],
          },
          {
            label: "All barbecues include",
            items: [
              "Hamburger, hot dog and torpedo rolls",
              "Caesar or tossed salad",
              "Sautéed peppers & onions",
              "Sliced & diced onions",
              "Ranch and bleu cheese dressings",
              "Buffalo, BBQ and teriyaki sauces",
              "Burger bar — lettuce, tomato, pickles, onions and condiments",
            ],
          },
        ],
        fees: [
          {
            label: "Set-up fee",
            value: "$350.00",
            note: "Includes grill & griddle, tent & serving tables (grill area), two attendants (up to two hours grilling time), and travel time (one hour round trip).",
          },
        ],
        additional: [
          { label: "Sales tax (West Boylston based)", value: "7%" },
          { label: "Gratuity", value: "Customer discretion" },
          {
            label: "Additional travel time",
            value: "$75.00 / half hour + $0.75 / mile",
          },
          { label: "Extra attendant", value: "$75.00 / hour" },
          { label: "Plates, napkins, utensils, etc.", value: "5% of food cost" },
        ],
        fineprint: [
          "Permits (propane & Board of Health) vary by town and typically run $25–$100; required only for parties that need our on-site grilling service.",
        ],
      },
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
        // teesdeli.com's bereavement page is the flyer alone, with no prose.
        // Kept factual on purpose — the flyer does the talking.
      intro:
        "Bereavement meals, delivered and set up with care and on short notice.",
      photoLabel:
        "Bereavement meal, simple and comforting, delivered and set up",
      metaDescription:
        "Bereavement meal catering in the Greater Worcester area — thoughtful, fuss-free spreads delivered and set up with care, on short notice. Get a quote.",
      heroImage: "/sandwich-wrap-platters.webp",
      flyers: [
        {
          image: "/bereavement-meals-2026-08.webp",
          alt: "TEE's Deli bereavement meals sheet, August 2026. $27.99 per person plus sales tax. Suggested luncheon buffet for 50 guests: small cheese and cracker platter; any two hot entrées such as chicken and broccoli over penne, chicken Normandy, pasta and meatballs, sausage with peppers and onions, or vegetable medley; Caesar, tossed or mixed greens salad; a large finger sandwich platter of chicken, tuna and egg salad; a large sub-cut platter of Italian, roast beef and turkey; broccoli bacon, potato or Italian pasta salad; a cookie and brownie tray; bottled water and canned soda; coffee. Includes set-up, tend and cleanup with one attendant for two and a half hours, plates, napkins, utensils, chafing dishes and Sterno, and 45 minutes of round-trip travel. Hall table and chair set-up and any permits are additional.",
          caption: "The printed bereavement meals flyer.",
        },
      ],
      pricing: {
        rate: "$27.99 per person",
        rateNote:
          "Plus sales tax. Suggested luncheon buffet based on about 50 guests — fully customizable.",
        additional: [
          { label: "Hall table & chairs set-up", value: "Additional charge" },
          { label: "Permits (if needed)", value: "Additional charge" },
        ],
        fineprint: [
          "Price includes set-up, tend & cleanup (one attendant for two and a half hours), plates, napkins, utensils, chafing dishes with Sterno, and travel time (45 minutes round trip).",
          "The menu is a suggested starting point — tell us what you have in mind and we'll put together an estimate for you.",
        ],
      },
    },
  },
  {
    slug: "hot-entrees",
    title: "Hot Entrées",
    blurb:
      "Full and half pans of chicken, sausage, pasta and more — for private events or pick-up.",
    cardImage: "/chicken-broccoli-rice-trays.webp",
    detail: {
      eyebrow: "Full-service dinners",
      intro:
        "TEE's Deli & Catering offers full-service catering for private events at homes, offices, or function halls. We cater Baptisms, Weddings, First Communions, Birthday Parties, Fantasy Drafts, Bereavement Meals, and Anniversary Parties. Pick-up options are also available.",
      photoLabel: "Hot entrée trays — chicken, broccoli and rice, ready to serve",
      metaDescription:
        "Hot entrée catering in the Greater Worcester area — chicken, sausage, pasta and vegetarian pans for weddings, baptisms, birthdays and private events. Full and half pans.",
      heroImage: "/chicken-broccoli-rice-trays.webp",
      gallery: [
        {
          image: "/italian-pickletizer.webp",
          caption: "The Italian Pickle-tizer",
        },
        {
          image: "/sausage-peppers-trays.webp",
          caption: "Sausage with peppers and onions",
        },
        {
          image: "/meatball-trays.webp",
          caption: "Meatballs in homemade marinara",
        },
      ],
      flyers: [
        {
          image: "/catering-dinners-2026-10b.webp",
          alt: "TEE's Deli dinners sheet, October 2026, listing seventeen hot entrées with full pan and half pan prices: Chicken & Broccoli $85.00/$55.00, Chicken Parmesan $85.00/$55.00, Chicken Tenders $125.00/$65.00, Chicken Normandy $79.99/$49.99, Chicken Piccata $85.00/$55.00, Chicken Marsala $85.00/$55.00, Chicken or Sausage Cacciatore $85.00/$55.00, Chicken or Sausage with Peppers & Onions $85.00/$49.99, Chicken Teriyaki with Pineapple $89.99/$55.00, Chicken Ranchero $89.99/$55.00, Mac 'n Cheese $74.99/$39.99, Sausage Penne $79.99/$49.99, Meatballs or Sausage $79.99/$49.99, Roast Porketta $129.99 full pan only, Marinated Steak Tips at market price, Vegetable Medley $65.00/$39.99 and Vegetable Lo Mein $69.99/$39.99.",
          caption: "Hot entrées — full and half pan pricing.",
        },
      ],
      pricing: {
        rate: "From $65.00 per full pan",
        rateNote:
          "Seventeen entrées, each priced by full or half pan — see the sheet for the full list.",
        additionalLabel: "Also available",
        additional: [
          { label: "Italian Pickle-tizer", value: "$39.99" },
          { label: "Marinated steak tips", value: "Market price" },
        ],
        fineprint: [
          "The Italian Pickle-tizer is Italian sub ingredients stuffed inside our homemade half-sour pickles.",
          "Prices may change — call us to confirm and to talk through quantities for your headcount.",
        ],
      },
    },
  },
  {
    slug: "platters",
    title: "Party Platters",
    blurb:
      "Finger sandwiches, pin-wheels, sub-cuts, wraps and dessert trays for private parties.",
    cardImage: "/platter-finger-tuna.webp",
    detail: {
      eyebrow: "Private parties",
      intro:
        "Having a private party? Yup! We do those too! Our Chicken, Tuna, and Cranberry Walnut Chicken salads are prepared daily from scratch, and we offer a variety of freshly made side dishes including Red Bliss Potato Salad, Macaroni Salad, Italian Pasta Salad, Cole Slaw, Apple Pear Slaw, and Broccoli/Bacon Salad.",
      photoLabel: "Finger sandwich platter, cut and arranged for a party",
      metaDescription:
        "Party platters from TEE's Deli in West Boylston — finger sandwiches, pin-wheels, sub-cuts, bulkie rolls, wraps, cannoli and cookie trays, priced by the platter.",
      heroImage: "/platter-finger-tuna.webp",
      // In the order teesdeli.com/platters.html shows them: the three finger
      // sandwich fillings, then the pin-wheels, then the rest of the savoury
      // platters, then desserts — the same sequence as the price list below.
      gallery: [
        {
          image: "/platter-finger-tuna.webp",
          caption: "Tuna finger sandwich platter",
        },
        {
          image: "/platter-finger-egg-salad.webp",
          caption: "Egg salad finger sandwich platter",
        },
        {
          image: "/platter-finger-cranberry-walnut.webp",
          caption: "Cranberry walnut chicken salad finger platter",
        },
        {
          image: "/platter-pinwheels-veggie-hummus.webp",
          caption: "Grilled vegetable and hummus pin-wheels",
        },
        {
          image: "/platter-pinwheels-turkey.webp",
          caption: "Turkey pin-wheels on homemade half-sours",
        },
        { image: "/platter-sub-cuts.webp", caption: "Sub-cut platter" },
        { image: "/platter-bulkie-rolls.webp", caption: "Bulkie roll platter" },
        { image: "/platter-wraps.webp", caption: "Sandwich wrap platter" },
        { image: "/platter-cannoli.webp", caption: "Cannoli platter" },
        {
          image: "/platter-cookies-brownies.webp",
          caption: "Cookie & brownie platter",
        },
        { image: "/platter-cookies.webp", caption: "Large cookie platter" },
      ],
      pricing: {
        // Not "from $29.99": the cheapest line is the small cookie tray, so a
        // "from" price quotes a dessert for a party spread and reads as a
        // bait. The list carries the real numbers, in the order the printed
        // sheet lists them.
        rate: "Priced by the platter",
        rateNote:
          "Finger sandwich platters start at $49.99. They come as egg, tuna, chicken or ham salad; pin-wheels as turkey with garlic aioli, roast beef with horseradish cream, or grilled veggies with hummus.",
        additionalLabel: "Platter prices",
        additional: [
          { label: "Finger sandwich platter", value: "$49.99" },
          { label: "Pin-wheel platter", value: "$64.99" },
          { label: "Sub-cut platter (24 cut)", value: "$54.99" },
          { label: "Sub-cut platter (36 cut)", value: "$79.99" },
          { label: "Bulkie roll platter (16 piece)", value: "$59.99" },
          { label: "Bulkie roll platter (28 piece)", value: "$99.00" },
          { label: "Sandwich wrap platter (20 piece)", value: "$75.00" },
          { label: "Cannoli platter", value: "$64.99" },
          { label: "Cookies & brownies platter", value: "$49.99" },
          { label: "Cookie platter (large, 7 dozen)", value: "$45.99" },
          { label: "Cookie platter (small)", value: "$29.99" },
        ],
        fineprint: [
          "All pin-wheel platters come on a bed of TEE's homemade half-sour pickles.",
        ],
      },
    },
  },
  // The TEE-Pack is pulled for now at the owner's request. Its full entry —
  // copy, includes, $110 pricing and fine print — is in git at 506c99c; put
  // that object back here and add the nav child above to restore the page.
  {
    slug: "breakfast-pizza",
    title: "Breakfast Pizza",
    blurb: "Our signature half-sheet focaccia pizza — feeds 8–12.",
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
  // The owner's own list of occasions, from teesdeli.com — not written for us,
  // which is why it survived the cull of invented per-page copy.
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
 * The printed menu, shown on /menu as the owner's own sheets rather than a
 * transcription — his call, September 2026.
 *
 * October 2026: lunch pages one, two and three are rendered from the Word
 * files he sent ("Daily Page One Sept 2026 (1)", "Daily page two Oct 26",
 * "Daily page three April 2025" — the April file is the one he sent with the
 * October batch and it carries the current prices). The breakfast sheet is
 * the earlier image, kept on his instruction: "Breakfast page I made no
 * changes so you can leave the one you have loaded." Note his "Breakfast Menu
 * Oct 26" Word file differs from it in four prices (Lunchwrecker and
 * Bacon-ater $10.99 not $10.50, Western wrap $8.99 not $9.99, extra egg
 * $1.50 not $1.75) — raised with him, unresolved as of October 5, 2026.
 *
 * TO UPDATE A SHEET: export the new page to an image at 1398 × 1812 with the
 * red double frame, save it under a NEW filename in /public (the image CDN
 * caches by URL, so reusing a name can leave the old sheet showing), and
 * point `image` at it. Keep `alt` in step with what is printed.
 */
export type MenuSheet = { title: string; image: string; alt: string };

export const menuSheets: MenuSheet[] = [
  {
    title: "Breakfast",
    image: "/menu-breakfast.webp",
    alt: "TEE's Deli printed breakfast menu. Breakfast sandwiches with egg, meat and cheese $6.75, meat and cheese $5.75, egg and cheese $4.75. Breakfast wraps: the Lunchwrecker $10.50, Western $9.99, Steakfast $10.99, Bacon-ater $10.50, Snausages $8.99. Breakfast on Texas toast $8.99 to $10.99. Sides and add-ons from $1.75 to $2.99.",
  },
  {
    title: "Lunch · page 1",
    image: "/menu-lunch-1-2026-10.webp",
    alt: "TEE's Deli printed lunch menu, page one, September 2026. Deli sandwiches: grilled chicken $8.99, roast beef $9.50, roast turkey $8.99, ham $8.99, TEE's Italian $9.50, tuna salad $9.50, chicken salad $8.99, hard salami $9.50, vegan $7.50, vegetarian $7.50, cranberry walnut chicken salad $9.50, chicken Caesar salad wrap $9.50. Grilled sandwiches: steak and cheese $9.99 or $10.99 with peppers and onions, pastrami $12.99, buffalo chicken with ranch or blue cheese $9.99, barbecue chicken with cheddar $9.99, teriyaki chicken $9.99, tuna melt on marble rye $10.99, ball park sausage with peppers and onions $8.99, cheeseburger $10.99. Texas toasties: BLTEE with mayo $11.99, grilled chicken BLTEE $11.99, turkey BLTEE $11.99, chicken cheddar melt $11.99, ham and Swiss $10.99. Bread choices: sliced white, wheat, marble rye and Texas toast; white, wheat and tomato wraps; sub and bulkie rolls. Salads: tossed $5.99, side tossed $3.99, tossed with grilled chicken $8.99, with buffalo, teriyaki or barbecue chicken $9.99, with shaved steak $11.99, with chicken salad $8.99, with cranberry walnut chicken salad or tuna salad $9.99; Greek $7.99 or $10.99 with grilled chicken; chef $10.99; Caesar $7.99, with grilled chicken $10.99, shaved steak $12.99, cheeseburger $13.99 or steak tips $15.99. Dressing choices listed, house dressing is the broccoli salad dressing.",
  },
  {
    title: "Lunch · page 2",
    image: "/menu-lunch-2-2026-10.webp",
    alt: "TEE's Deli printed lunch menu, page two, October 2026. SpecialTEE sandwiches. Steak subs: Shaved Steak Bomb $10.99, the Tornado $11.99, the Olympian $11.99, marinated steak tips sub $14.99. Chicken sandwiches: chicken cheddar melt $11.50, the Rocket house special $11.99, Mediterranean wrap $10.99, TEE's Asian wrap $10.99, chicken cheese bomb sub $11.50 with teriyaki, buffalo or barbecue sauce for $1.00 more.",
  },
  {
    title: "Lunch · page 3",
    image: "/menu-lunch-3-2026-10.webp",
    alt: "TEE's Deli printed lunch menu, page three. SpecialTEEs from the grill, continued: the Crusader Special $10.99, turkey Reuben $10.99, pastrami Reuben $14.99, turkey Rachel $10.99, pastrami Rachel $14.99. Sides: red bliss potato salad, Italian pasta salad and cole slaw $3.25, broccoli bacon salad $3.99, small chocolate chip cookie $1.50, bag of Lay's chips $1.25. Beverages: 12 oz cans of Coke, Diet Coke, ginger ale and Sprite $2.00, 16 oz bottle of water $1.25. General operating hours Monday through Friday 6:30am to 1:30pm, online ordering 8:30am to 1:30pm; the deli opens and closes during business hours for catering deliveries, so check here or Facebook for changes.",
  },
];

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
