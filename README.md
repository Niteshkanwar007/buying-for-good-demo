# Buying for Good Demo

A focused Next.js prototype for the Buying for Good storytelling experience.

## Current scope

The first iteration establishes the visual and motion foundation only:

- Opening hero with an Australian ocean-at-sunrise atmosphere
- Editorial serif + clean sans typography system
- Teal / navy / warm sand palette
- Responsive desktop and mobile layout
- SVG ripple foundation for the later impact sequence
- GSAP + ScrollTrigger animation architecture
- Reduced-motion support
- A minimal continuation section to validate the hero-to-story transition

The full website and subsequent storytelling chapters are intentionally not implemented yet.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger
- Inline SVG

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Structure

```
app/
  globals.css
  layout.tsx
  page.tsx

components/
  buying-for-good/
    BuyingForGoodHero.tsx
    ImpactRipple.tsx
```

The animation layer is deliberately isolated inside the hero component so subsequent storytelling sections can introduce their own timelines without creating a single monolithic animation controller.
