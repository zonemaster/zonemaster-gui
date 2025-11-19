import type { ResultLevel } from '@/lib/client.ts';

export let expandedModules: Record<string, boolean> = $state({});
export let filter: {
    levels: Record<ResultLevel | 'ALL', boolean>;
    query: string;
} = $state({
    levels: {
        ALL: true,
        INFO: false,
        NOTICE: false,
        WARNING: false,
        ERROR: false,
        CRITICAL: false,
    },
    query: '',
});

export function toggleModule(module: string) {
    expandedModules[module] = !expandedModules[module];
}

export function expandAll(modules: string[]) {
    modules.forEach((module) => {
        expandedModules[module] = true;
    });
}

export function collapseAll(modules: string[]) {
    modules.forEach((module) => {
        expandedModules[module] = false;
    });
}
