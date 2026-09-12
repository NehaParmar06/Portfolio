import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig, type Plugin } from 'vite'

import {
  buildCsp,
  currentCsp,
  hashInlineStyle,
  readVercelConfig,
  writeCsp,
} from './scripts/csp.ts'

/**
 * The canonical origin. Referenced by the canonical link, the Open Graph
 * tags, robots.txt and sitemap.xml — all generated from this one value, so
 * pointing the site at a custom domain is a one-line change.
 */
const SITE_URL = process.env.VITE_SITE_URL ?? 'https://nehaparmar.vercel.app'

/** Substitutes %SITE_URL% in index.html. */
function siteUrl(): Plugin {
  return {
    name: 'site-url',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replaceAll('%SITE_URL%', SITE_URL),
    },
  }
}

/**
 * Emits robots.txt and sitemap.xml so they cannot drift from SITE_URL.
 * A single-page site has exactly one URL; enumerating it by hand in a
 * static file is how that file ends up pointing at a dead preview domain.
 */
function seoFiles(): Plugin {
  return {
    name: 'seo-files',
    apply: 'build',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source:
          `<?xml version="1.0" encoding="UTF-8"?>\n` +
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          `  <url><loc>${SITE_URL}/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>\n` +
          `</urlset>\n`,
      })
    },
  }
}

/**
 * Inlines the built stylesheet into index.html and drops the <link>.
 *
 * The whole sheet is ~6KB — smaller than the HTTP overhead of fetching it,
 * and it sits on the critical path: the browser cannot paint until it
 * arrives. Inlining removes a render-blocking round trip (Lighthouse
 * measured ~156ms) while the JS, fonts and images stay hashed and
 * immutably cacheable.
 */
function inlineStylesheet(): Plugin {
  return {
    name: 'inline-stylesheet',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html
        let out = html
        for (const [fileName, asset] of Object.entries(ctx.bundle)) {
          if (asset.type !== 'asset' || !fileName.endsWith('.css')) continue
          const escaped = fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          const linkTag = new RegExp(`<link[^>]+href="[^"]*${escaped}"[^>]*>`)
          if (!linkTag.test(out)) continue
          out = out.replace(linkTag, `<style>${String(asset.source)}</style>`)
          delete ctx.bundle[fileName]
        }
        return out
      },
    },
  }
}

/**
 * Keeps the CSP's style hash honest.
 *
 * The stylesheet is inlined, so `style-src` allows it by sha256 rather than
 * by `'unsafe-inline'`. That hash changes whenever the CSS changes, and a
 * stale hash would mean a deployed site with no styles at all — so the
 * check lives *inside the build*: Vercel runs `npm run build`, and a
 * mismatch fails the deploy loudly instead of shipping a broken page.
 *
 * `npm run csp:sync` re-runs the build with CSP_SYNC=1, which rewrites
 * vercel.json instead of throwing. Commit the result.
 */
function cspStyleHash(): Plugin {
  return {
    name: 'csp-style-hash',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        const expected = buildCsp(hashInlineStyle(html))
        const config = readVercelConfig()
        const header = currentCsp(config)

        if (process.env.CSP_SYNC === '1') {
          if (header.value !== expected) {
            writeCsp(config, expected)
            this.info?.('csp: vercel.json updated with the new style hash')
          }
          return html
        }

        if (header.value !== expected) {
          this.error(
            'csp: the Content-Security-Policy in vercel.json does not match the built ' +
              'stylesheet. Run `npm run csp:sync` and commit vercel.json.\n\n' +
              `  expected: ${expected}\n  found:    ${header.value}\n`,
          )
        }
        return html
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss(), siteUrl(), seoFiles(), inlineStylesheet(), cspStyleHash()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    assetsInlineLimit: 2048,
    sourcemap: false,
    // No manual chunks: the app is one screen, so a second request buys
    // nothing. Everything below is hashed and served immutable.
  },
})
