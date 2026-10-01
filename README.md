# Buying for Good Demo

A focused Next.js prototype for the Buying for Good storytelling experience.

## Current scope

The demo now covers the complete storytelling arc from discovery through audience selection and the final conversion interaction:

- Opening hero with an Australian ocean-at-sunrise atmosphere
- Curiosity → Understanding
- What If → The Big Idea
- Welcome to Buying for Good → How It Works
- Why This Matters → Trust
- Who Is This For? → Business / Charity / Supporter audience experience
- Compact jigsaw-style invitation into the final conversion
- Shared expression-of-interest form with audience-aware fields
- Client-side validation, accessible errors and duplicate-submit protection at the UI level
- Explicit local-only confirmation state for the demo
- Separate contact pathway
- Footer navigation with clearly marked Privacy and Website Terms placeholders
- Basic page metadata
- Responsive desktop/mobile layouts
- SVG ripple language and isolated GSAP + ScrollTrigger animation ownership
- Reduced-motion support

## Content and integration boundaries

This repository is a prototype, not a connected production registration system.

The expression-of-interest form currently has **no submission API, email service, CRM connection or database**. Its confirmation state is deliberately local and explicitly tells the visitor that no enquiry has been delivered.

Production integration should replace the local submission branch in `components/buying-for-good/InterestForm.tsx` with the approved backend/email/CRM service and define the final data handling, privacy, consent, validation and notification behaviour.

Production-specific content that was not supplied in the brief remains marked as a placeholder. This includes founder details, exact audience benefits, registration process details, contact details, legal content and legal URLs.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger
- Inline SVG

## Run locally

npm install
npm run dev

Then open http://localhost:3000.

## Quality checks

npm run typecheck
npm run lint
npm run build

The repository also contains a GitHub Actions workflow for these checks.