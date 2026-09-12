<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { Menu, X } from 'lucide-vue-next'

import { nav, profile } from '@/data/profile'
import { resumeHref } from '@/data/contact'

/**
 * M3 — always solid, always visible. The bar never hides on scroll, so it
 * needs no scroll listener at all: no rAF loop, no layout reads, nothing
 * running while the visitor reads.
 */
const menuOpen = ref(false)
const panel = ref<HTMLElement | null>(null)
const trigger = ref<HTMLButtonElement | null>(null)

const close = () => {
  menuOpen.value = false
}

const isDownload = (href: string) => href.endsWith('.pdf')

/** Esc closes; Tab is trapped inside the open sheet. */
const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    close()
    trigger.value?.focus()
    return
  }
  if (event.key !== 'Tab' || !panel.value) return

  const focusable = panel.value.querySelectorAll<HTMLElement>('a[href]')
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (!first || !last) return

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

watch(menuOpen, async (open) => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = open ? 'hidden' : ''
  if (open) {
    document.addEventListener('keydown', onKeydown)
    await nextTick()
    panel.value?.querySelector<HTMLElement>('a[href]')?.focus()
  } else {
    document.removeEventListener('keydown', onKeydown)
  }
})

onBeforeUnmount(() => {
  if (typeof document === 'undefined') return
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-hairline-soft bg-ground">
    <div class="shell shell-bleed flex items-center justify-between py-[26px]">
      <a href="#top" class="font-display text-[1.375rem] leading-none text-accent">
        {{ profile.monogram }}
      </a>

      <nav class="hidden items-center gap-7 md:flex" aria-label="Primary">
        <a
          v-for="item in nav"
          :key="item.href"
          :href="item.href"
          :download="isDownload(item.href) ? '' : undefined"
          class="sweep text-sm text-body-dim transition-colors duration-300 hover:text-ink"
        >
          {{ item.label }}
        </a>
        <a
          :href="resumeHref"
          download
          class="rounded-pill bg-accent px-5 py-[9px] text-sm font-semibold text-on-accent transition-[filter] duration-300 hover:brightness-105"
        >
          Download résumé
        </a>
      </nav>

      <button
        ref="trigger"
        type="button"
        class="grid size-11 place-items-center text-ink md:hidden"
        :aria-expanded="menuOpen"
        aria-controls="mobile-nav"
        :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
        @click="menuOpen = !menuOpen"
      >
        <X v-if="menuOpen" :size="22" aria-hidden="true" />
        <Menu v-else :size="22" aria-hidden="true" />
      </button>
    </div>

    <!-- M13 · fade and scale, links staggering in behind it. -->
    <div
      v-if="menuOpen"
      id="mobile-nav"
      ref="panel"
      class="menu-panel border-t border-hairline bg-ground md:hidden"
    >
      <nav class="shell shell-bleed flex flex-col py-3" aria-label="Primary, mobile">
        <a
          v-for="(item, index) in nav"
          :key="item.href"
          :href="item.href"
          :download="isDownload(item.href) ? '' : undefined"
          class="border-b border-hairline-soft py-3.5 text-lead text-ink last:border-0"
          :style="{ '--i': index }"
          @click="close"
        >
          {{ item.label }}
        </a>
      </nav>
    </div>
  </header>
</template>
