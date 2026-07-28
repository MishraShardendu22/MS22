# Motion Audit: MS-Personal (MS22 Portfolio)

## 1. Existing Motion Grep Analysis
* **Grep Hits**: 40 components reference standard Tailwind `transition-all duration-300` utility classes.
* **Missing Animations**: Page entrance choreography, scroll-triggered section reveals (`whileInView`), project grid stagger, experience timeline line draw-in, and GitHub/LeetCode stats number counter animations.

## 2. High-Value Targeted Additions
* **Library**: `framer-motion` / `motion` (Next.js App Router client wrappers).
* **Target Interactions**:
  1. Hero section staggered text & CTA entrance choreography.
  2. Project cards scroll-triggered stagger reveal (`whileInView` with 50ms stagger offset).
  3. Vertical timeline item sequence reveal.
  4. GitHub & LeetCode telemetry stats count-up animation on view.
  5. Interactive filter button active tab indicator transition (`layoutId`).
* **Accessibility**: Respect `prefers-reduced-motion: reduce`.
