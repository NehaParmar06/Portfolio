<script setup lang="ts">
import { ref } from 'vue'

import CaseStudyCard from '@/components/ui/CaseStudyCard.vue'
import { caseStudies } from '@/data/case-studies'

/**
 * One card open at a time. Clicking the open card closes it, so the
 * section can always return to the state the comp shows.
 */
const openId = ref<string | null>(null)

const toggle = (id: string) => {
  openId.value = openId.value === id ? null : id
}
</script>

<template>
  <section id="work" class="shell pb-16">
    <h2 v-reveal class="reveal-fade font-display text-h2 text-ink">Selected work</h2>

    <div class="mt-6 flex flex-col gap-5">
      <!-- M6 · each card reveals as it arrives, 110ms behind the one above. -->
      <CaseStudyCard
        v-for="(study, index) in caseStudies"
        :key="study.id"
        v-reveal="index * 110"
        :study="study"
        :expanded="openId === study.id"
        @toggle="toggle"
      />
    </div>
  </section>
</template>
