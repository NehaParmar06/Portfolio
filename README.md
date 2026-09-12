# nehaparmar.dev — portfolio

Personal portfolio for Neha Parmar, built from the Figma comp
`Portfolio.fig` (Desktop / Mobile / Style Guide frames).

**Stack:** Vue 3 (`<script setup>`, Composition API) · TypeScript · Vite ·
Tailwind CSS v4 · deployed on Vercel.

[![CI](https://github.com/NehaParmar06/Portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/NehaParmar06/Portfolio/actions/workflows/ci.yml)

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
npm run dev          # http://localhost:5173
npm run build        # type-check + production build into dist/
npm run preview      # serve the production build locally

npm run lint         # eslint, including vuejs-accessibility rules
npm run format       # prettier
npm run type-check   # vue-tsc
npm run audit:a11y   # serve dist/ with the real headers, then audit it
npm run verify       # everything above, in the order CI runs it

npm run csp:sync     # rewrite the CSP style hash in vercel.json — see below
```

Node 20.19+ (see `.nvmrc`).

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
- **Nothing is hidden at rest.** Reveals animate _from_ a hidden state on
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
  already shows on its own _Primary button_ swatch.
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
  packages ship latin + latin-ext in woff2 _and_ woff; every glyph this
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

## Security

Everything is served from one origin, which is what makes the policy below
possible at all: no font CDN, no analytics, no icon service.

### Content-Security-Policy

```
default-src 'none';           script-src 'self';
style-src 'self' 'sha256-…';  img-src 'self';
font-src 'self';              connect-src 'none';
base-uri 'none';              form-action 'none';
frame-ancestors 'none';       object-src 'none';
upgrade-insecure-requests
```

No `'unsafe-inline'` and no `'unsafe-eval'`, anywhere:

- **Scripts** are one same-origin module. The Vue _runtime-only_ build ships,
  so there is no runtime template compilation and therefore no need for
  `'unsafe-eval'`.
- **Styles** are inlined into `index.html` for the first paint, so they are
  allowed by their own **sha256 hash** rather than by `'unsafe-inline'`.
  Vue's `:style` bindings write through the CSSOM, which CSP does not
  govern, so no `style-src-attr` exemption is needed either.

#### The hash cannot go stale

A stale hash would mean a deployed site with **no styles at all**, so the
check lives inside the build. `vite.config.ts` recomputes the hash on every
build and compares it with `vercel.json`; a mismatch **fails the build**.
Vercel runs `npm run build`, so a forgotten sync fails the deploy loudly
instead of shipping a broken page.

When the CSS changes:

```bash
npm run csp:sync   # rebuilds and rewrites the hash in vercel.json
git add vercel.json
```

### Other headers

| Header                         | Value                                           |
| ------------------------------ | ----------------------------------------------- |
| `Strict-Transport-Security`    | `max-age=63072000; includeSubDomains; preload`  |
| `X-Content-Type-Options`       | `nosniff`                                       |
| `X-Frame-Options`              | `DENY` (belt and braces with `frame-ancestors`) |
| `Referrer-Policy`              | `strict-origin-when-cross-origin`               |
| `Cross-Origin-Opener-Policy`   | `same-origin`                                   |
| `Cross-Origin-Resource-Policy` | `same-origin`                                   |
| `X-DNS-Prefetch-Control`       | `off`                                           |
| `Permissions-Policy`           | every powerful feature denied                   |

`Cross-Origin-Embedder-Policy` is deliberately **not** set. It would buy
cross-origin isolation this site has no use for, and it is the header most
likely to silently break a future embed.

### Caching

`index.html` is `max-age=0, must-revalidate` — it carries the inlined CSS,
so it must never be served stale. Hashed assets are `immutable` for a year.
`/fonts/*` is immutable too, which means **replacing a font requires
renaming the file**; the filenames are stable by design so they can be
preloaded.

---

## Quality gates

`npm run audit:a11y` (and CI, on every push) serves `dist/` with the exact
headers from `vercel.json` and fails on any of:

- a **CSP violation** or a console error — the policy is tested as served,
  not as written
- an **axe-core** violation
- a **contrast failure**, measured against the _composited_ background
  rather than the declared colour
- **horizontal overflow**

…at 320, 390, 768, 1024 and 1440px. Current run: 0 CSP violations, 0 axe
violations, 0 of 30 contrast pairs failing, no overflow, at every width.

The CI workflow additionally runs lint, formatting, type-check, the build
(which enforces the CSP hash) and `npm audit --audit-level=high`, and
re-runs weekly so dependency rot surfaces without anyone touching the code.

---

## Build steps

| Step | Scope                         | Status      |
| ---- | ----------------------------- | ----------- |
| 0    | Animation scope + mock        | done        |
| 1    | Project structure             | done        |
| 2    | Views                         | done        |
| 3    | Styling and animations        | done        |
| 4    | Security hardening for Vercel | this commit |

The agreed motion spec lives in [`docs/motion-spec.md`](docs/motion-spec.md).

---

## Still needed

- The real domain, if it is not `nehaparmar.vercel.app` — set `SITE_URL` in
  `vite.config.ts` (or the `VITE_SITE_URL` environment variable in Vercel).
  The canonical link, Open Graph tags, `robots.txt` and `sitemap.xml` all
  follow it.

### Regenerating the social card

`public/og-image.png` (1200×630) and `public/apple-touch-icon.png` (180×180)
are rendered from the site's own tokens and typefaces rather than drawn by
hand, so they cannot drift from the design. The source templates live in
`docs/social/`.
