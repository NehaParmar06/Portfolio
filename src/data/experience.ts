import type { Role } from '@/types/content'

/**
 * Job titles match the résumé verbatim. A title that reads differently on
 * the two documents is the kind of discrepancy an interviewer notices and
 * nobody can explain afterwards, so the CV is the source of truth and this
 * file follows it.
 */
export const experience: Role[] = [
  {
    period: '2021–2026',
    title: 'Software Engineer III (SDE-3), Frontend',
    company: 'Maersk GSC',
    summary:
      'Built and owned the Vue/TypeScript frontend of Maersk Spot’s self-service booking flow — a reusable component library shared across all five screens, a centralised Vuex store, and performance work on data-heavy screens — and owned the delivery lifecycle around it: requirements, story refinement with BAs, UX sign-off, backlog and estimation, Scrum delivery, stakeholder demos. Mentored 5 frontend engineers through code review and pair programming, and helped shape the team’s frontend standards.',
  },
  {
    period: '2018–2021',
    title: 'Senior Software Engineer',
    company: 'Zenmonics → FIS Global',
    summary:
      'Built Starlight, the online account-opening and banking suite that lets customers of small US banks open an account entirely online — component-based multi-step forms with layered validation in Angular 2 and TypeScript, against Java REST services. Zenmonics was acquired by FIS in 2020 and Starlight became part of the FIS IFS platform. Led code reviews and drove frontend architecture.',
  },
  {
    period: '2016–2018',
    title: 'Frontend Developer',
    company: 'Fidelity National Financial India',
    summary:
      'Owned frontend delivery from discovery through production release for 14 cross-brand mobile apps serving 10K+ users, on a shared component base.',
  },
]
