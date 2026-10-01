# nehaparmar.dev — portfolio

Personal portfolio for Neha Parmar, built from the Figma comp `Portfolio.fig`.

**Stack:** Vue 3 (`<script setup>`) · TypeScript · Vite · Tailwind CSS v4 · Vercel.

[![CI](https://github.com/NehaParmar06/Portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/NehaParmar06/Portfolio/actions/workflows/ci.yml)

Lighthouse (desktop, production build): **100 / 100 / 100 / 100**. FCP 1.0s ·
LCP 1.5s · TBT 10ms · CLS 0 · 33KB JS · 0 third-party origins.

## Getting started

Node 20.19+ (see `.nvmrc`).

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # type-check + production build into dist/
npm run preview      # serve the production build locally
npm run lint         # eslint, including vuejs-accessibility rules
npm run format       # prettier
npm run type-check   # vue-tsc
npm run audit:a11y   # serve dist/ with the real headers, then audit it
npm run verify       # everything above, in CI order
npm run csp:sync     # rewrite the CSP style hash in vercel.json
```

## Structure

```
src/
├── assets/
│   ├── images/      portrait, 1x/2x in jpg + webp
│   └── styles/      main.css (Tailwind + tokens), fonts.css, motion.css
├── components/      layout/, sections/, ui/
├── data/            all page copy, typed
├── directives/      reveal.ts (v-reveal, one shared IntersectionObserver)
├── types/content.ts shape of everything in data/
├── App.vue
└── main.ts
```

Design choices:

- **Content is data.** Every visible string lives in `src/data`, typed by
  `src/types/content.ts`; components hold no copy.
- **Motion is CSS.** The whole spec ([`docs/motion-spec.md`](docs/motion-spec.md))
  is keyframes in `motion.css`. JS only adds a class via one observer. Below
  768px only opacity animates; `prefers-reduced-motion` collapses everything
  to 1ms.
- **Nothing is hidden at rest.** Reveals animate _from_ hidden on the way in,
  so the page is whole if JS fails.
- **No third-party origins.** Fonts are self-hosted and icons are inlined SVG
  (`lucide-vue-next`), which allows a strict CSP.

## Design tokens

Defined in `src/assets/styles/main.css`, named after the Figma variables.

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

Two values differ from the comp to meet WCAG AA (documented inline):

- `--color-on-accent` is Coffee Bean, not Merino: 6.38:1 on Terracotta
  versus 2.42:1.
- `--color-accent-wash` is Terracotta at 10%, not 14%, keeping tag text at
  4.75:1 instead of 4.42:1.

## Accessibility

- 0 axe violations (desktop and mobile, including expanded and menu states);
  0 of 30 contrast pairs failing, measured against the composited background.
- Case studies follow the ARIA APG accordion pattern (`h3` wraps the button).
- Two-tone focus ring (Coffee Bean inside, Merino outside) so it clears 3:1
  on both the ground and the terracotta panel.
- Mobile menu traps Tab, closes on Escape and restores focus.
- Icon-only links are 44×44; the email link has a descriptive `aria-label`.

## Performance

- **No GSAP** (46KB gzipped vs. a 33KB total JS payload); CSS plus one
  observer covers every effect.
- **Stylesheet is inlined** (~6KB) by a build plugin, removing a
  render-blocking request. JS, fonts and images stay hashed and cacheable.
- **Fonts** are latin-subset woff2, preloaded, with `font-display: swap`.
- **CLS 0**: the portrait has intrinsic dimensions; reveals use only opacity
  and transform.
- `robots.txt`, `sitemap.xml`, canonical and Open Graph tags all derive from
  one `SITE_URL` in `vite.config.ts`.

### Updating fonts

The woff2 files in `public/fonts` are vendored from `@fontsource` for stable,
preloadable URLs (SIL OFL; licences included). To refresh:

```bash
npm i -D @fontsource/caprasimo @fontsource-variable/figtree
cp node_modules/@fontsource/caprasimo/files/caprasimo-latin-400-normal.woff2 public/fonts/
cp node_modules/@fontsource-variable/figtree/files/figtree-latin-wght-normal.woff2 public/fonts/
npm un @fontsource/caprasimo @fontsource-variable/figtree
```

Fonts are cached as immutable, so a replaced font must also be renamed.

## Security

Everything is served from one origin, with no `'unsafe-inline'` or
`'unsafe-eval'`:

```
default-src 'none';           script-src 'self';
style-src 'self' 'sha256-…';  img-src 'self';
font-src 'self';              connect-src 'none';
base-uri 'none';              form-action 'none';
frame-ancestors 'none';       object-src 'none';
upgrade-insecure-requests
```

- **Scripts:** one same-origin module; Vue's runtime-only build needs no eval.
- **Styles:** inlined CSS is allowed by its sha256 hash. `vite.config.ts`
  recomputes the hash each build and **fails the build** if it differs from
  `vercel.json`, so a stale hash can't ship an unstyled site. After CSS
  changes, run `npm run csp:sync` and commit `vercel.json`.

Other headers: HSTS (2 years, preload), `nosniff`, `X-Frame-Options: DENY`,
`Referrer-Policy: strict-origin-when-cross-origin`, COOP and CORP
`same-origin`, DNS prefetch off, and a `Permissions-Policy` denying every
powerful feature. COEP is deliberately unset: it adds isolation this site
doesn't need and can break future embeds.

Caching: `index.html` is `max-age=0, must-revalidate` (it carries the inlined
CSS); hashed assets and `/fonts/*` are immutable for a year.

## Quality gates

`npm run audit:a11y` and CI serve `dist/` with the exact `vercel.json`
headers and fail on any CSP violation or console error, axe violation,
contrast failure, or horizontal overflow at 320, 390, 768, 1024 and 1440px.

CI also runs lint, formatting, type-check, the build (which enforces the CSP
hash) and `npm audit --audit-level=high`, and re-runs weekly.
