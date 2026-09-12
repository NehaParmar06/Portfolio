import { computed, type ComputedRef } from 'vue'
import { useMediaQuery } from './useMediaQuery'

export type MotionLevel = 'full' | 'minimal' | 'none'

/**
 * One decision point for how much the site is allowed to move.
 *
 *  full    — desktop, motion allowed: transforms, masks, staggered timelines.
 *  minimal — below 768px: short opacity fades only, no transforms, no scrub.
 *  none    — the visitor asked for reduced motion: everything lands instantly.
 *
 * Every animation in `src/animations` reads this before it does anything,
 * so there is exactly one place to change the policy.
 */
export function useMotionLevel(): {
  level: ComputedRef<MotionLevel>
  allowsTransform: ComputedRef<boolean>
} {
  const prefersReduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const isCompact = useMediaQuery('(width < 48rem)')

  const level = computed<MotionLevel>(() => {
    if (prefersReduced.value) return 'none'
    if (isCompact.value) return 'minimal'
    return 'full'
  })

  return {
    level,
    allowsTransform: computed(() => level.value === 'full'),
  }
}
