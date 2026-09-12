/**
 * Content shapes for the whole site.
 *
 * Every string rendered on the page comes from `src/data/*` typed against
 * these interfaces — no copy is hard-coded inside a component. That keeps
 * edits to one file and makes the content trivially swappable later.
 */

export interface Profile {
  name: string
  /** Eyebrow above the name. */
  role: string
  /** Hero sub-headline, split so the accent word can be styled on its own. */
  headline: { lead: string; accent: string }
  /** Hero paragraph. */
  intro: string
  focus: { label: string; text: string }
  /** Rendered in the footer. */
  tagline: string
  copyrightYear: number
}

export interface Stat {
  /** The figure as it should read, e.g. "95%+". */
  value: string
  label: string
}

export interface Role {
  period: string
  title: string
  company: string
  summary: string
}

export interface CaseStudy {
  /** Stable slug — used as the DOM id and the expand/collapse key. */
  id: string
  client: string
  period: string
  title: string
  /** The one-paragraph version, always visible. */
  summary: string
  /** Revealed when the card is expanded. */
  detail: {
    problem: string
    approach: string
    outcome: string
  }
  tags: string[]
}

export interface AboutContent {
  label: string
  paragraphs: string[]
  skills: string[]
  portrait: {
    src: string
    srcSet: string
    webp: string
    alt: string
  }
}

export type SocialKind = 'email' | 'linkedin' | 'github'

export interface SocialLink {
  kind: SocialKind
  /** Screen-reader and tooltip label — the URL itself is never printed. */
  label: string
  href: string
}

export interface ContactContent {
  heading: string
  body: string
  links: SocialLink[]
}

export interface NavItem {
  label: string
  href: string
}
