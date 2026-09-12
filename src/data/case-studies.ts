import type { CaseStudy } from '@/types/content'

/**
 * `summary` is the paragraph from the Figma comp — always visible.
 * `detail` is the expand-in-place content. The problem/approach/outcome
 * split is drafted from the summary; Neha to expand or correct each one.
 */
export const caseStudies: CaseStudy[] = [
  {
    id: 'instant-booking',
    client: 'Maersk GSC',
    period: '2021–26',
    title: 'Self-Service Instant Booking',
    summary:
      'Booking ocean freight meant back-and-forth with sales reps. I built a guided flow — origin/destination, commodity, container details, sailing selection and VAS — architected in Vue.js and TypeScript, ending in instant confirmation.',
    detail: {
      problem:
        'Every ocean freight booking started as a conversation. Customers sent enquiries, sales reps came back with options, and a single booking could take days of back-and-forth before anything was confirmed.',
      approach:
        'I architected a guided self-service flow in Vue.js and TypeScript: origin and destination, commodity, container details, sailing selection and value-added services, each step validating against live constraints so the customer never reached the end holding an invalid booking.',
      outcome:
        'Customers book and receive confirmation instantly, without a rep in the loop. AI-augmented workflows through the build cut delivery time roughly in half, and the feature shipped with coverage held above 95%.',
    },
    tags: ['Vue.js', 'TypeScript', '50% faster delivery'],
  },
  {
    id: 'starlight',
    client: 'FIS Global',
    period: '2018–21',
    title: 'Starlight Account Opening',
    summary:
      'Small US banks had no way to open accounts online. I led Angular/TypeScript development of a fully digital account-opening flow — no branch visit required — built for financial-services scale and compliance.',
    detail: {
      problem:
        'Small and mid-size US banks had no digital onboarding at all. Opening an account meant a branch visit, which meant losing every applicant who wanted to start at 11pm on a phone.',
      approach:
        'I led the Angular and TypeScript build of a fully digital account-opening journey — identity, product selection, disclosures and funding — designed so each participating bank could brand and configure it without forking the code.',
      outcome:
        'Banks onboard customers end to end online, with no branch visit, on a flow built to financial-services compliance and scale requirements.',
    },
    tags: ['Angular 2', 'TypeScript', 'Fintech'],
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
        'I built the ordering flow end to end in AngularJS and Angular 2, connecting the existing property search to a checkout-style order form that handled title, escrow, or both in a single pass.',
      outcome:
        'Customers place orders directly off a property search result, with no rep contact needed.',
    },
    tags: ['AngularJS', 'Angular 2', 'Proptech'],
  },
  {
    id: 'property-search',
    client: 'Fidelity National Financial',
    period: '2017',
    title: 'Property Search — 14 Apps',
    summary:
      'A cross-brand mobile property-search suite spanning 14 separate apps, delivered solo inside a year. Built in Ionic 3 and AngularJS to a shared component pattern so every brand shipped consistent search, filters, and listing detail screens.',
    detail: {
      problem:
        'Fourteen brands each needed their own mobile property-search app, and building fourteen apps fourteen times was not a plan.',
      approach:
        'I built one shared component pattern in Ionic 3 and AngularJS — search, filters and listing detail — themed per brand, so a change to the search experience landed everywhere at once.',
      outcome: 'All 14 apps delivered solo inside a year, with a consistent experience across every brand.',
    },
    tags: ['Ionic 3', 'AngularJS', 'Solo build, 14 apps'],
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
    tags: ['AngularJS', 'Internal tool'],
  },
]
