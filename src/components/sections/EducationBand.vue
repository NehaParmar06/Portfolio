<script setup lang="ts">
import { credentials } from '@/data/education'
</script>

<template>
  <section id="education" v-reveal class="shell border-t border-hairline-soft py-12">
    <h2 class="reveal-fade eyebrow text-accent">Education &amp; Certifications</h2>

    <ul class="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
      <li
        v-for="(item, index) in credentials"
        :key="item.title"
        v-reveal="index * 90"
        class="reveal-fade flex flex-col gap-1"
      >
        <span class="tabular text-tag text-muted">{{ item.year }}</span>
        <h3 class="text-sm font-semibold text-ink">{{ item.title }}</h3>
        <p class="text-xs text-body-dim">{{ item.institution }}</p>
        <p v-if="item.note" class="text-xs text-muted">{{ item.note }}</p>
      </li>
    </ul>
  </section>
</template>
