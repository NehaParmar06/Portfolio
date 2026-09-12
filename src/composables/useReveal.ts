import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

export interface RevealOptions {
  /** Fire when this fraction of the element is visible. */
  threshold?: number
  /** Shrinks the viewport from the bottom so reveals start a little early. */
  rootMargin?: string
  /** Reveals fire once per session and never replay. */
  once?: boolean
}

/**
 * Marks an element as "in view" the first time it scrolls into the viewport.
 *
 * The element is styled visible at rest and animates *from* a visible state,
 * so if this never runs — JS blocked, observer unsupported, reduced motion —
 * the content is still there. `inView` starts true in that fallback case.
 */
export function useReveal(options: RevealOptions = {}): {
  target: Ref<HTMLElement | null>
  inView: Ref<boolean>
} {
  const { threshold = 0.2, rootMargin = '0px 0px -10% 0px', once = true } = options

  const target = ref<HTMLElement | null>(null)
  const inView = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (typeof IntersectionObserver === 'undefined' || !target.value) {
      inView.value = true
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            if (!once) inView.value = false
            continue
          }
          inView.value = true
          if (once && observer) observer.unobserve(entry.target)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(target.value)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
  })

  return { target, inView }
}
