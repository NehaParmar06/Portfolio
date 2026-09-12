/**
 * The quality gate.
 *
 * Serves `dist/` with the exact headers from vercel.json — including the
 * Content-Security-Policy — and then fails the process on any of:
 *
 *   · a CSP violation, or a console error
 *   · an axe-core accessibility violation
 *   · a colour-contrast failure, measured against the *composited*
 *     background rather than the declared colour
 *   · horizontal overflow at any tested width
 *
 * Contrast is measured here rather than trusted from the token file because
 * translucent fills compose: terracotta text on a terracotta-at-10% chip
 * over a Tamarind panel is not any of the three colours involved.
 *
 * Run with `npm run audit:a11y` after a build; CI runs it on every push.
 */
import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, normalize, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { chromium } from 'playwright'

const ROOT = resolve(fileURLToPath(new URL('../', import.meta.url)))
const DIST = join(ROOT, 'dist')
const PORT = Number(process.env.AUDIT_PORT ?? 4180)
const WIDTHS = [320, 390, 768, 1024, 1440]

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json',
}

const failures = []
const fail = (message) => failures.push(message)

/* ---------------------------------------------------------------
   A static server that applies vercel.json's headers, so the audit
   tests the policy that will actually be served.
   --------------------------------------------------------------- */
const vercel = JSON.parse(readFileSync(join(ROOT, 'vercel.json'), 'utf8'))

const headersFor = (pathname) => {
  const out = {}
  for (const rule of vercel.headers ?? []) {
    // vercel.json sources are path patterns with regex groups.
    const pattern = new RegExp(`^${rule.source.replace(/\/$/, '/?')}$`)
    if (!pattern.test(pathname)) continue
    for (const { key, value } of rule.headers) out[key] = value
  }
  return out
}

const serve = () =>
  new Promise((ready) => {
    const server = createServer((req, res) => {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
      const safe = normalize(pathname).replace(/^(\.\.[/\\])+/, '')
      let file = join(DIST, safe)
      if (!existsSync(file) || statSync(file).isDirectory()) file = join(DIST, 'index.html')

      const headers = headersFor(pathname)
      headers['Content-Type'] = MIME[extname(file)] ?? 'application/octet-stream'
      res.writeHead(200, headers)
      createReadStream(file).pipe(res)
    })
    server.listen(PORT, () => ready(server))
  })

/* ---------------------------------------------------------------
   Contrast, measured in the page.
   --------------------------------------------------------------- */
const CONTRAST_PROBE = `(() => {
  const parse = (c) => {
    const m = c.match(/rgba?\\(([^)]+)\\)/);
    if (!m) return null;
    const p = m[1].split(/[ ,\\/]+/).filter(Boolean).map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const over = (f, b) => ({
    r: f.r * f.a + b.r * (1 - f.a),
    g: f.g * f.a + b.g * (1 - f.a),
    b: f.b * f.a + b.b * (1 - f.a),
    a: 1,
  });
  const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  const L = (c) => 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
  const ratio = (a, b) => { const x = L(a), y = L(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };

  const backdrop = (el) => {
    const stack = [];
    let node = el;
    while (node && node !== document.documentElement) {
      const bg = parse(getComputedStyle(node).backgroundColor);
      if (bg && bg.a > 0) { stack.push(bg); if (bg.a === 1) break; }
      node = node.parentElement;
    }
    const root = parse(getComputedStyle(document.body).backgroundColor) || { r: 255, g: 255, b: 255, a: 1 };
    let base = stack.length && stack[stack.length - 1].a === 1 ? stack.pop() : root;
    for (let i = stack.length - 1; i >= 0; i--) base = over(stack[i], base);
    return base;
  };

  const out = [];
  const seen = new Set();
  for (const el of document.querySelectorAll('body *')) {
    const text = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join('').trim();
    if (!text) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || el.closest('.sr-only')) continue;
    const fg = parse(cs.color);
    if (!fg) continue;
    const bg = backdrop(el);
    const px = parseFloat(cs.fontSize);
    const weight = parseInt(cs.fontWeight, 10) || 400;
    const need = px >= 24 || (px >= 18.66 && weight >= 700) ? 3 : 4.5;
    const key = cs.color + '|' + Math.round(bg.r) + ',' + Math.round(bg.g) + ',' + Math.round(bg.b) + '|' + px + '|' + weight;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ sample: text.slice(0, 40), color: cs.color, px, need, ratio: +ratio(over(fg, bg), bg).toFixed(2) });
  }
  return out;
})()`

/* --------------------------------------------------------------- */

const server = await serve()
const base = `http://localhost:${PORT}/`
const browser = await chromium.launch({
  // CI installs the matching browser; locally, PLAYWRIGHT_CHROMIUM_PATH can
  // point at one that is already on the machine.
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined,
})
const axe = readFileSync(join(ROOT, 'node_modules/axe-core/axe.min.js'), 'utf8')

console.log(`auditing ${base} with vercel.json headers applied\n`)

for (const width of WIDTHS) {
  const page = await browser.newPage({ viewport: { width, height: 900 } })

  const violations = []
  await page.addInitScript(() => {
    window.__csp = []
    document.addEventListener('securitypolicyviolation', (e) => {
      window.__csp.push(`${e.violatedDirective} blocked ${e.blockedURI}`)
    })
  })
  page.on('console', (m) => {
    if (m.type() === 'error') violations.push(`console error: ${m.text()}`)
  })
  page.on('pageerror', (e) => violations.push(`page error: ${e.message}`))

  await page.goto(base, { waitUntil: 'networkidle' })

  // Drive the page through every state before auditing it.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 50))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(1200)
  await page.click('#case-instant-booking-toggle').catch(() => {})
  if (width < 768) await page.click('[aria-controls="mobile-nav"]').catch(() => {})
  await page.waitForTimeout(900)

  const csp = await page.evaluate(() => window.__csp)
  for (const v of csp) fail(`[${width}px] CSP: ${v}`)
  for (const v of violations) fail(`[${width}px] ${v}`)

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  )
  if (overflow > 1) fail(`[${width}px] horizontal overflow: ${overflow}px`)

  // Evaluated through CDP rather than injected as a <script> element: the
  // CSP is strict enough to block addScriptTag, which is the point of it.
  await page.evaluate(axe)
  const axeRun = await page.evaluate(async () =>
    window.axe.run(document, { resultTypes: ['violations'] }),
  )
  for (const v of axeRun.violations) fail(`[${width}px] axe ${v.id} (${v.impact}): ${v.help}`)

  const contrast = await page.evaluate(CONTRAST_PROBE)
  const bad = contrast.filter((c) => c.ratio < c.need)
  for (const c of bad) {
    fail(`[${width}px] contrast ${c.ratio}:1 < ${c.need} — ${c.px}px "${c.sample}"`)
  }

  console.log(
    `  ${String(width).padStart(4)}px  csp ${csp.length}  axe ${axeRun.violations.length}  ` +
      `contrast ${bad.length}/${contrast.length}  overflow ${overflow > 1 ? overflow + 'px' : 'none'}`,
  )
  await page.close()
}

await browser.close()
server.close()

if (failures.length) {
  console.error(`\n${failures.length} failure(s):`)
  for (const f of failures) console.error('  ✗', f)
  process.exit(1)
}
console.log('\nall checks passed')
