import type { Credential } from '@/types/content'

import badgeAws from '@/assets/images/badge-aws.png'
import badgeGoogleUx from '@/assets/images/badge-google-ux.png'

/**
 * Two lists, one shape.
 *
 * Certifications sit above the degrees because the band has always read
 * newest-first; splitting it in two moved the headings, not the order.
 *
 * Both certificates carry their public Credly badge, so the two claims a
 * reader is least able to take on trust — a 2026 AWS certification and a
 * design certificate on an engineer's CV — are the two they can check in
 * one click. The degrees name the awarding institution and need no link.
 */
export const certifications: Credential[] = [
  {
    title: 'AWS Certified AI Practitioner',
    institution: 'Amazon Web Services',
    year: '2026',
    note: 'AI, ML and generative-AI concepts; responsible use on AWS',
    href: 'https://www.credly.com/badges/888df3a9-217f-4f70-85e9-1f219d15670b/public_url',
    badge: badgeAws,
  },
  {
    title: 'Google UX Design Professional Certificate',
    institution: 'Google · Coursera',
    year: '2025',
    note: 'UI/UX principles, design systems, Figma, usability testing',
    href: 'https://www.credly.com/badges/7c47acae-fb00-4572-82cc-d33739761d02/public_url',
    badge: badgeGoogleUx,
  },
]

export const education: Credential[] = [
  {
    title: 'PG Diploma in Software Development (Full Stack)',
    institution: 'IIIT Bangalore',
    year: '2019',
  },
  {
    title: 'PG Diploma in Advanced Computing',
    institution: 'CDAC Bangalore',
    year: '2016',
  },
  {
    title: 'B.E. Electrical Engineering',
    institution: 'SSCET Bhilai',
    year: '2015',
  },
]
