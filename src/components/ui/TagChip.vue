<script setup lang="ts">
import type { TagTone } from '@/types/content'

/**
 * Case-study tag. Terracotta for technologies, neutral for the
 * outcome/context tag — the distinction is in the data, not in position.
 */
defineProps<{ tone: TagTone }>()
</script>

<template>
  <span
    class="rounded-pill px-3 py-[5px] text-tag leading-none"
    :class="tone === 'tech' ? 'bg-accent-wash text-accent' : 'bg-hairline-soft text-body-dim'"
  >
    <slot />
  </span>
</template>
