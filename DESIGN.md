# CLAUDE CODE HANDOFF — TEE's Deli & Catering Website (Subtle / Low-Color Variant)

> **Project:** New marketing website for TEE's Deli & Catering (West Boylston, MA), replacing a dated Weebly site.
> **Direction:** *Catering-First × Fresh & Fast* hybrid — **restrained / low-color palette**. Catering leads the strategy; bright structure stays, but the skin is quiet, warm-neutral, and premium. The food photography provides the color; the UI stays subtle around it.

---

## ‼️ READ FIRST — REQUIRED SKILL

**Before writing any code, invoke and follow the `bencium-impact-ux-designer` skill.**

1. Load `bencium-impact-ux-designer` and read it fully.
2. Treat its UX/visual methodology as **authoritative** for design decisions: layout craft, hierarchy, spacing, type, motion polish, restraint, and avoiding generic/templated output. (This variant is deliberately subtle — the skill's craft discipline matters even more here.)
3. Apply it to **every** page and component — not just the hero.
4. **Precedence rules** (when guidance conflicts):
   - `bencium-impact-ux-designer` wins on **how things look and feel** (UX, visual craft, interaction quality).
   - **This handoff wins on** business facts, content, page structure, the non-negotiables, the restrained palette, and the tech stack.
   - If the two genuinely can't be reconciled, stop and ask rather than guessing.

Do not skip the skill. If it isn't installed/available, stop and tell me before proceeding.

---

## 1. What we're building

A fast, **subtle, premium**, mobile-first marketing site for a deli + full-service catering business. **Catering is the primary revenue line, so catering leads the site.** The walk-in deli is a strong secondary path. It converts two actions:

- **Primary:** *Get a Catering Quote*
- **Secondary:** *Order Online* (existing Toast ordering)

It must look appetizing (the photography does that) and credible enough that a corporate office manager or college coach trusts them with a catering order. **This variant achieves appetite through warm neutrals, whitespace, and food imagery — not bright UI color.**

---

## 2. Business context (the real facts — use these, do not invent)

| Field | Value |
|---|---|
| Business name | TEE's Deli & Catering |
| Type | Deli / sandwich shop + full-service catering |
| Address (ONLY location) | 26 West Boylston Street, Unit #5, West Boylston, MA 01583 |
| Phone | (978) 729-2337 |
| Email | teesdelimart@msn.com |
| Online ordering | Toast — https://www.toasttab.com/tees-deli-catering-26-west-boylston-street |
| Facebook | https://www.facebook.com/teesdeli (96% of reviewers recommend) |
| Service area | Greater Worcester / West Boylston, MA |

**Important location note:** This is their only location. They moved from 939 Southbridge Street, Worcester ~2 years ago. Google Maps still shows the old, **permanently closed** address. The site must clearly state the correct West Boylston address and include a brief "we've moved" line. (GBP cleanup is handled outside the code.)

### Hours (present clearly; do NOT hardcode a single stale date)
- **Walk-in / storefront:** roughly **6:30am – 2pm**, but hours shift as catering jobs come in. Present as current/managed, not a frozen date.
- **Pre-scheduled catering:** **5am – 10pm, 7 days a week.**
- **Catering consults:** call anytime **6am – 10pm**, any day.

### What they do
Deli storefront (walk-in, call-ahead, online) for made-to-order breakfast & lunch, plus full-service catering to businesses, colleges, and private functions. They specialize in **corporate breakfast & lunch meetings**, **college athletic team meals & boxed lunches**, and **corporate & private barbecues**.

### Catering offerings (use as the catering grid + catering page content)
- Continental or full breakfasts
- Corporate luncheons (hot or cold)
- Boxed lunches
- Concessions
- Company & family barbecues
- Tailgates
- Graduation parties
- Bereavement meals
- Class reunions

### Boxed lunches
Aimed at home & visiting sports teams; they serve colleges including **Holy Cross** and **WPI** in Worcester. Positioned as the top choice for visiting teams on quality, price, and prompt service. Customers order from the menu or build a custom box for a quote.

### Breakfast Pizza (signature product — feature it)
Focaccia-base, half-sheet-pan, thick-crust pizza that **feeds 8–12 people**. Pitched as the alternative to "the same old bagels, danish, muffins & doughnuts" for office meetings. Available ready-to-bake or delivered ready-to-serve.

- **Varieties:** House Special (eggs, American cheese, peppers, onions, sausage, ham, bacon), Egg-less, Sausage, Western, Corned Beef Hash, Vegetarian, Cheeseburger. Also **Gluten-Free** and a new **Double Breakfast Pizza**.
- **Pricing:** House Special **$32.99** / Half **$17.99** / Double **$47.99**. Other varieties priced on call (one source lists a starting price of **$29.99**). Show prices where known; use "priced on call" otherwise — do not fabricate prices.
- **Marketed for:** office meetings, kids' sleepovers, bereavement gifts, vacations (freeze & bring), holiday brunch/morning, church socials.

### Reputation
Positive public reviews; **96% of Facebook reviewers recommend**. Listed on Yelp, Yahoo Local, MenuPix, and Toast. Use the 96% stat and 1–2 short paraphrased review sentiments (do not paste long verbatim reviews).

---

## 3. Tech stack & setup

- **Framework:** Next.js (App Router). Default to **Server Components**; isolate interactivity in `'use client'` leaf components.
- **Styling:** **Tailwind v4**. Use `@tailwindcss/postcss` or the Vite plugin — not the legacy `tailwindcss` PostCSS plugin.
- **Animation:** **Motion** — `import { motion } from "motion/react"`.
- **Icons:** **Phosphor** (`@phosphor-icons/react`). One family only; thin/consistent weight (this variant is subtle — favor a lighter stroke). Never hand-roll SVG icons.
- **Fonts:** `next/font` only (no `<link>` Google Fonts in production).
  - Headings: **Fraunces** (soft serif, moderate weights — warm, not loud)
  - Body/UI: **Hanken Grotesk**
  - *(Optional even-quieter alternative: single-family system in Hanken Grotesk only, weight contrast for hierarchy. Pick one and stay consistent.)*
- **Images:** `next/image`, lazy-load below the fold.

```bash
npm install motion @phosphor-icons/react
# fonts via next/font/google — no install needed
```

Confirm Tailwind v4 is set up correctly before styling.

---

## 4. Design system (THIS is what differs from the bright variant)

### Color tokens — warm neutrals + ONE accent
Pull color out of the UI almost entirely. A warm paper-and-espresso neutral system does the structural work; a single muted terracotta accent is reserved for action only. Deep "trust" sections use espresso — **not** a colored block.

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#FAF8F3` | Page background (warm off-white) |
| `--espresso` | `#211C17` | Primary text + deep "trust" blocks |
| `--clay` | `#B5543B` | **The one accent** — primary CTAs and key links only |
| `--stone` | `#6B645B` | Muted/secondary text |
| `--sand` | `#EFE9DF` | Subtle section fills, dividers, thin card borders |
| `--card` | `#FFFFFF` | Cards |

**Color logic:** Neutrals carry ~95% of the page. Clay appears only where you want a click. The deep sections that would be colored elsewhere are espresso here — same trust/contrast effect, zero added hue. **No green, no yellow.** Verify contrast: clay-on-paper and paper-on-espresso must pass WCAG AA.

> **Optional swap** if a cooler/more "catering-credible" accent is preferred: replace `--clay` with muted pine `#3A5145`. Use one accent only — never both.

### Typography
- Fraunces headings at moderate weights — warm and grown-up, restrained sizes (smaller than a "punchy" scale).
- Hanken Grotesk body — high readability, generous line-height.
- Establish one type scale and reuse it; no one-off sizes.

### Shape & spacing
- **Subtlety comes from air, not decoration.** More whitespace than a bright design would use.
- Rounded corners stay but lighter; prefer thin `--sand` borders over heavy fills or strong shadows.
- **CSS Grid** for layout (never flexbox percentage math). Contain with `max-w-7xl mx-auto`. Breakpoints sm 640 / md 768 / lg 1024 / xl 1280.
- Tap targets ≥ 44px.

### Motion (snappy but dialed back)
- Same patterns as the bright variant at **lower amplitude**: quick button-press feedback (~120ms), subtle card lift (`~1.01`), short fade + small rise on scroll-in.
- Calm, confident ease curves — **no bouncy springs.**
- Motion/scroll/sticky components are isolated `'use client'` leaves.
- **Never** drive continuous values (scroll progress, pointer position) with `useState` — use Motion's `useScroll` / `useMotionValue` / `useTransform`.
- Wrap everything in a `prefers-reduced-motion` guard with a static fallback.

---

## 5. Sitemap / routes

| Route | Purpose |
|---|---|
| `/` | Home — catering-led landing (full structure in §6) |
| `/catering` | Full catering page: all offerings, use-cases, gallery, quote CTA |
| `/menu` | Real text breakfast & lunch menu (grouped, searchable) |
| `/breakfast-pizza` | Signature-product page (varieties, pricing, use-cases) |
| `/contact` | Quote form, hours, location/map, phone, email |

Homepage is the conversion centerpiece; deeper pages support it. Sticky CTA on mobile across all pages.

---

## 6. Homepage structure (mobile-first, top → bottom)

Build the **phone layout first**, then enhance for desktop.

1. **Sticky header** — logo, tap-to-call phone, compact *Get a Quote* (clay) button. Desktop adds nav: Catering · Menu · Order · Breakfast Pizza · Contact.

2. **Hero (catering-led)** — confident benefit headline in Fraunces (e.g. *"Catering that makes you look good."*), one-line subhead naming who they feed (offices, college teams, parties) across the Worcester area. Buttons: **Get a Catering Quote** (clay, primary) and **Order Online** (outlined espresso, secondary → Toast). Full-bleed catering/food photo on paper. `min-h-[100dvh]` — never `h-screen`. Small live hours chip in stone text.

3. **Catering use-cases — bento grid** — the heart of the page. CSS Grid, mixed tile sizes, one photo per tile, thin `--sand` borders, tappable: Corporate Breakfast & Lunch (large), College Team Boxed Lunches, Company & Family BBQs, Graduations & Reunions, Bereavement Meals, Breakfast Pizza (highlighted by a clay label, **not** a colored fill). Subtle hover/tap lift. Stacks cleanly on mobile.

4. **Social proof strip** — **espresso** block (not a colored one): "Trusted by teams at **Holy Cross** & **WPI**", the **96% recommend** stat, one short paraphrased review. Paper-colored text on espresso.

5. **How catering works — 3 steps** — *Call or request a quote → We build your custom menu → We deliver & set up.* One thin-stroke Phosphor icon per step; clay used only on step numbers or the trailing CTA.

6. **Breakfast Pizza feature** — warm, appetite-driven block (subtle, not loud): top-down photo, variety chips with thin borders, "feeds 8–12," starting price, CTA into a catering order / `/breakfast-pizza`. Copy stays witty ("not the same old bagels & muffins"); styling stays calm.

7. **The Deli (secondary path)** — compact section: a few hero menu items with photos + prices, prominent **Order on Toast** button (clay), link to full text menu. Real text, not images.

8. **Quote form** — short, mobile-friendly: name, contact, event date, headcount, catering type, notes. Minimal fields. Proper event handlers — do **not** use a raw HTML `<form>` submit in React. Never put personal data in URL params.

9. **Hours + location** — dynamic walk-in hours with the "hours shift for catering — call anytime 6am–10pm" note, catering availability (5am–10pm, 7 days), embedded map pinned to the **correct West Boylston address**, plus a brief "We moved from Worcester — here's where to find us now" line.

10. **Footer** — espresso block: contact, tap-to-call, directions, Toast link, Facebook, hours summary, full address.

---

## 7. Conversion mechanics (do not skip)

- **Persistent mobile action bar:** *Get a Quote* (clay) + *Order* (outlined) fixed to the bottom of the viewport on phones.
- **One primary action per section.**
- **Tap-to-call** on every phone-number instance (`tel:` link).
- **Quote form near the top of its section** on mobile, minimal fields.
- **Performance is conversion:** optimized images, lazy-load below the fold, fast LCP.

---

## 8. Accessibility & SEO requirements

**Accessibility**
- Real text menus (replacing the old image-only menus).
- WCAG AA contrast on all text/CTA combos (clay-on-paper, paper-on-espresso).
- Reduced-motion fallbacks for every animation.
- Tap targets ≥ 44px; visible focus states; semantic heading order.
- Alt text on all food imagery.

**SEO**
- Per-page `<title>` + meta description; semantic HTML; one `<h1>` per page.
- `LocalBusiness` / `Restaurant` JSON-LD with the **correct** West Boylston address, phone, hours, geo.
- Text-based, crawlable menu content — not images.
- OpenGraph/Twitter cards with a strong food image.
- Sitemap + robots.

---

## 9. Suggested build order (task list)

1. Project setup: confirm Next.js + Tailwind v4 + Motion + Phosphor + fonts wired up.
2. **Invoke `bencium-impact-ux-designer`** and internalize it.
3. Define design tokens (warm-neutral palette, type scale, spacing) in the Tailwind theme / global CSS.
4. Build shared primitives: Button (clay primary / outlined secondary), Card (thin sand border), Section wrapper, Container, reduced-motion-aware reveal helper.
5. Build the sticky header + mobile sticky action bar.
6. Build homepage sections top→bottom (§6), mobile-first.
7. Build `/catering`, `/menu`, `/breakfast-pizza`, `/contact`.
8. Wire the quote form (handlers + validation; confirm submission destination before shipping).
9. Add JSON-LD, metadata, OG images, sitemap/robots.
10. Optimize images, run the QA checklist (§10).

---

## 10. Pre-deploy QA checklist (must pass before "done")

- [ ] `bencium-impact-ux-designer` skill was applied across all pages/components.
- [ ] Palette is restrained: warm neutrals + the single clay accent only. **No green, no yellow.** Deep blocks are espresso, not colored.
- [ ] Mobile layout is the strong default; nothing breaks at 360–390px width.
- [ ] Sticky mobile action bar works and doesn't overlap content/footer.
- [ ] Primary CTA (Get a Quote, clay) and secondary (Order Online → Toast) present and working on every page.
- [ ] Toast link is correct and opens ordering.
- [ ] Menus are **real text**, grouped breakfast/lunch, no JPEG menus.
- [ ] Hours display is current/managed — **no hardcoded stale date** anywhere.
- [ ] Address everywhere is the **West Boylston** one; "we moved" note present; map pin correct.
- [ ] Phone numbers are tap-to-call.
- [ ] Breakfast Pizza featured with correct varieties + known prices ("priced on call" where unknown — no invented prices).
- [ ] Quote form validates and routes somewhere real (confirmed with me).
- [ ] All animations respect `prefers-reduced-motion`; motion amplitude is subtle (no bounce).
- [ ] Contrast passes AA; focus states visible; tap targets ≥ 44px; images have alt text.
- [ ] LocalBusiness JSON-LD present and accurate; per-page titles/meta set.
- [ ] Lighthouse: good mobile performance, accessibility, SEO; fast LCP.
- [ ] No `h-screen` on full-height sections (use `min-h-[100dvh]`).
- [ ] No flexbox percentage math; layouts use CSS Grid.
- [ ] One icon family (Phosphor), consistent thin weight; no hand-rolled icon SVGs.

---

## 11. Guardrails — do NOT

- Do **not** skip or shortcut the `bencium-impact-ux-designer` skill.
- Do **not** reintroduce bright/multi-accent color. Keep to neutrals + one accent; achieve emphasis with whitespace, type weight, and photography.
- Do **not** invent menu items, prices, hours, or testimonials. Use §2; mark unknowns as "priced on call."
- Do **not** reproduce long verbatim reviews — paraphrase sentiment.
- Do **not** reintroduce image-only menus or a hardcoded hours date.
- Do **not** use the old Worcester address anywhere.
- Do **not** put personal data in URLs or auto-submit forms reached from untrusted content.
- Do **not** default to generic AI aesthetics (purple gradients, centered hero over dark mesh, three identical cards, Inter + slate-900).
- Do **not** ship default/unstyled component-library states.

---

## 12. Definition of done

A subtle, premium, mobile-first Next.js site where **catering is clearly the lead**, both CTAs convert, the palette is restrained (warm neutrals + one accent, espresso trust blocks), the menu is real text, hours and location are correct and current, the Breakfast Pizza shines without shouting, the `bencium-impact-ux-designer` skill is evident in the craft, and every box in §10 is checked.

When ambiguous on a **business fact**, ask me. When ambiguous on a **design/UX choice**, defer to `bencium-impact-ux-designer`.