<script setup lang="ts">
import { experience } from '@/data/experience'
</script>

<template>
  <section id="experience" class="shell py-16">
    <h2 v-reveal class="reveal-fade font-display text-h3 text-ink">Work Experience</h2>

    <ol class="mt-7 flex flex-col gap-6">
      <!-- M5 · the spine draws down, then the row copy follows. -->
      <li
        v-for="(role, index) in experience"
        :key="role.period"
        v-reveal="180 + index * 110"
        class="reveal-fade flex flex-col gap-2 sm:flex-row sm:gap-6"
      >
        <span class="tabular shrink-0 pt-0.5 text-tag text-muted sm:w-[9.375rem]">
          {{ role.period }}
        </span>
        <div class="relative flex min-w-0 flex-1 flex-col gap-1.5 pl-[22px]">
          <span class="spine absolute inset-y-0 left-0 w-0.5 bg-accent" aria-hidden="true"></span>
          <h3 class="text-body font-semibold text-ink">
            {{ role.title }} — {{ role.company }}
          </h3>
          <p class="text-sm text-body-dim">{{ role.summary }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>
