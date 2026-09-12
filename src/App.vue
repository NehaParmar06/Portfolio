<script setup lang="ts">
import SiteFooter from '@/components/layout/SiteFooter.vue'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import SelectedWork from '@/components/sections/SelectedWork.vue'
import StatBand from '@/components/sections/StatBand.vue'
</script>

<template>
  <a
    href="#main"
    class="sr-only rounded-pill bg-accent px-4 py-2 text-sm font-semibold text-on-accent focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100"
  >
    Skip to content
  </a>

  <SiteHeader />

  <main id="main">
    <HeroSection />
    <StatBand />
    <ExperienceSection />
    <SelectedWork />
    <AboutSection />
    <ContactSection />
  </main>

  <SiteFooter />
</template>
