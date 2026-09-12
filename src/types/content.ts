/**
 * Content shapes for the whole site.
 *
 * Every string rendered on the page comes from `src/data/*` typed against
 * these interfaces — no copy is hard-coded inside a component. That keeps
 * edits to one file and makes the content trivially swappable later.
 */

export interface Profile {
  name: string
  /** The wordmark in the header. */
  monogram: string
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

/**
 * Tags carry two meanings in the comp, not one: the technology tags are
 * terracotta, the outcome/context tag is neutral. Encoding that here keeps
 * the distinction in the content rather than in a positional CSS rule.
 */
export type TagTone = 'tech' | 'context'

export interface Tag {
  label: string
  tone: TagTone
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
  tags: Tag[]
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

export type SocialKind = 'linkedin' | 'github' | 'figma'

export interface SocialLink {
  kind: SocialKind
  /** Screen-reader and tooltip label — the URL itself is never printed. */
  label: string
  href: string
}

export interface ContactContent {
  heading: string
  body: string
  /** Profile links, rendered as icons. The email is shown as text. */
  links: SocialLink[]
}

export interface NavItem {
  label: string
  href: string
}
