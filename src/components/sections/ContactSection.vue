<script setup lang="ts">
import { computed } from 'vue'

import SocialIconLink from '@/components/ui/SocialIconLink.vue'
import { contact, emailAddress, emailHref } from '@/data/contact'

const email = computed(() => emailAddress())
const href = computed(() => emailHref())
</script>

<template>
  <section id="contact" v-reveal class="shell py-12">
    <div
      class="contact-panel contact-content flex flex-col justify-between gap-10 rounded-card bg-accent px-8 py-10 md:flex-row md:items-center md:px-13 md:py-12"
    >
      <div class="flex flex-col gap-2.5" style="--i: 0">
        <h2 class="font-display text-h3 text-on-accent sm:text-h1">{{ contact.heading }}</h2>
        <p class="max-w-[65ch] text-prose text-on-accent">{{ contact.body }}</p>
      </div>

      <div class="flex shrink-0 flex-col items-start gap-5 md:items-end" style="--i: 1">
        <!-- The address is the invitation, so it is set as text rather than
             hidden behind an icon. `break-all` keeps it inside the panel at
             320px instead of pushing the layout sideways. -->
        <a
          :href="href"
          class="sweep text-card font-semibold break-all text-on-accent"
          :aria-label="`Email Neha at ${email}`"
        >
          {{ email }}
        </a>

        <ul class="flex gap-3">
          <li v-for="link in contact.links" :key="link.kind">
            <SocialIconLink :kind="link.kind" :label="link.label" :href="link.href" />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
