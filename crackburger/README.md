# Crack Burger — Website Redesign Spec

**Client:** Crack Burger Toronto (147 Baldwin St, Toronto, ON M5T 1L9)
**Current site:** crackburger.ca
**Prepared as:** Pitch demo / developer handoff document

-----

## 1. Project Summary

Rebuild the Crack Burger website as a modern, mobile-first, visually distinctive site. The current site is a flat, ungrouped single-page ordering list with a static hero image and no real page structure. This spec covers a full rebuild: hero, brand storytelling, ordering experience, and every supporting page.

**Non-negotiable:** The existing backstory copy (the “It all began on one of those rare summer afternoons…” narrative) must be preserved word-for-word. Presentation changes; content does not.

-----

## 2. Brand & Visual Direction

- **Palette:** charcoal/black base, toasted bun orange-yellow as primary accent, hot red for CTAs (matches existing logo/brand red — keep it)
- **Typography:** bold condensed display face for headlines (stamped/grungy feel), clean sans-serif for body copy
- **Tone:** rebellious, indulgent, backyard-BBQ nostalgia — not polished fast-food, not fine dining
- **Logo:** existing “Crack Burger — Est. 2024 — Smashingly Addictive” badge logo carries over as-is

-----

## 3. Site Structure (Pages)

Move from a single scrolling page to a proper multi-page structure:

1. **Home** — hero, condensed menu teaser, backstory excerpt/link, reviews, location preview
1. **Menu / Order** — full ordering experience (see Section 5)
1. **Catering** — dedicated page with its own scheduling flow, currently just a bare date picker
1. **Swag** — shirts/hats as a small proper shop grid, currently buried as a menu category
1. **Gift Cards** — standalone simple page
1. **Info** — hours, map, address, contact, all consolidated (currently scattered/buried at page bottom)

-----

## 4. Hero Section

Current hero is a static photo with buttons overlaid — flat, no motion, no personality.

**New hero:**

- 3D animated burger build sequence on load: bun drops, patty lands with a “smash” motion effect, cheese melts over, bacon/toppings land in sequence, subtle idle rotation loop afterward
- Bold headline treatment using the brand’s own tagline (“Smashingly Addictive”)
- Primary CTAs: Order Now / Catering / Gift Cards, styled as high-contrast tap targets
- Sticky “Order Now” bar that persists on scroll, especially on mobile
- Subtle parallax as the user scrolls past the hero into the backstory section

**Fallback:** on low-performance devices, degrade to a lighter/lower-poly render or a static hero image — detect via performance capability, not just screen size, so it isn’t purely a “mobile = no animation” cutoff.

-----

## 5. Menu / Ordering Page (Priority Fix)

This is the current site’s weakest section: one long flat list, no visual hierarchy, dips and drinks presented at the same weight as signature burgers, and near-duplicate Single/Double listings doubling the visual clutter.

**Rebuild requirements:**

- **Sticky category navigation** (Smash Burgers / Combos / Sides / Dips / Desserts / Shakes / Drinks / Swag) that stays accessible while scrolling instead of one continuous list
- **Card-based item display** with image, name, price, and short description on tap/expand — not always-on paragraph text for every item
- **Combos shown as bundles** (“Burger + Side + Drink,” with savings called out) rather than duplicated as a second full listing of every burger
- **Single/Double as a toggle within one card**, not two separate near-identical entries — cuts ~10 burger listings down to ~5 real decisions
- **Slide-up cart drawer** with running total, so users don’t lose their place navigating to a separate cart page
- Dips, drinks, and desserts kept visually secondary to the core burger/combo offerings

-----

## 6. Catering Page

Currently just a pickup/delivery date selector with no content. Needs:

- Overview of what catering includes (packages, minimum order info if applicable)
- Clear separate scheduling flow from the regular order flow
- Contact/inquiry option for custom orders

-----

## 7. Swag & Gift Cards Pages

- **Swag:** simple shop grid for the Crack Burger Shirt ($30) and Hat ($25), each with a product image and add-to-cart
- **Gift Cards:** standalone page, clear denominations/purchase flow

-----

## 8. Info / Location Page

Consolidate what’s currently scattered at the bottom of the homepage:

- Hours (Mon 11–9, Tue closed, Wed–Sun 11–9)
- Address: 147 Baldwin St, Toronto, ON M5T 1L9
- Contact: [info@crackburger.ca](mailto:info@crackburger.ca) / (416) 593-5994
- Embedded map
- Live open/closed status badge

-----

## 9. Reviews

Present existing Google reviews (Ally Marino, Kyle, Rouben Tchakhmakhtchian) as a tappable card carousel with star ratings, rather than raw quoted text blocks.

-----

## 10. Mobile Requirements

- Mobile-first build, not a desktop site scaled down
- Large thumb-friendly tap targets throughout
- Bottom-sheet style cart and menu navigation on mobile rather than desktop-style dropdowns
- Sticky bottom order bar on mobile in place of top navigation clutter
- 3D hero must not block or slow initial mobile page load — lazy-load/defer as needed

-----

## 11. Notes for the Developer

- This is being built first as an interactive demo to pitch to the business owner before any contract is signed
- All existing menu items, prices, and backstory copy from crackburger.ca should be treated as the source of truth for content — only presentation/UX is being redesigned in this phase
- Suggested stack for the demo: React + Tailwind for layout, Three.js (or equivalent) for the hero animation, with a component structure that maps cleanly to the page list in Section 3 for handoff into a production build later

This project was built with [Lovable](https://lovable.dev) and later finished and adapted for Vercel deployment.

## Development

Requires Node.js and npm.

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Deployment

This project deploys to Vercel out of the box — `vite.config.ts` targets the `vercel` Nitro preset. Push to `main` (or connect the repo in the Vercel dashboard) and Vercel will build and deploy automatically.

