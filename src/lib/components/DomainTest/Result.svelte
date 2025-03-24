<script lang="ts">
  import { location } from "@/lib/router.svelte.js";
  import { getTestResults, type ResultData } from '@/lib/client.js';
  import ResultInfo from "@/lib/components/DomainTest/ResultInfo.svelte";
  import type { FaqItem } from '@/content.config.ts';

  type Props = {
      aboutLevels: FaqItem | null;
  };

  const { aboutLevels }: Props = $props();

  let id = $derived.by(() => {
    const match = location.pathname.match(/\/result\/([^/]+)/);
    return match ? match[1] : null;
  });

  let loading = $state(true);
  let result: ResultData | null = $state(null);

  $effect(() => {
    if (!id) return;

    getTestResults(id)
      .then((data) => {
        result = data;
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
  <ResultInfo aboutLevels={aboutLevels} data={result} />
{/if}
