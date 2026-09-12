# Motion spec — locked in step 0

The Figma file carries no prototype or Smart Animate data, so this scope was
proposed from the structure of the Desktop and Mobile frames and reviewed
against a live variant lab before being locked.

**Temperature:** balanced — clear hero sequence, scroll reveals with real
easing, considered hover states. Noticeable, never in the way.

**Case studies:** expand in place. No router, no separate case-study routes.

**Mobile (< 768px):** essentially no motion. Short opacity fades only — no
transforms, no parallax, no scrub. Enforced centrally by `useMotionLevel()`.

**Not building:** count-up counters, scroll-progress indicator, smooth-scroll
library (Lenis), custom cursor / magnetic buttons, preloader.

---

## Per-moment decisions

| ID  | Moment                   | Decision                                                                     |
| --- | ------------------------ | ---------------------------------------------------------------------------- |
| M1  | Hero entrance            | **Curtain lift** — each line rises out from behind a mask, 100ms apart        |
| M2  | The word “clarity.”      | **Blur to focus** — resolves from blur, 200ms after its line lands            |
| M3  | Sticky header            | **Always solid**, and always visible — never hides on scroll                  |
| M4  | Stat band                | **Odometer roll** — each figure rolls up into place; no counting from zero    |
| M5  | Work experience          | **Spine draws, rows follow** — terracotta rule scales down, then rows stagger |
| M6  | Case-study cards reveal  | **Stagger fade-up**, 110ms apart, starting at `top 85%`                       |
| M7  | Case-study card hover    | **Lift + arrow** — 4px lift, border warms, chevron slides in                  |
| M8  | Tag chips                | **Pop stagger**, 55ms apart                                                   |
| M9  | About portrait           | **Ring first, photo after** — ring draws, then the portrait fades up          |
| M10 | “Let's talk.” panel      | **Scale in**, content +250ms                                                  |
| M11 | Links & buttons          | **Underline sweep** — in from the left on hover, out to the right             |
| M12 | Scroll feedback          | **None** — no progress bar, no section dots                                   |
| M13 | Mobile menu              | **Fade + scale**, links stagger 60ms, focus trap + Esc to close               |
| M14 | First paint              | **No preloader** — the page paints immediately                                |

## Timing vocabulary

Defined once in `src/animations/motion.ts`:

- durations — `fast 0.3s` (hover) · `base 0.55s` (reveal) · `slow 0.75s`
  (hero, portrait, contact) · `expand 0.45s` (case study open/close)
- easings — `expo.out` for entrances, `power3.inOut` for draws and wipes
- staggers — `0.1s` hero lines · `0.11s` list items · `0.055s` chips
- ScrollTrigger start — `top 85%`, fires once per session

## Rules that override everything

1. Nothing is hidden at rest. Reveals animate **from** a visible state.
2. `prefers-reduced-motion: reduce` collapses every duration to ~0.
3. Below 768px, `useMotionLevel()` returns `minimal` and transforms are skipped.
4. M7's chevron points **down**, not diagonally — the card expands, it does
   not navigate.

## Content decisions taken alongside

- Contact links render as **icons only** (mail, LinkedIn, GitHub). The URLs
  and the email address are never printed as text.
- The Résumé item is a **PDF download**, served from `/public`.
