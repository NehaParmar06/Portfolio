<script setup lang="ts">
import { stats } from '@/data/profile'
</script>

<template>
  <!-- The comp builds the dividers from a 1px gap over a Merino-10% ground,
       so the rules between cells are the background showing through. -->
  <section
    v-reveal
    aria-label="By the numbers"
    class="grid grid-cols-2 gap-px border-y border-hairline-soft bg-hairline-soft md:grid-cols-4"
  >
    <div
      v-for="(stat, index) in stats"
      :key="stat.label"
      class="flex flex-col gap-1.5 bg-ground px-5 py-7 md:px-8"
      :style="{ '--delay': `${index * 90}ms` }"
    >
      <!-- M4 · odometer roll: the figure rises into its own clipped box. -->
      <p class="odometer tabular font-display text-[2.375rem] leading-none text-accent">
        <span>{{ stat.value }}</span>
      </p>
      <p class="text-xs text-muted">{{ stat.label }}</p>
    </div>
  </section>
</template>
