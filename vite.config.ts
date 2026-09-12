import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // Keeps a stale index.html from ever requesting a chunk that no longer exists.
    assetsInlineLimit: 2048,
    sourcemap: false,
    rollupOptions: {
      output: {
        // Keep GSAP in its own chunk so the app shell can update without
        // busting the animation library's cache entry.
        manualChunks: (id) => (id.includes('node_modules/gsap') ? 'gsap' : undefined),
      },
    },
  },
})
