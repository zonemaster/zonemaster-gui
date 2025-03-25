<script lang="ts">
  import type {ResultDataResult, ResultLevel} from "@/lib/client.ts";
  import Stack from "@/lib/components/Stack/Stack.svelte";
  import niceName from "@/lib/niceName.ts";
  import Badge from "@/lib/components/Badge/Badge.svelte";
  import ResultGroup from "@/lib/components/DomainTest/ResultGroup.svelte";
  import {expandedModules, toggleModule} from "@/lib/components/DomainTest/store.svelte.ts";

  type Props = {
    module: string;
    results: ResultDataResult[];
    descriptions: Record<string, string>;
  };

  const { module, results, descriptions }: Props = $props();
  const summary = Object.entries(
    Object.groupBy(results, ({ level }) => level as ResultLevel)
  ).map(([level, results]) => ({ level: level as ResultLevel, count: results.length }));
  const grouped: Partial<Record<string, ResultDataResult[]>> = Object.groupBy(results, ({ testcase }) => testcase);
  let open: boolean = $derived(expandedModules[module] || false);
</script>
<section class="zm-result">
  <h3>
    <button onclick={() => toggleModule(module)}>
      <i class="bi bi-caret-{open ? 'up' : 'down'}-fill"></i>
      {niceName(module)}

      {#each summary as { level, count }, i}
        <Badge level={level} round>{count}</Badge>
      {/each}
    </button>
  </h3>
  {#if open}
  <div class="zm-result-data" id={`module-${module}`}>
    <Stack vertical gap="s">
      {#each Object.entries(grouped) as [testcase, results]}
        <ResultGroup testcase={testcase} results={results} descriptions={descriptions} />
      {/each}
    </Stack>
  </div>
  {/if}
</section>
<style>
  h3 button {
    all: unset;
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    cursor: pointer;
  }

  .zm-result {
    background: var(--color-palette-black-10);
    padding: var(--spacing-s);
    border-radius: var(--border-radius);

      h3 {
          margin-bottom: 0;
      }
  }

  .zm-result-data {
    margin-top: var(--spacing-s);
  }
</style>
