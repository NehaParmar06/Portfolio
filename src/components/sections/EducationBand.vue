<script setup lang="ts">
/**
 * Certifications and Education — two headed bands, one list markup.
 *
 * They are the same shape of content with different headings, so they share
 * a single `v-for`: two components would duplicate the markup for no gain,
 * and the duplication is what would drift. Both bands sit on the same
 * four-column grid so their columns line up vertically; the certificates
 * take two of those columns each, because a badge plus a title the length
 * of "Google UX Design Professional Certificate" does not fit in one.
 *
 * The file keeps its original name on purpose. Renaming it would leave an
 * orphaned copy in any checkout that cannot delete files, and an orphan
 * under `src/` is not harmless here: `vue-tsc` type-checks it and Tailwind
 * scans it for classes, which is how two builds of the same commit ended up
 * with different stylesheets — and a different CSP hash — earlier on.
 */
import { ExternalLink } from 'lucide-vue-next'

import { certifications, education } from '@/data/education'
import type { Credential } from '@/types/content'

interface Band {
  id: string
  label: string
  items: Credential[]
  /** Grid span for this band's items at the four-column breakpoint. */
  itemClass?: string
}

const bands: Band[] = [
  {
    id: 'certifications',
    label: 'Certifications',
    items: certifications,
    itemClass: 'lg:col-span-2',
  },
  { id: 'education', label: 'Education', items: education },
]
</script>

<template>
  <section
    v-for="(band, bandIndex) in bands"
    :id="band.id"
    :key="band.id"
    v-reveal
    class="shell"
    :class="bandIndex === 0 ? 'border-t border-hairline-soft pt-12' : 'pt-10 pb-12'"
  >
    <h2 class="reveal-fade eyebrow text-accent">{{ band.label }}</h2>

    <ul class="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
      <li
        v-for="(item, index) in band.items"
        :key="item.title"
        v-reveal="index * 90"
        class="reveal-fade flex items-start gap-4"
        :class="band.itemClass"
      >
        <!-- Decorative: the title beside it names the credential, so an alt
             here would make a screen reader announce it twice. -->
        <img
          v-if="item.badge"
          :src="item.badge"
          alt=""
          aria-hidden="true"
          width="56"
          height="48"
          loading="lazy"
          decoding="async"
          class="mt-1 h-12 w-14 shrink-0 object-contain"
        />

        <div class="flex min-w-0 flex-col gap-1">
          <span class="tabular text-tag text-muted">{{ item.year }}</span>

          <h3 class="text-sm font-semibold text-ink">
            <!-- The title is the link, so each one has a unique accessible
                 name without an aria-label; a row of identical "View
                 credential" links would not. -->
            <a
              v-if="item.href"
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
              class="sweep inline-flex items-start gap-1.5 py-0.5"
            >
              <span>{{ item.title }}</span>
              <ExternalLink
                :size="13"
                :stroke-width="2"
                class="mt-0.5 shrink-0 text-muted"
                aria-hidden="true"
              />
              <span class="sr-only">— verify on Credly, opens in a new tab</span>
            </a>
            <template v-else>{{ item.title }}</template>
          </h3>

          <p class="text-xs text-body-dim">{{ item.institution }}</p>
          <p v-if="item.note" class="text-xs text-muted">{{ item.note }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>
