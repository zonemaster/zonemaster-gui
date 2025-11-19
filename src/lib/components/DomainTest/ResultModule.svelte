<script lang="ts">
    import Stack from '@/lib/components/Stack/Stack.svelte';
    import niceName from '@/lib/niceName.ts';
    import Badge from '@/lib/components/Badge/Badge.svelte';
    import ResultGroup from '@/lib/components/DomainTest/ResultGroup.svelte';
    import {
        expandedModules,
        toggleModule,
    } from '@/lib/components/DomainTest/store.svelte.ts';
    import { resultIcon } from '@/lib/resultIcon.ts';
    import type { Module, ModuleBadge } from '@/types.ts';

    type Props = {
        data: Module;
        summary: ModuleBadge[];
        descriptions: Record<string, string>;
    };

    const { data, descriptions, summary }: Props = $props();
    const module = data.name;
    let open: boolean = $derived(expandedModules[module] || false);
</script>

<section class="zm-result__module" id="zmModule-{module}">
    <h3 class="zm-result__module__title">
        <button onclick={() => toggleModule(module)}>
            <i class="bi bi-caret-{open ? 'up' : 'down'}-fill"></i>
            <span>{niceName(module)}</span>

            {#each summary as { level, count }}
                <Badge {level} round>
                    <i class="bi bi-{resultIcon(level)}"></i>
                    {count}
                </Badge>
            {/each}
        </button>
    </h3>
    {#if open}
        <div class="zm-result__module__data" id={`zmModule-${module}-content`}>
            <Stack vertical gap="s">
                {#each Object.entries(data.testcasesMap) as [testcase, d]}
                    <ResultGroup {testcase} data={d} {descriptions} />
                {/each}
            </Stack>
        </div>
    {/if}
</section>
