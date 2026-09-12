<script setup lang="ts">
import { computed } from 'vue'
import { Figma, Github, Linkedin } from 'lucide-vue-next'

import type { SocialKind } from '@/types/content'

/**
 * Icon-only profile link. The URL is never printed as text — the
 * accessible name carries it, and the native title gives sighted users a
 * hover hint. 44px box, so it clears the WCAG 2.5.8 target-size minimum
 * on touch.
 */
const props = defineProps<{
  kind: SocialKind
  label: string
  href: string
}>()

const icon = computed(() => {
  switch (props.kind) {
    case 'github':
      return Github
    case 'figma':
      return Figma
    default:
      return Linkedin
  }
})
</script>

<template>
  <a
    :href="href"
    :title="label"
    :aria-label="label"
    target="_blank"
    rel="noopener noreferrer"
    class="grid size-11 place-items-center rounded-pill border border-on-accent/30 text-on-accent transition-colors duration-300 hover:bg-on-accent hover:text-accent"
  >
    <component :is="icon" :size="20" :stroke-width="1.75" aria-hidden="true" />
  </a>
</template>
