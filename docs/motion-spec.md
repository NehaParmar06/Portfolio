# Motion spec — locked in step 0

The Figma file carries no prototype or Smart Animate data, so this scope was
proposed from the structure of the Desktop and Mobile frames and reviewed
against a live variant lab before being locked.

**Temperature:** balanced — clear hero sequence, scroll reveals with real
easing, considered hover states. Noticeable, never in the way.

**Case studies:** expand in place. No router, no separate case-study routes.

**Mobile (< 768px):** essentially no motion. Short opacity fades only — no
transforms, no parallax, no scrub. Enforced by one media query at the
foot of `src/assets/styles/motion.css`.

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
| M7  | Case-study card hover    | **Lift + chevron** — 4px lift, border warms, chevron nudges down              |
| M8  | Tag chips                | **Pop stagger**, 55ms apart                                                   |
| M9  | About portrait           | **Ring first, photo after** — ring draws, then the portrait fades up          |
| M10 | “Let's talk.” panel      | **Scale in**, content +250ms                                                  |
| M11 | Links & buttons          | **Underline sweep** — in from the left on hover, out to the right             |
| M12 | Scroll feedback          | **None** — no progress bar, no section dots                                   |
| M13 | Mobile menu              | **Fade + scale**, links stagger 60ms, focus trap + Esc to close               |
| M14 | First paint              | **No preloader** — the page paints immediately                                |

## Timing vocabulary

Defined once as custom properties at the top of
`src/assets/styles/motion.css`:

- durations — `--dur-fast 300ms` (hover) · `--dur-base 550ms` (reveal) ·
  `--dur-slow 750ms` (hero lines, portrait, contact panel)
- easings — `--ease-out: cubic-bezier(.22,1,.36,1)` for entrances,
  `--ease-in-out: cubic-bezier(.65,0,.35,1)` for draws
- staggers — `100ms` hero lines · `110ms` list items · `55ms` chips
- reveal threshold — 0.15 with an 8% bottom margin, fires once per session

## Implementation: CSS, not GSAP

Step 0 scoped this for GSAP + ScrollTrigger. On measuring, those are
**46KB gzipped** against a 33KB total JS payload — more than doubling the
JavaScript to animate things CSS animates on the compositor. Every effect
above is native CSS keyframes; the only JavaScript is `v-reveal`, one
shared IntersectionObserver that adds a class. Reintroducing GSAP later,
if a genuine timeline is needed, is one dependency and one import.

## Rules that override everything

1. Nothing is hidden at rest. Reveals animate **from** a visible state.
2. `prefers-reduced-motion: reduce` collapses every duration to ~0.
3. Below 768px, a single media query at the foot of `motion.css` swaps every
   animation for a 300ms opacity fade — no transforms, no blur, no masks.
4. M7's chevron points **down**, not diagonally — the card expands, it does
   not navigate.

## Deviations from the comp, and why

- **Text on terracotta is Coffee Bean, not Merino.** Merino on Terracotta
  is 2.42:1; the résumé label needs 4.5:1 and "Let's talk." needs 3:1.
  Coffee Bean is 6.38:1, and matches the Primary button swatch in the
  Style Guide frame.
- **Tag fill is Terracotta 10%, not 14%**, which lifts terracotta tag text
  from 4.42:1 to 4.75:1. Visually indistinguishable.
- **The About portrait ring is terracotta**, where the comp draws a
  Merino-12% hairline. M9 exists to be seen; a 12% ring drawing itself is
  not.
- **Year labels use Figtree with tabular numerals**, where the comp
  specifies Inter. A third family for three date labels costs ~20KB.

## Content decisions taken alongside

- The contact panel shows the **email address as text** — it is the
  invitation, so it should be readable and copyable. LinkedIn, GitHub and
  Figma render as **icons only**; their URLs are never printed.
- The address is still assembled at runtime rather than sitting in the
  markup as a literal `mailto:`. That stops scrapers which parse HTML
  without running it, and nothing more — anything that hid the address
  from a real browser would hide it from a screen reader too.
- The Résumé item is a **PDF download**, served from `/public`.
