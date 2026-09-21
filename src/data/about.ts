import type { AboutContent } from '@/types/content'

import portrait from '@/assets/images/neha-parmar.jpg'
import portrait2x from '@/assets/images/neha-parmar@2x.jpg'
import portraitWebp from '@/assets/images/neha-parmar.webp'
import portraitWebp2x from '@/assets/images/neha-parmar@2x.webp'

export const about: AboutContent = {
  label: 'About',
  paragraphs: [
    "I build things for the web, but what really interests me is solving the problem behind what we're building.",
    'Ten years of frontend engineering across logistics and financial services taught me that the hardest part is rarely the code. It is deciding what to ship, in what order, and what to leave out of the first version.',
    'So that is the work I gravitated towards: gathering requirements from stakeholders, validating prototypes with UX before development starts, refining and estimating a backlog, and carrying features through pre-prod, QA and release. I am now moving that ownership into a dedicated Technical Product Manager role.',
    'The engineering depth does not go away — it is the reason I can sit in a design review and judge a usability trade-off, or spot a state-management defect before it reaches a customer. A Google UX Design certificate sharpened the first half of that.',
    "And I believe great teams don't just ship better software—they make the people in them better. I enjoy mentoring, collaborating, and sharing what I learn along the way.",
  ],
  // Ordered product-first, then engineering: the sequence itself says which
  // half leads, without needing a label to announce it. Every product chip
  // maps to a line in the résumé's Core Competencies — same rule as the
  // stat band, so nothing here is aspirational.
  skills: [
    'Requirement gathering',
    'Story refinement',
    'Backlog & estimation',
    'Prototype sign-off',
    'Scrum delivery',
    'Release risk mitigation',
    'UI/UX design',
    'JavaScript',
    'TypeScript',
    'Vue.js',
    'Angular',
    'Claude Code / Copilot',
  ],
  portrait: {
    src: portrait,
    // Width descriptors, not 1x/2x — they pair with the `sizes` attribute so
    // the browser can pick the right file for the rendered box.
    srcSet: `${portrait} 280w, ${portrait2x} 560w`,
    webp: `${portraitWebp} 280w, ${portraitWebp2x} 560w`,
    alt: 'Neha Parmar',
  },
}
