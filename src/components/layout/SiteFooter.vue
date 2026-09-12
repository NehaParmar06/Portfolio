<script setup lang="ts">
import { profile } from '@/data/profile'
</script>

<template>
  <footer class="border-t border-hairline-soft">
    <div
      class="shell flex flex-wrap items-center justify-between gap-2 py-6 text-xs text-muted"
    >
      <span>© {{ profile.copyrightYear }} {{ profile.name }}</span>
      <span>{{ profile.tagline }}</span>
    </div>
  </footer>
</template>
