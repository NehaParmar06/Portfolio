import type { ContactContent } from '@/types/content'

/**
 * The address is assembled at runtime rather than sitting in the shipped
 * markup as a literal `mailto:`. It is visible on the rendered page by
 * design, so this stops the naive scrapers that parse HTML without running
 * it — not the ones that drive a real browser. That is the honest limit of
 * the technique, and the reason there is no cleverer obfuscation here:
 * anything that hides the address from a scraper hides it from a screen
 * reader too.
 */
const EMAIL_USER = 'neha.parmar06'
const EMAIL_DOMAIN = 'gmail.com'

export const emailAddress = (): string => `${EMAIL_USER}@${EMAIL_DOMAIN}`
export const emailHref = (): string => `mailto:${emailAddress()}`

export const contact: ContactContent = {
  heading: "Let's talk.",
  body: "If you're building something interesting, solving a tricky problem, or looking for someone to see it through — say hello.",
  links: [
    {
      kind: 'linkedin',
      label: 'LinkedIn — nehaparmar06',
      href: 'https://www.linkedin.com/in/nehaparmar06',
    },
    { kind: 'github', label: 'GitHub — nehaparmar06', href: 'https://github.com/nehaparmar06' },
    {
      kind: 'figma',
      label: 'Figma — nehaparmar06',
      href: 'https://www.figma.com/@nehaparmar06',
    },
  ],
}

/** Where the header's Résumé item points. Lives in /public. */
export const resumeHref = '/neha-parmar-resume.pdf'
