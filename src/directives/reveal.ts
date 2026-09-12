import type { Directive, DirectiveBinding } from 'vue'

/**
 * `v-reveal` — marks an element revealed the first time it enters the
 * viewport, by adding `.is-revealed`. The animation itself lives in CSS
 * (src/assets/styles/motion.css).
 *
 * One observer for the whole page rather than one per component: an
 * IntersectionObserver instance costs a little, and a portfolio has no
 * reason to hold a dozen of them.
 *
 * Elements are styled at their final state by default — this only ever
 * adds a class, never removes content — so a page where this never runs
 * is a page that simply does not animate.
 */

const REVEALED = 'is-revealed'

let observer: IntersectionObserver | null = null

const ensureObserver = (): IntersectionObserver | null => {
  if (typeof IntersectionObserver === 'undefined') return null
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add(REVEALED)
        observer?.unobserve(entry.target)
      }
    },
    // Start a little before the element is fully in view, so the reveal
    // finishes around the time the reader's eye arrives.
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
  )
  return observer
}

export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<number | undefined>) {
    el.classList.add('reveal')

    if (typeof binding.value === 'number') {
      el.style.setProperty('--delay', `${binding.value}ms`)
    }

    const io = ensureObserver()
    if (!io) {
      // No observer support: show the finished state immediately.
      el.classList.add(REVEALED)
      return
    }
    io.observe(el)
  },

  unmounted(el: HTMLElement) {
    observer?.unobserve(el)
  },
}
