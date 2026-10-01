# Buying for Good Demo

A focused Next.js prototype for the Buying for Good storytelling experience.

## Current scope

- Opening hero and curiosity → understanding
- What If → The Big Idea → stakeholder system
- Welcome to Buying for Good → How It Works → charity impact
- Why This Matters → Trust
- Who Is This For? → Business / Charity / Supporter
- Jigsaw invitation → expression of interest → confirmation
- Separate contact pathway and footer
- Responsive desktop/mobile layouts, SVG ripple language, GSAP + ScrollTrigger, and reduced-motion support

## Content and integration boundaries

This repository is a prototype, not a connected production registration system.

The expression-of-interest form currently has no submission API, email service, CRM connection or database. Its confirmation state is deliberately local and explicitly tells the visitor that no enquiry has been delivered.

Production integration should replace the local submission branch in `components/buying-for-good/InterestForm.tsx` with the approved backend/email/CRM service and define the final data handling, privacy, consent, validation and notification behaviour.

Production-specific content that was not supplied in the brief remains marked as a placeholder. This includes founder details, exact audience benefits, registration process details, contact details, legal content and legal URLs.

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

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

The repository also contains a GitHub Actions workflow for these checks.
