import { resolve } from 'path';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
    envPrefix: 'PUBLIC_',
    resolve: {
        alias: {
            '@': resolve(import.meta.dirname, '../'),
            '@theme': resolve(import.meta.dirname, '../themes/default'),
        },
    },
    build: {
        lib: {
            entry: resolve(import.meta.dirname, './main.ts'),
            name: 'Zonemaster',
            // the proper extensions will be added
            fileName: 'zonemaster',
        },
    },
    plugins: [
        svelte({
            compilerOptions: {
                customElement: true,
            },
        }),
    ],
});
