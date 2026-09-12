import type { AboutContent } from '@/types/content'

import portrait from '@/assets/images/neha-parmar.jpg'
import portrait2x from '@/assets/images/neha-parmar@2x.jpg'
import portraitWebp from '@/assets/images/neha-parmar.webp'
import portraitWebp2x from '@/assets/images/neha-parmar@2x.webp'

export const about: AboutContent = {
  label: 'About',
  paragraphs: [
    "I build things for the web, but what really interests me is solving the problem behind what we're building.",
    "I'm a Frontend & UI/UX Engineer with 10 years of experience building complex, data-rich products with Vue.js, TypeScript, and JavaScript, primarily across supply chain and financial services.",
    'I own problems end to end—from discovery and architecture to shipping, learning, and making things better. I care about simplicity, scalability, and experiences that actually work for people.',
    "And I believe great engineers don't just write better code—they make the people around them better. I enjoy mentoring, collaborating, and sharing what I learn along the way.",
    "Currently, I'm expanding into React, Node.js, cloud, and AI—because great products need engineers who can think beyond the frontend.",
  ],
  skills: [
    'JavaScript',
    'TypeScript',
    'Vue.js',
    'Angular',
    'Jest / E2E',
    'Copilot / Claude',
    'Figma',
  ],
  portrait: {
    src: portrait,
    srcSet: `${portrait} 1x, ${portrait2x} 2x`,
    webp: `${portraitWebp} 1x, ${portraitWebp2x} 2x`,
    alt: 'Neha Parmar',
  },
}
