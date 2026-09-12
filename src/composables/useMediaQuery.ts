import { onBeforeUnmount, readonly, ref, type Ref } from 'vue'

/**
 * Reactive `matchMedia`. Returns false during SSR/prerender and before the
 * first evaluation, so callers must treat `false` as "not yet known" only
 * where that matters.
 */
export function useMediaQuery(query: string): Readonly<Ref<boolean>> {
  const matches = ref(false)

  if (typeof window === 'undefined' || !('matchMedia' in window)) {
    return readonly(matches)
  }

  const list = window.matchMedia(query)
  matches.value = list.matches

  const onChange = (event: MediaQueryListEvent) => {
    matches.value = event.matches
  }

  list.addEventListener('change', onChange)
  onBeforeUnmount(() => list.removeEventListener('change', onChange))

  return readonly(matches)
}
