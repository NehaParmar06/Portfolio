<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { profile } from '@/data/profile'

/**
 * M1 — curtain lift. The only sequence that runs on load rather than on
 * scroll, so it is driven by a mount flag instead of the reveal directive.
 * The class is added after mount, so the resting markup that ships in the
 * HTML is the finished state.
 */
const entering = ref(false)
onMounted(() => {
  entering.value = true
})
</script>

<template>
  <section
    id="top"
    class="shell flex flex-col gap-12 pt-14 pb-16 lg:flex-row lg:items-center"
    :class="entering && 'is-entering'"
  >
    <div class="flex min-w-0 flex-1 flex-col items-start gap-6">
      <p class="hero-fade eyebrow flex items-center gap-3 text-accent">
        <span class="block h-0.5 w-11 rounded-pill bg-accent" aria-hidden="true"></span>
        {{ profile.role }}
      </p>

      <h1 class="flex flex-col font-display tracking-display">
        <span class="hero-mask" style="--delay: 100ms">
          <span class="block text-h1 text-ink sm:text-display">{{ profile.name }}</span>
        </span>
        <span class="hero-mask" style="--delay: 200ms">
          <span class="block text-h3 text-ink sm:text-h1">
            {{ profile.headline.lead }}
            <span class="hero-accent text-accent">{{ profile.headline.accent }}</span>
          </span>
        </span>
      </h1>

      <p class="hero-fade max-w-[35rem] text-lead text-body" style="--delay: 420ms">
        {{ profile.intro }}
      </p>
    </div>

    <!-- Focus rail: 340px with a 1px rule down its left edge in the comp.
         On narrow screens the rule moves to the top so it never floats. -->
    <div
      class="hero-fade w-full shrink-0 border-t border-hairline pt-6 lg:w-[21.25rem] lg:border-t-0 lg:border-l lg:pt-0 lg:pl-9"
      style="--delay: 520ms"
    >
      <p class="kicker text-muted">{{ profile.focus.label }}</p>
      <p class="mt-3 text-body text-ink">{{ profile.focus.text }}</p>
    </div>
  </section>
</template>
