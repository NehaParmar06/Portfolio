# Social card sources

`og-image.html` and `apple-touch-icon.html` render the two images in
`public/`. They use the same tokens and the same two typefaces as the site,
so the card cannot drift from the design.

To regenerate, from the repo root:

```bash
cp public/fonts/caprasimo-latin-400-normal.woff2 docs/social/caprasimo.woff2
cp public/fonts/figtree-latin-wght-normal.woff2  docs/social/figtree.woff2

node -e "
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  for (const [file, w, h, out] of [
    ['og-image', 1200, 630, 'og-image.png'],
    ['apple-touch-icon', 180, 180, 'apple-touch-icon.png'],
  ]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.goto('file://' + process.cwd() + '/docs/social/' + file + '.html', { waitUntil: 'networkidle' });
    await p.waitForTimeout(400);
    await p.screenshot({ path: 'public/' + out });
  }
  await b.close();
})();
"

rm docs/social/caprasimo.woff2 docs/social/figtree.woff2
```

The two `.woff2` copies are gitignored — the templates load them by relative
path because a `file://` page cannot reach `/fonts/`.
