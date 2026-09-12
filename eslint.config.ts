import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'

export default defineConfigWithVueTs(
  { name: 'app/files', files: ['**/*.{ts,mts,mjs,tsx,vue}'] },
  { name: 'app/ignores', ignores: ['dist/**', 'coverage/**', 'node_modules/**'] },

  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],

  // Accessibility is a build-time concern here, not only a review one:
  // these rules fail the build rather than waiting for an audit to notice.
  ...pluginVueA11y.configs['flat/recommended'],

  vueTsConfigs.recommendedTypeChecked,
  skipFormatting,

  {
    name: 'app/rules',
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always'],
    },
  },
  {
    // Build and audit scripts run in Node and are allowed to talk to the
    // console — that is their entire output.
    name: 'app/node-scripts',
    files: ['scripts/**', 'eslint.config.ts', 'vite.config.ts'],
    languageOptions: { globals: { process: 'readonly', console: 'readonly' } },
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
    },
  },
)
