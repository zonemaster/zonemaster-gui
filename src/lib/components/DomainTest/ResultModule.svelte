<script lang="ts">
  import type {ResultData, ResultDataResult} from "@/lib/client.ts";

  type Props = {
    module: string;
    results: ResultDataResult[];
  };

  const { module, results }: Props = $props();
  const summary = Object.entries(
    Object.groupBy(results, ({ level }) => level)
  ).map(([level, results]) => ({ level, count: results.length }));
</script>
<section class="zm-result">
  <h3>
    {module}

    {#each summary as { level, count }, i}
      <span class="zm-badge {level.toLowerCase()}">{count}</span>
    {/each}
  </h3>
</section>
<style>
  h3 {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
  }

  .zm-badge {
    background: var(--color-muted);
    color: var(--color-palette-white);
    font-size: var(--font-xs);
    font-weight: bold;
    border-radius: 999px;
    padding: var(--spacing-xxs) var(--spacing-xs);

    &.info {
      background: var(--color-palette-success-50);
    }

    &.notice {
      background: var(--color-palette-info-50);
    }

    &.warning {
      background: var(--color-palette-warning-50);
    }

    &.error, &.critical {
      background: var(--color-palette-error-50);
    }
  }
</style>
