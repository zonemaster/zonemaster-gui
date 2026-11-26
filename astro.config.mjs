// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import {
    remarkDefinitionList,
    defListHastHandlers,
} from "remark-definition-list";
import svelte from '@astrojs/svelte';
import node from '@astrojs/node';
import config from './src/config.js';
import messagesPlugin from './scripts/messages-plugin.ts';

// https://astro.build/config
export default defineConfig({
    base: config.baseUrl,
    trailingSlash: "always",
    compressHTML: true,
    output: process.env.NODE_ENV === 'production' ? 'static' : 'server',

    outDir: './public/dist',
    publicDir: './static',

    i18n: {
        locales: config.enabledLanguages,
        defaultLocale: config.defaultLanguage,
        routing: {
            prefixDefaultLocale: true,
            redirectToDefaultLocale: true,
        },
    },

    markdown: {
        processor: unified({
            remarkPlugins: [remarkDefinitionList],
            remarkRehype: { handlers: defListHastHandlers },
        }),
    },

    integrations: [
        svelte({
            compilerOptions: {
                customElement: true
            }
        }),
    ],

    vite: {
        define: {
            'import.meta.env.ZONEMASTER_SITE': true,
        },
        plugins: [messagesPlugin({
            defaultLanguage: config.defaultLanguage,
            enabledLanguages: config.enabledLanguages,
        })],
    },

    adapter: process.env.NODE_ENV === 'production' ? undefined : node({
        mode: 'standalone'
    }),
});
