// @ts-check
import { defineConfig } from 'astro/config';
import paraglide from '@inlang/paraglide-astro';
import remarkGfm from 'remark-gfm';
import {
    remarkDefinitionList,
    defListHastHandlers,
} from "remark-definition-list";
import svelte from '@astrojs/svelte';
import node from '@astrojs/node';
import config from './src/config.js';

// https://astro.build/config
export default defineConfig({
    output: process.env.NODE_ENV === 'production' ? 'static' : 'server',

    outDir: './public',
    publicDir: './static',

    i18n: {
        locales: config.enabledLanguages,
        defaultLocale: config.defaultLanguage,
    },

    markdown: {
        remarkPlugins: [remarkGfm, remarkDefinitionList],
        remarkRehype: { handlers: defListHastHandlers },
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
    ],

    adapter: process.env.NODE_ENV === 'production' ? undefined : node({
        mode: 'standalone'
    }),
});
