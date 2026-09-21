import type { NavItem, Profile, Stat } from '@/types/content'

export const profile: Profile = {
  name: 'Neha Parmar',
  monogram: 'np.',
  role: 'Technical Product Management · Frontend Engineering',
  headline: {
    lead: 'turning complex data into',
    accent: 'clarity.',
  },
  intro:
    'Ten years building data-rich products in Vue.js and TypeScript — and the last five owning the lifecycle around them: requirements, UX validation, backlog and release. I am moving that ownership into a Technical Product Manager role.',
  focus: {
    label: 'Focus',
    text: 'Product lifecycle ownership, frontend architecture, AI-augmented delivery.',
  },
  tagline: 'Technical Product Management · Frontend Engineering',
  copyrightYear: 2026,
}

export const nav: NavItem[] = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Résumé', href: '/neha-parmar-resume.pdf' },
  { label: 'Contact', href: '#contact' },
]

/**
 * Every figure here is traceable to a line in the résumé. Two earlier
 * stats — 95%+ coverage and 50% faster delivery — were removed when the
 * résumé stopped making those claims: a number on the site that the CV
 * cannot substantiate is a liability in an interview, not an asset.
 */
export const stats: Stat[] = [
  { value: '10', label: 'years in frontend engineering' },
  { value: '5', label: 'products shipped end to end' },
  { value: '5', label: 'engineers mentored' },
  { value: '3', label: 'industries: logistics, finance, real estate' },
]
