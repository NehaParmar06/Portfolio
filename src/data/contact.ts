import type { ContactContent } from '@/types/content'

/**
 * Links render as icons only — the URLs and the address are never printed
 * as text on the page. `label` is what a screen reader announces and what
 * the tooltip shows.
 *
 * The email address is assembled at runtime rather than sitting in the
 * markup as a literal `mailto:`, which is the cheapest thing that actually
 * reduces scraper pickup.
 */
const EMAIL_USER = 'neha.parmar06'
const EMAIL_DOMAIN = 'gmail.com'

export const emailAddress = (): string => `${EMAIL_USER}@${EMAIL_DOMAIN}`
export const emailHref = (): string => `mailto:${emailAddress()}`

export const contact: ContactContent = {
  heading: "Let's talk.",
  body: "If you're building something interesting, solving a tricky problem, or looking for someone to build with — say hello.",
  links: [
    { kind: 'email', label: 'Email Neha', href: '' },
    { kind: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/nehaparmar06' },
    { kind: 'github', label: 'GitHub', href: 'https://github.com/nehaparmar06' },
  ],
}

/** Where the header's Résumé item points. Lives in /public. */
export const resumeHref = '/neha-parmar-resume.pdf'
