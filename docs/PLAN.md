# Phase 1 Plan: MS-Personal (MS22 Motion Elevation)

## 1. Library Selection & Strategy
* **Strategy**: CSS Keyframe Choreography & Stagger Utilities + Intersection Observer scroll triggers.
* **Justification**: Maintains Next.js 16 SSG performance while delivering 60fps animations.

## 2. Targeted Interactions
* **Hero Entrance**: Staggered text & button entrance.
* **Project Grid**: Scroll-triggered staggered card reveal.
* **Timeline**: Sequential reveal of experience cards.
* **Micro-interactions**: Button click press scale (`active:scale-[0.98]`), link underline transition.
* **Accessibility**: Respect `prefers-reduced-motion: reduce`.
