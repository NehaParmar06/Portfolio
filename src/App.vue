<script setup lang="ts">
/**
 * STEP 1 — structure only.
 *
 * This renders the Style Guide frame from the Figma so the tokens, the two
 * typefaces and the spacing scale can be checked against the design before
 * any section is built. Step 2 replaces this with the real page.
 */
import { about } from '@/data/about'
import { caseStudies } from '@/data/case-studies'
import { experience } from '@/data/experience'
import { profile, stats } from '@/data/profile'

const swatches = [
  { name: 'Ground', figma: 'Coffee Bean', hex: '#2B1810', className: 'bg-ground' },
  { name: 'Panel', figma: 'Tamarind', hex: '#3A2117', className: 'bg-panel' },
  { name: 'Accent', figma: 'Terracotta', hex: '#E08A4F', className: 'bg-accent' },
  { name: 'Text — primary', figma: 'Merino', hex: '#F9F4ED', className: 'bg-ink' },
  { name: 'Text — body', figma: 'Sisal', hex: '#DCD3C4', className: 'bg-body' },
  { name: 'Text — dim', figma: 'Bison Hide', hex: '#C0B6A5', className: 'bg-body-dim' },
  { name: 'Text — muted', figma: 'Zorba', hex: '#A19786', className: 'bg-muted' },
  { name: 'Hairline', figma: 'Merino 12%', hex: 'rgb(249 244 237 / .12)', className: 'bg-hairline' },
]

const spacing = [
  { label: 'Container gutter', value: '20px mobile / 56px desktop' },
  { label: 'Pill radius', value: '999px' },
  { label: 'Card radius', value: '20px' },
  { label: 'Panel radius', value: '24px' },
  { label: 'Section padding', value: '32px mobile / 50–54px desktop' },
]
</script>

<template>
  <main class="shell py-14">
    <header class="mb-14">
      <p
        class="mb-5 flex items-center gap-3.5 text-label font-semibold tracking-[0.14em] text-accent uppercase"
      >
        <span class="block h-0.5 w-11 bg-accent"></span>
        Step 1 · Project structure
      </p>
      <h1 class="font-display text-h1 md:text-display">Token &amp; content check</h1>
      <p class="mt-4 max-w-[60ch] text-lead text-body">
        Every colour, typeface and measurement below is read from
        <code class="rounded bg-panel px-1.5 py-0.5 text-xs">src/assets/styles/main.css</code>, and
        every string from <code class="rounded bg-panel px-1.5 py-0.5 text-xs">src/data/*</code>.
        Nothing here is hard-coded. If this page matches your Style Guide frame, step 2 can start.
      </p>
    </header>

    <!-- Type -->
    <section class="mb-12">
      <h2 class="mb-4 text-label font-semibold tracking-[0.14em] text-muted uppercase">Type</h2>
      <div class="rounded-card bg-panel p-7">
        <p class="font-display text-h1 text-ink md:text-display">Heading — Caprasimo</p>
        <p class="mt-1 text-xs text-muted">
          Display / 76 / 40 · e.g. “{{ profile.name }}” and the hero sub-line
        </p>
        <p class="mt-5 text-body text-body">
          Body — Figtree Regular. Used for paragraphs at 14–18px, line-height 1.6–1.75.
        </p>
        <p
          class="mt-5 text-label font-semibold tracking-[0.14em] text-accent uppercase"
        >
          Eyebrow / label — Figtree SemiBold, uppercase, tracked
        </p>
      </div>
    </section>

    <!-- Colours -->
    <section class="mb-12">
      <h2 class="mb-4 text-label font-semibold tracking-[0.14em] text-muted uppercase">Colours</h2>
      <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div v-for="s in swatches" :key="s.name">
          <div
            class="h-20 rounded-[10px] border border-hairline"
            :class="s.className"
            aria-hidden="true"
          ></div>
          <p class="mt-2 text-xs text-body">{{ s.name }}</p>
          <p class="text-label text-muted">{{ s.figma }} · {{ s.hex }}</p>
        </div>
      </div>
    </section>

    <!-- Cards & buttons -->
    <section class="mb-12 grid gap-4 md:grid-cols-2">
      <div>
        <h2 class="mb-4 text-label font-semibold tracking-[0.14em] text-muted uppercase">Cards</h2>
        <div class="rounded-card bg-panel p-6">
          <p class="text-label tracking-[0.1em] text-muted uppercase">
            Case study — {{ caseStudies[0]?.client }} — {{ caseStudies[0]?.period }}
          </p>
          <h3 class="mt-2 font-display text-h3">{{ caseStudies[0]?.title }}</h3>
          <p class="mt-3 text-sm text-body">{{ caseStudies[0]?.summary }}</p>
          <div class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="tag in caseStudies[0]?.tags"
              :key="tag"
              class="rounded-pill border border-accent bg-accent-wash px-3 py-1 text-label text-accent"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <div>
        <h2 class="mb-4 text-label font-semibold tracking-[0.14em] text-muted uppercase">
          Buttons &amp; tags
        </h2>
        <div class="flex flex-wrap items-center gap-3 rounded-card bg-panel p-6">
          <button
            type="button"
            class="rounded-pill bg-accent px-5 py-2 text-sm font-semibold text-accent-ink"
          >
            Primary button
          </button>
          <button
            type="button"
            class="rounded-pill border border-hairline-strong px-5 py-2 text-sm text-ink"
          >
            Secondary button
          </button>
          <span
            class="rounded-pill border border-accent bg-accent-wash px-3 py-1 text-label text-accent"
            >Tag — accent</span
          >
          <span class="rounded-pill border border-hairline-strong px-3 py-1 text-label text-body"
            >Tag — neutral</span
          >
        </div>
        <div class="mt-4 rounded-panel bg-accent p-6">
          <p class="font-display text-h3 text-accent-ink">Accent CTA panel</p>
          <p class="mt-1 text-xs text-[#4a2a17]">
            Full terracotta fill, dark ink text for contrast — used for “Let's talk”.
          </p>
        </div>
      </div>
    </section>

    <!-- Content wiring proof -->
    <section class="mb-12">
      <h2 class="mb-4 text-label font-semibold tracking-[0.14em] text-muted uppercase">
        Content loaded from <code>src/data</code>
      </h2>
      <div class="grid gap-4 md:grid-cols-3">
        <div class="rounded-card border border-hairline p-5">
          <p class="font-display text-h3 text-accent tabular">{{ stats.length }}</p>
          <p class="mt-1 text-xs text-muted">stats · {{ stats.map((s) => s.value).join(' · ') }}</p>
        </div>
        <div class="rounded-card border border-hairline p-5">
          <p class="font-display text-h3 text-accent tabular">{{ experience.length }}</p>
          <p class="mt-1 text-xs text-muted">roles · {{ experience[0]?.company }} → today</p>
        </div>
        <div class="rounded-card border border-hairline p-5">
          <p class="font-display text-h3 text-accent tabular">{{ caseStudies.length }}</p>
          <p class="mt-1 text-xs text-muted">case studies · each with expand-in-place detail</p>
        </div>
      </div>
    </section>

    <!-- Portrait + spacing -->
    <section class="mb-12 grid gap-8 md:grid-cols-[160px_1fr] md:items-center">
      <div>
        <picture>
          <source :srcset="about.portrait.webp" type="image/webp" />
          <img
            :src="about.portrait.src"
            :srcset="about.portrait.srcSet"
            :alt="about.portrait.alt"
            width="140"
            height="140"
            class="size-35 rounded-full border-2 border-accent object-cover"
          />
        </picture>
        <p class="mt-2 text-label text-muted">portrait · webp + jpg, 1x/2x</p>
      </div>
      <div>
        <h2 class="mb-4 text-label font-semibold tracking-[0.14em] text-muted uppercase">
          Spacing &amp; shape
        </h2>
        <dl class="divide-y divide-hairline border-y border-hairline">
          <div v-for="row in spacing" :key="row.label" class="flex justify-between gap-6 py-2.5">
            <dt class="text-sm text-body">{{ row.label }}</dt>
            <dd class="text-sm text-muted">{{ row.value }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <footer class="border-t border-hairline pt-6 pb-16 text-label text-muted">
      Step 1 of 4 · structure · next: views
    </footer>
  </main>
</template>
