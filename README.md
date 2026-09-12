# nehaparmar.dev — portfolio

Personal portfolio for Neha Parmar, built from the Figma comp
`Portfolio.fig` (Desktop / Mobile / Style Guide frames).

**Stack:** Vue 3 (`<script setup>`, Composition API) · TypeScript · Vite ·
Tailwind CSS v4 · deployed on Vercel.

**Measured on the production build** (Lighthouse, desktop):

| Performance | Accessibility | Best practices | SEO |
| ----------- | ------------- | -------------- | --- |
| 100         | 100           | 100            | 100 |

FCP 1.0s · LCP 1.5s · TBT 10ms · **CLS 0** · 33KB of JS, 0 blocking
requests, 0 third-party origins.

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
├── assets/
│   ├── images/          portrait, exported at 1x/2x in jpg + webp
│   └── styles/
│       ├── main.css     Tailwind entry + @theme design tokens from Figma
│       ├── fonts.css    @font-face for the two self-hosted faces
│       └── motion.css   the entire motion spec, in CSS
├── components/
│   ├── layout/          SiteHeader, SiteFooter
│   ├── sections/        one component per band of the page
│   └── ui/              TagChip, SkillChip, CaseStudyCard, SocialIconLink
├── data/                all page copy, typed — no strings inside components
│   ├── about.ts
│   ├── case-studies.ts
│   ├── contact.ts
│   ├── experience.ts
│   └── profile.ts
├── directives/
│   └── reveal.ts        v-reveal — one shared IntersectionObserver
├── types/
│   └── content.ts       the shape of everything in data/
├── App.vue
└── main.ts
```

### Why this shape

- **Content is data, not markup.** Every visible string lives in `src/data`
  and is typed by `src/types/content.ts`. Changing a case study never means
  opening a component.
- **Motion is CSS.** The whole spec — curtain lift, odometer roll, spine
  draw, staggered reveals, hover states, the mobile sheet — is keyframes in
  `motion.css`. The only JavaScript involved is one shared
  IntersectionObserver that adds a class. See the note on GSAP below.
- **Nothing is hidden at rest.** Reveals animate *from* a hidden state on
  the way in; no element is parked at `opacity: 0` waiting on an observer.
  If JavaScript fails, is slow, or is switched off, the page is whole.
- **The motion budget is a media query, not a runtime check.** Below 768px
  transforms are dropped and only opacity survives; under
  `prefers-reduced-motion` everything lands in 1ms. Both are enforced once,
  at the bottom of `motion.css`, so there is nothing to keep in sync.
- **No third-party origins.** Fonts are self-hosted, icons are inlined SVG
  from `lucide-vue-next`. Nothing about a visitor reaches anyone else, and
  step 4 can ship a genuinely strict CSP.

---

## Design tokens

Tokens in `src/assets/styles/main.css` map to the Figma variables, with the
Figma name in a comment beside each.

| Token              | Figma       | Value     |
| ------------------ | ----------- | --------- |
| `--color-ground`   | Coffee Bean | `#2B1810` |
| `--color-panel`    | Tamarind    | `#3A2117` |
| `--color-accent`   | Terracotta  | `#E08A4F` |
| `--color-ink`      | Merino      | `#F9F4ED` |
| `--color-body`     | Sisal       | `#DCD3C4` |
| `--color-body-dim` | Bison Hide  | `#C0B6A5` |
| `--color-muted`    | Zorba       | `#A19786` |
| `--font-display`   | Caprasimo   | —         |
| `--font-sans`      | Figtree     | —         |

Two values deliberately differ from the comp, both to clear WCAG AA. Both
are documented inline where they are defined:

- `--color-on-accent` is Coffee Bean, not Merino. Merino on Terracotta is
  **2.42:1**; the résumé button label needs 4.5:1 and “Let's talk.” needs
  3:1. Coffee Bean is **6.38:1** — and is what the Style Guide frame
  already shows on its own *Primary button* swatch.
- `--color-accent-wash` is Terracotta at 10%, not 14%. At 14% the tag fill
  lifts enough to drop terracotta tag text to **4.42:1**; at 10% the same
  text reads **4.75:1** and the fill is visually indistinguishable.

Everything else in the palette passes comfortably — Sisal on Coffee Bean is
11.41:1, Bison Hide on Tamarind 7.43:1, Zorba on Tamarind 5.17:1.

---

## Accessibility

- Rendered-DOM contrast audit: **0 failures of 30** measured pairs,
  computed against the true composited background rather than the declared
  colour (the tag chips sit on a translucent fill over a panel).
- axe-core: **0 violations** on desktop and mobile, including the expanded
  case-study state and the open mobile menu.
- The case studies are a disclosure pattern following the ARIA APG
  accordion: the `h3` wraps the button, so all five stay in the document
  outline. The chevron points **down**, because the card expands rather
  than navigating.
- Focus ring is two-tone — an inner Coffee Bean ring and an outer Merino
  ring — because no single colour clears 3:1 against both the espresso
  ground and the terracotta panel.
- Mobile menu traps Tab, closes on Escape, and returns focus to its
  trigger.
- Icon-only profile links (LinkedIn, GitHub, Figma) are 44×44, clearing
  WCAG 2.5.8 target size. The email is set as text, with an `aria-label`
  that reads "Email Neha at …" so its purpose is clear out of context.

---

## Performance notes

- **No GSAP.** The motion spec was originally scoped for GSAP +
  ScrollTrigger; those are **46KB gzipped**, against a total JS payload of
  33KB. Every effect in the spec — masked line rises, blur-to-focus,
  odometer roll, spine draw, staggered fades, the mobile sheet — is native
  CSS, and the scroll trigger is one shared IntersectionObserver. Adding
  GSAP would have more than doubled the JavaScript to animate things CSS
  animates on the compositor. If a future effect genuinely needs a
  timeline, reintroducing it is one dependency and one import.
- **The stylesheet is inlined.** At ~6KB it is smaller than the overhead of
  fetching it, and it blocks the first paint; a build plugin inlines it
  into `index.html` and drops the `<link>`, removing a render-blocking
  round trip (Lighthouse measured ~156ms). JS, fonts and images stay hashed
  and immutably cacheable.
- **Fonts are latin-subset woff2 only, preloaded.** The `@fontsource`
  packages ship latin + latin-ext in woff2 *and* woff; every glyph this
  site renders (including é, –, ' and ©) is in latin. `font-display: swap`
  keeps text painting immediately.
- **CLS is 0.** The portrait carries intrinsic `width`/`height`, and every
  reveal animates opacity and transform only — never layout.
- `robots.txt`, `sitemap.xml`, the canonical link and the Open Graph tags
  are all generated from one `SITE_URL` constant in `vite.config.ts`, so
  they cannot drift apart.

### Updating the fonts

The woff2 files in `public/fonts` come from the `@fontsource` packages.
They are vendored rather than imported so they can have stable, preloadable
URLs. To refresh:

```bash
npm i -D @fontsource/caprasimo @fontsource-variable/figtree
cp node_modules/@fontsource/caprasimo/files/caprasimo-latin-400-normal.woff2 public/fonts/
cp node_modules/@fontsource-variable/figtree/files/figtree-latin-wght-normal.woff2 public/fonts/
npm un @fontsource/caprasimo @fontsource-variable/figtree
```

Both faces are SIL Open Font License; the licences ship in `public/fonts`.

---

## Build steps

| Step | Scope                         | Status      |
| ---- | ----------------------------- | ----------- |
| 0    | Animation scope + mock        | done        |
| 1    | Project structure             | done        |
| 2    | Views                         | done        |
| 3    | Styling and animations        | this commit |
| 4    | Security hardening for Vercel | next        |

The agreed motion spec lives in [`docs/motion-spec.md`](docs/motion-spec.md).

---

## Still needed

- `public/og-image.png` — 1200×630 social preview card.
- `public/apple-touch-icon.png` — 180×180.
- The real domain, if it is not `nehaparmar.vercel.app` — set `SITE_URL` in
  `vite.config.ts` (or the `VITE_SITE_URL` environment variable in Vercel).
