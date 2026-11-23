<script lang="ts">
    import { onMount } from 'svelte';
    import { getTestResults, type ResultData } from '@/lib/client.js';
    import ResultInfo from '@/lib/components/DomainTest/ResultInfo.svelte';
    import type { FaqItem } from '@/content.config.ts';
    import config from '@/config.ts';

    type Props = {
        aboutLevels: FaqItem | null;
    };

    const { aboutLevels }: Props = $props();

    let id = $state<string | null>(null);

    let loading = $state(true);
    let result: ResultData | null = $state(null);

    onMount(() => {
        const match = window.location.pathname.match(/\/result\/([^/]+)/);
        id = match ? match[1] : null;

        if (!id) {
            loading = false;
            return;
        }

        getTestResults(id)
            .then((data) => {
                result = data;

                document.title = config.setTitle(data.params.domain);
            })
            .finally(() => {
                loading = false;
            });
    });
</script>
{#if id && loading}
    Loading result...
{/if}
{#if id && result}
    {#key id}
        <ResultInfo {aboutLevels} data={result} />
    {/key}
{/if}
