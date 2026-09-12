import type { NavItem, Profile, Stat } from '@/types/content'

export const profile: Profile = {
  name: 'Neha Parmar',
  monogram: 'np.',
  role: 'Frontend & UI/UX Engineer',
  headline: {
    lead: 'turning complex data into',
    accent: 'clarity.',
  },
  intro:
    'I build data-rich web applications for supply chain and finance — Vue.js and TypeScript, end-to-end ownership from discovery to release, with AI in the loop.',
  focus: {
    label: 'Focus',
    text: 'Data-rich interfaces, frontend architecture, AI-augmented delivery.',
  },
  tagline: 'Frontend & UI/UX Engineer',
  copyrightYear: 2026,
}

export const nav: NavItem[] = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Résumé', href: '/neha-parmar-resume.pdf' },
  { label: 'Contact', href: '#contact' },
]

export const stats: Stat[] = [
  { value: '10', label: 'years shipping frontend' },
  { value: '95%+', label: 'test coverage held' },
  { value: '50%', label: 'faster delivery with AI workflows' },
  { value: '4', label: 'engineers mentored' },
]
