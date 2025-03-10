<script>
  import { location } from "@/lib/router.svelte.js";
  import {getTestResults} from "@/lib/client.js";
  import ResultInfo from "@/lib/components/DomainTest/ResultInfo.svelte";

  let id = $derived.by(() => {
    const match = location.pathname.match(/\/result\/([^/]+)/);
    return match ? match[1] : null;
  });

  let loading = $state(true);
  let result = $state(null);

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
  <ResultInfo data={result} />
{/if}
