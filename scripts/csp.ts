import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'

export const VERCEL_JSON = new URL('../vercel.json', import.meta.url)

/** The CSP is assembled from parts so the style hash has exactly one home. */
export interface VercelHeader {
  key: string
  value: string
}

export interface VercelConfig {
  headers?: { source: string; headers: VercelHeader[] }[]
  [key: string]: unknown
}

export const cspDirectives = (styleHash: string): string[] => [
  // Nothing is allowed unless a directive below says so.
  "default-src 'none'",
  // One same-origin module bundle. No inline scripts, no eval: the Vue
  // runtime-only build is used, so no runtime template compilation.
  "script-src 'self'",
  // The stylesheet is inlined into index.html at build time, so it is
  // allowed by its own hash rather than by 'unsafe-inline'. Vue's :style
  // bindings write through the CSSOM, which CSP does not govern, so no
  // style-src-attr exemption is needed either.
  `style-src 'self' '${styleHash}'`,
  "img-src 'self'",
  "font-src 'self'",
  // Nothing on this page talks to a network.
  "connect-src 'none'",
  "base-uri 'none'",
  "form-action 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  'upgrade-insecure-requests',
]

export const buildCsp = (styleHash: string): string => cspDirectives(styleHash).join('; ')

/** sha256-… over the exact bytes between <style> and </style>. */
export const hashInlineStyle = (html: string): string => {
  const match = html.match(/<style>([\s\S]*?)<\/style>/)
  if (!match) throw new Error('csp: no inline <style> found in index.html')
  return `sha256-${createHash('sha256')
    .update(match[1] ?? '', 'utf8')
    .digest('base64')}`
}

export const readVercelConfig = (): VercelConfig =>
  JSON.parse(readFileSync(VERCEL_JSON, 'utf8')) as VercelConfig

export const currentCsp = (config: VercelConfig): VercelHeader => {
  for (const rule of config.headers ?? []) {
    for (const header of rule.headers ?? []) {
      if (header.key.toLowerCase() === 'content-security-policy') return header
    }
  }
  throw new Error('csp: vercel.json has no Content-Security-Policy header')
}

export const writeCsp = (config: VercelConfig, value: string): void => {
  currentCsp(config).value = value
  writeFileSync(VERCEL_JSON, `${JSON.stringify(config, null, 2)}\n`)
}
