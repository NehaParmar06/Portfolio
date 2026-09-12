# nehaparmar.dev — portfolio

Personal portfolio for Neha Parmar, built from the Figma comp
`Portfolio.fig` (Desktop / Mobile / Style Guide frames).

**Stack:** Vue 3 (`<script setup>`, Composition API) · TypeScript · Vite ·
Tailwind CSS v4 · GSAP + ScrollTrigger · deployed on Vercel.

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build locally
```

Node 20.19+ or 22.12+.

---

## Project structure

```
src/
├── animations/          GSAP setup + the site's shared timing vocabulary
│   └── motion.ts          durations, easings, staggers — one source of truth
├── assets/
│   ├── images/          portrait, exported at 1x/2x in jpg + webp
│   └── styles/
│       └── main.css     Tailwind entry + @theme design tokens from Figma
├── components/
│   ├── layout/          SiteHeader, SiteFooter
│   ├── sections/        one component per band of the page
│   └── ui/              TagChip, CaseStudyCard, SocialIconLink, ResumeButton
├── composables/
│   ├── useMediaQuery.ts     reactive matchMedia
│   ├── useMotionLevel.ts    full / minimal / none — the motion policy
│   └── useReveal.ts         IntersectionObserver scroll reveal
├── data/                all page copy, typed — no strings inside components
│   ├── about.ts
│   ├── case-studies.ts
│   ├── contact.ts
│   ├── experience.ts
│   └── profile.ts
├── types/
│   └── content.ts       the shape of everything in data/
├── App.vue
└── main.ts
```

### Why this shape

- **Content is data, not markup.** Every visible string lives in `src/data`
  and is typed by `src/types/content.ts`. Changing a case study never means
  opening a component.
- **Motion has one policy.** `useMotionLevel()` resolves to `full`,
  `minimal` (below 768px) or `none` (`prefers-reduced-motion`). Animations
  ask it before they do anything, so the motion budget is changed in one
  place rather than audited across twenty components.
- **Nothing is hidden at rest.** Reveals animate *from* a visible state. If
  JavaScript fails, is slow, or is switched off, the page is still whole.
- **No third-party runtime requests.** Fonts are self-hosted via
  `@fontsource`, icons come from `lucide-vue-next` as inlined SVG. That lets
  step 4 ship a genuinely strict Content-Security-Policy.

---

## Design tokens

Tokens in `src/assets/styles/main.css` map 1:1 to the Figma variables, with
the Figma name in a comment beside each one.

| Token                     | Figma        | Value     |
| ------------------------- | ------------ | --------- |
| `--color-ground`          | Coffee Bean  | `#2B1810` |
| `--color-panel`           | Tamarind     | `#3A2117` |
| `--color-accent`          | Terracotta   | `#E08A4F` |
| `--color-ink`             | Merino       | `#F9F4ED` |
| `--color-body`            | Sisal        | `#DCD3C4` |
| `--color-body-dim`        | Bison Hide   | `#C0B6A5` |
| `--color-muted`           | Zorba        | `#A19786` |
| `--color-hairline`        | Merino 12%   | —         |
| `--font-display`          | Caprasimo    | —         |
| `--font-sans`             | Figtree      | —         |

---

## Build steps

| Step | Scope                             | Status         |
| ---- | --------------------------------- | -------------- |
| 0    | Animation scope + mock            | done           |
| 1    | Project structure                 | this commit    |
| 2    | Views                             | next           |
| 3    | Styling and animations            | —              |
| 4    | Security hardening for Vercel     | —              |

The agreed motion spec lives in [`docs/motion-spec.md`](docs/motion-spec.md).

---

## Still needed

- `public/neha-parmar-resume.pdf` — the résumé the header button downloads.
- `public/og-image.png` — 1200×630 social preview card.
- `public/apple-touch-icon.png` — 180×180.
