import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * The site's motion vocabulary. Two curves, four durations, one stagger.
 * Anything that moves picks from here — nothing invents its own timing.
 *
 * Locked in step 0 (see docs/motion-spec.md).
 */
export const MOTION = {
  duration: {
    /** Hover and pointer states. */
    fast: 0.3,
    /** Standard reveal. */
    base: 0.55,
    /** Hero lines, contact panel, portrait. */
    slow: 0.75,
    /** Expand/collapse of a case study. */
    expand: 0.45,
  },
  ease: {
    /** Entrances — decelerates hard, settles clean. */
    out: 'expo.out',
    /** Draws and wipes — symmetric, reads as a mechanism. */
    inOut: 'power3.inOut',
  },
  stagger: {
    lines: 0.1,
    items: 0.11,
    chips: 0.055,
  },
  /** ScrollTrigger start position used by every scroll reveal. */
  start: 'top 85%',
} as const

export { gsap, ScrollTrigger }
