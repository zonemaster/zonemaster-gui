// @ts-check
import { defineConfig } from 'astro/config';
import paraglide from '@inlang/paraglide-astro';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  outDir: './public',
  publicDir: './static',
  i18n: {
    locales: ['da', 'en', 'es', 'fi', 'fr', 'nb', 'sv'],
    defaultLocale: 'en'
  },
  integrations: [
    paraglide({
      // recommended settings
      project: './project.inlang',
      outdir: './src/paraglide'
    }),
    svelte({
      compilerOptions: {
        customElement: true
      }
    })
  ]
});
