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
import { resolve } from 'path';

// https://astro.build/config
export default defineConfig({
    output: process.env.NODE_ENV === 'development' ? 'server' : 'static',

    outDir: './public',
    publicDir: './static',

    i18n: {
        locales: ['da', 'en', 'es', 'fi', 'fr', 'nb', 'sv'],
        defaultLocale: 'en'
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

    adapter: node({
        mode: 'standalone'
    })
});
