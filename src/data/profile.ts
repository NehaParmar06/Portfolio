import type { NavItem, Profile, Stat } from '@/types/content'

export const profile: Profile = {
  name: 'Neha Parmar',
  monogram: 'np.',
  /**
   * The title matches the résumé verbatim; the ownership follows it as
   * something she does, not a role she is applying for. An earlier draft
   * announced a move into product management, which left the site and the
   * CV answering different questions about what she is for.
   */
  role: 'Senior Frontend Engineer · Product Ownership',
  headline: {
    lead: 'turning complex data into',
    accent: 'clarity.',
  },
  intro:
    'Ten years building data-rich products in JavaScript, TypeScript, & Vue.js — and the last five owning the lifecycle around them: requirements, UX validation, backlog and release. Deep in the code, and in the decisions about what belongs in it.',
  focus: {
    label: 'Focus',
    text: 'Frontend architecture, product lifecycle ownership, AI-augmented delivery.',
  },
  tagline: 'Senior Frontend Engineer · Product Ownership',
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
