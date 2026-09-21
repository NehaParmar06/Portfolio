import type { CaseStudy } from '@/types/content'

/**
 * `summary` is always visible; `detail` is the expand-in-place content.
 *
 * The detail sections lead with the decision rather than the stack — the
 * judgement is the part a résumé bullet cannot carry.
 */
export const caseStudies: CaseStudy[] = [
  {
    id: 'instant-booking',
    client: 'Maersk GSC',
    period: '2021–26',
    title: 'Self-Service Instant Booking',
    summary:
      'The five-screen customer booking application behind Maersk Spot. Booking ocean freight meant back-and-forth with sales reps; I owned the lifecycle of the replacement — requirements through release — and built it in Vue.js and TypeScript.',
    detail: {
      problem:
        'Every ocean freight booking started as a conversation. Customers sent enquiries, sales reps came back with options, and a single booking could take days before anything was confirmed.',
      approach:
        'I gathered requirements directly from stakeholders, refined stories with the BAs, and worked with UX on wireframes and prototypes until we had sign-off before any code was written. Then I led backlog refinement and estimation and coordinated the work across a Scrum team of engineers, QA and DevOps — building the flow in Vue.js and TypeScript alongside them.',
      outcome:
        'Customers book and receive confirmation instantly, with no rep in the loop. Two calls shaped the release: I proposed a scoped-down v1 of the Container Details step rather than the full-featured version, which the team accepted and which cut our release risk; and during pre-release verification I diagnosed a state-management defect that would have stopped customers completing bookings, and drove the cross-functional fix before launch.',
    },
    tags: [
      { label: 'Vue.js', tone: 'tech' },
      { label: 'TypeScript', tone: 'tech' },
      { label: 'Lifecycle ownership', tone: 'context' },
    ],
  },
  {
    id: 'starlight',
    client: 'FIS Global',
    period: '2018–21',
    title: 'Starlight Account Opening',
    summary:
      'Small US banks had no way to open accounts online. I delivered the online account-opening and banking suite on FIS’s IFS platform — partnering with business and product stakeholders on requirements and the multi-step form flows.',
    detail: {
      problem:
        'Small and mid-size US banks had no digital onboarding at all. Opening an account meant a branch visit, which meant losing every applicant who wanted to start at 11pm on a phone.',
      approach:
        'I worked with business and product stakeholders to shape the requirements, then led the Angular and TypeScript build of the multi-step journey — identity, product selection, disclosures and funding — designed so each participating bank could brand and configure it without forking the code.',
      outcome:
        'Banks onboard customers end to end online, with no branch visit, on a flow built to financial-services compliance and scale requirements. I led code reviews and drove architectural improvements across the frontend codebase.',
    },
    tags: [
      { label: 'Angular', tone: 'tech' },
      { label: 'TypeScript', tone: 'tech' },
      { label: 'Fintech', tone: 'context' },
    ],
  },
  {
    id: 'title-escrow',
    client: 'Fidelity National Financial',
    period: '2016–18',
    title: 'Title & Escrow Ordering',
    summary:
      'Customers needed to order title, escrow, or both against a searched property without contacting a rep. I built the ordering flow end to end in AngularJS and Angular 2, connecting property search to a checkout-style order form.',
    detail: {
      problem:
        'Ordering title or escrow services against a property meant calling a representative. There was no path from "I found the property" to "I have placed the order".',
      approach:
        'I built the ordering flow end to end, connecting the existing property search to a checkout-style order form that handled title, escrow, or both in a single pass.',
      outcome:
        'Customers place orders directly off a property search result, with no rep contact needed.',
    },
    tags: [
      { label: 'AngularJS', tone: 'tech' },
      { label: 'Angular 2', tone: 'tech' },
      { label: 'Proptech', tone: 'context' },
    ],
  },
  {
    id: 'property-search',
    client: 'Fidelity National Financial',
    period: '2017',
    title: 'Property Search — 14 Apps',
    summary:
      'A cross-brand mobile property-search suite spanning 14 separate apps serving 10K+ users, owned from discovery through production release. Built on a shared component base so every brand shipped a consistent experience.',
    detail: {
      problem:
        'Fourteen brands each needed their own mobile property-search app, and building fourteen apps fourteen times was not a plan.',
      approach:
        'I built one shared component base in Ionic 3 and AngularJS — search, filters and listing detail — themed per brand, so a change to the search experience landed everywhere at once.',
      outcome:
        'All 14 apps delivered inside a year, on a consistent experience. At design review I challenged the two-menu navigation the spec called for and proposed a single nested menu instead; it was adopted and shipped, and it made the apps materially simpler to move around.',
    },
    tags: [
      { label: 'Ionic 3', tone: 'tech' },
      { label: 'AngularJS', tone: 'tech' },
      { label: '14 apps, 10K+ users', tone: 'context' },
    ],
  },
  {
    id: 'facilities-feedback',
    client: 'Fidelity National Financial',
    period: '2016',
    title: 'Facilities Feedback App',
    summary:
      'An internal tool for rating and reporting on office facilities across sites. Built in AngularJS as one of my earliest end-to-end deliveries, shipped to employees and used to track recurring facility issues.',
    detail: {
      problem:
        'Facility problems across offices were reported by email and word of mouth, so nothing recurring was ever visible as a pattern.',
      approach:
        'I built an internal AngularJS tool for rating and reporting on facilities per site — one of my earliest end-to-end deliveries, from the data model through to the screens.',
      outcome:
        'Shipped to employees across sites and used to surface and track recurring facility issues.',
    },
    tags: [
      { label: 'AngularJS', tone: 'tech' },
      { label: 'Internal tool', tone: 'context' },
    ],
  },
]
