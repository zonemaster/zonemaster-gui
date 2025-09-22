<script lang="ts">
    import type { ResultDataResult, ResultLevel } from '@/lib/client.ts';
    import Stack from '@/lib/components/Stack/Stack.svelte';
    import niceName from '@/lib/niceName.ts';
    import Badge from '@/lib/components/Badge/Badge.svelte';
    import ResultGroup from '@/lib/components/DomainTest/ResultGroup.svelte';
    import {
        expandedModules,
        toggleModule,
    } from '@/lib/components/DomainTest/store.svelte.ts';
    import { resultIcon } from '@/lib/resultIcon.ts';

    type Props = {
        module: string;
        results: ResultDataResult[];
        descriptions: Record<string, string>;
    };

    const { module, results, descriptions }: Props = $props();
    const summary = Object.entries(
        Object.groupBy(results, ({ level }) => level as ResultLevel),
    ).map(([level, results]) => ({
        level: level as ResultLevel,
        count: Object.keys(Object.groupBy(results, ({ testcase }) => testcase))
            .length,
    }));
    const grouped: Partial<Record<string, ResultDataResult[]>> = Object.groupBy(
        results,
        ({ testcase }) => testcase,
    );
    let open: boolean = $derived(expandedModules[module] || false);
</script>

<section class="zm-result__module" id="zmModule-{module}">
    <h3 class="zm-result__module__title">
        <button onclick={() => toggleModule(module)}>
            <i class="bi bi-caret-{open ? 'up' : 'down'}-fill"></i>
            <span>{niceName(module)}</span>

            {#each summary as { level, count }, i}
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
                {#each Object.entries(grouped) as [testcase, results]}
                    <ResultGroup {testcase} {results} {descriptions} />
                {/each}
            </Stack>
        </div>
    {/if}
</section>
