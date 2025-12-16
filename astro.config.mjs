// @ts-check
import { defineConfig } from 'astro/config';
import remarkGfm from 'remark-gfm';
import {
    remarkDefinitionList,
    defListHastHandlers,
} from "remark-definition-list";
import svelte from '@astrojs/svelte';
import node from '@astrojs/node';
import config from './src/config.js';
import messagesPlugin, { messagesIntegration } from './scripts/messages-plugin.ts';

// https://astro.build/config
export default defineConfig({
    base: config.baseUrl,
    trailingSlash: "always",
    output: process.env.NODE_ENV === 'production' ? 'static' : 'server',

    outDir: './public/dist',
    publicDir: './static',

    i18n: {
        locales: config.enabledLanguages,
        defaultLocale: config.defaultLanguage,
        routing: {
            prefixDefaultLocale: true
        },
    },

    markdown: {
        remarkPlugins: [remarkGfm, remarkDefinitionList],
        remarkRehype: { handlers: defListHastHandlers },
    },

    integrations: [
        svelte({
            compilerOptions: {
                customElement: true
            }
        }),
        messagesIntegration()
    ],

    vite: {
        plugins: [messagesPlugin({
            defaultLanguage: config.defaultLanguage,
            enabledLanguages: config.enabledLanguages,
        })],
    },

    adapter: process.env.NODE_ENV === 'production' ? undefined : node({
        mode: 'standalone'
    }),
});
