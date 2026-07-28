# Phase 1 Plan: MS-Personal (MS22 Portfolio)

## 1. Design Intent
Refine and solidify the personal engineering portfolio UI to express the canonical dark-mode design system. The aesthetic must feel like a senior staff engineer's personal laboratory: dark editorial palette (`#09090b` void base), subtle indigo accents (`#6366f1`), monospace tech stack pills, project cards with hover elevation, accessible focus rings, and responsive layouts.

## 2. Primitives & Token System
* **Colors**:
  * Base: `#09090b` (Deep background)
  * Raised Surface: `#121318` (Card backgrounds)
  * Overlay: `#1c1d24` (Hover surfaces, dropdowns)
  * Borders: `#27272a` (Default borders), `#6366f1` (Focus rings)
  * Text: `#f4f4f5` (Primary headings), `#a1a1aa` (Secondary descriptions), `#71717a` (Muted dates/metadata)
* **Typography**: Inter font scale + Monospace font token for code snippets, commit SHAs, and repo stars/forks counters.

## 3. Concrete Component Enhancements
* **Hero Banner**: High-impact introduction header with role badge, resume CTA button, and social links.
* **Project Showcase Cards**: Refactor project cards to use unified semantic tokens, tech stack tags, live demo buttons, and GitHub repository links.
* **Experience & Certifications Timeline**: Clean vertical timeline rhythm with semantic status indicators.
* **Interactive Navigation**: Header navigation bar with active section indicator, aria-current page tracking, and mobile drawer.

## 4. Accessibility & SEO Gaps
* Maintain 100% Vitest test pass rate on SEO, sitemap, canonical URLs, and structured data.
* Ensure all interactive cards and filter buttons are accessible via keyboard (`Enter` / `Space`).

## 5. Verification Plan
* `pnpm validate`: Typecheck, lint, test, and build all pass cleanly.
