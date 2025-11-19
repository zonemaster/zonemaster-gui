import { resolve } from 'path';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
    envPrefix: 'PUBLIC_',
    resolve: {
        alias: {
            '@': resolve(__dirname, '../'),
            '@theme': resolve(__dirname, '../themes/default'),
        },
    },
    build: {
        lib: {
            entry: resolve(__dirname, './main.ts'),
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
