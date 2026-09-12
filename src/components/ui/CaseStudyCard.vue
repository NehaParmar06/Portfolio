<script setup lang="ts">
import { computed } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

import TagChip from '@/components/ui/TagChip.vue'
import type { CaseStudy } from '@/types/content'

const props = defineProps<{ study: CaseStudy; expanded: boolean }>()
const emit = defineEmits<{ toggle: [id: string] }>()

const panelId = computed(() => `case-${props.study.id}-detail`)
const buttonId = computed(() => `case-${props.study.id}-toggle`)

const detailRows = computed(() => [
  { label: 'The problem', text: props.study.detail.problem },
  { label: 'What I built', text: props.study.detail.approach },
  { label: 'Outcome', text: props.study.detail.outcome },
])
</script>

<template>
  <article
    :id="study.id"
    class="case-card reveal-fade relative overflow-hidden rounded-card border border-hairline-soft bg-panel hover:border-accent/60"
  >
    <div class="flex flex-col gap-4 px-6 py-8 md:px-12 md:py-11">
      <!-- Disclosure: the heading wraps the control (ARIA APG accordion), so
           the five case studies still appear in the document outline. The
           chevron points down because the card expands — it does not navigate. -->
      <h3>
        <button
          :id="buttonId"
          type="button"
          class="flex w-full flex-col items-start gap-3 text-left"
          :aria-expanded="expanded"
          :aria-controls="panelId"
          @click="emit('toggle', study.id)"
        >
          <span class="kicker text-accent">
            Case study — {{ study.client }} — {{ study.period }}
          </span>
          <span class="flex w-full items-start justify-between gap-6">
            <span class="font-display text-[1.375rem] text-ink sm:text-h3">
              {{ study.title }}
            </span>
            <ChevronDown
              :size="24"
              class="case-chevron mt-1 shrink-0 text-accent"
              :class="expanded && 'rotate-180'"
              aria-hidden="true"
            />
          </span>
        </button>
      </h3>

      <p class="text-card text-body-dim">{{ study.summary }}</p>

      <ul class="flex flex-wrap gap-2 pt-1">
        <li
          v-for="(tag, index) in study.tags"
          :key="tag.label"
          class="chip"
          :style="{ '--i': index }"
        >
          <TagChip :tone="tag.tone">{{ tag.label }}</TagChip>
        </li>
      </ul>
    </div>

    <div v-show="expanded" :id="panelId" role="region" :aria-labelledby="buttonId">
      <dl class="flex flex-col gap-6 border-t border-hairline-soft px-6 py-8 md:px-12 md:py-10">
        <div v-for="row in detailRows" :key="row.label" class="flex flex-col gap-1.5">
          <dt class="kicker text-muted">{{ row.label }}</dt>
          <dd class="max-w-[70ch] text-card text-body">{{ row.text }}</dd>
        </div>
      </dl>
    </div>
  </article>
</template>
