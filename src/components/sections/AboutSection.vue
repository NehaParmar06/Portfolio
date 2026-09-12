<script setup lang="ts">
import SkillChip from '@/components/ui/SkillChip.vue'
import { about } from '@/data/about'

/** Circumference of r=49 in the 100×100 viewBox, for the draw-on reveal. */
const RING_LENGTH = 2 * Math.PI * 49
</script>

<template>
  <!-- Full-bleed Tamarind band, unlike the sections above it. -->
  <section id="about" v-reveal class="border-t border-hairline-soft bg-panel py-14">
    <div class="shell flex flex-col gap-10 lg:flex-row lg:gap-14">
      <!-- M9 · the ring draws, then the portrait fades in behind it. -->
      <div class="relative size-45 shrink-0 lg:size-[17.625rem]">
        <svg
          class="portrait-ring absolute inset-0 size-full -rotate-90"
          viewBox="0 0 100 100"
          :style="{ '--ring-length': RING_LENGTH }"
          aria-hidden="true"
        >
          <circle
            cx="50"
            cy="50"
            r="49"
            fill="none"
            stroke="var(--color-accent)"
            stroke-width="1"
          />
        </svg>

        <picture>
          <source
            :srcset="about.portrait.webp"
            sizes="(width >= 64rem) 282px, 180px"
            type="image/webp"
          />
          <img
            :src="about.portrait.src"
            :srcset="about.portrait.srcSet"
            sizes="(width >= 64rem) 282px, 180px"
            :alt="about.portrait.alt"
            width="282"
            height="282"
            loading="lazy"
            decoding="async"
            class="portrait-image size-full rounded-pill object-cover p-[3px]"
          />
        </picture>
      </div>

      <div class="flex min-w-0 flex-1 flex-col gap-3.5">
        <p class="eyebrow text-accent">{{ about.label }}</p>

        <p
          v-for="(paragraph, index) in about.paragraphs"
          :key="index"
          class="max-w-[80ch] text-prose text-body"
        >
          {{ paragraph }}
        </p>

        <ul class="flex flex-wrap gap-2.5 pt-2.5">
          <li
            v-for="(skill, index) in about.skills"
            :key="skill"
            class="chip"
            :style="{ '--i': index }"
          >
            <SkillChip>{{ skill }}</SkillChip>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
