<script>
  import Stack from "@/lib/components/Stack/Stack.svelte";
  import Button from "@/lib/components/Button/Button.svelte";
  import FilterToggle from "@/lib/components/FilterToggle/FilterToggle.svelte";
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
    getTestResults(id)
      .then((data) => {
        result = data;
      })
      .finally(() => {
        loading = false;
      });
  });
</script>
{#if loading}
  Loading result...
{/if}
{#if result}
  <ResultInfo data={result} />
{/if}
