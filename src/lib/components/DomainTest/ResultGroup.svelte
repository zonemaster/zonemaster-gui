<script lang="ts">
  import type { ResultDataResult } from "@/lib/client.ts";
  import niceName from "@/lib/niceName.ts";
  import Badge from "@/lib/components/Badge/Badge.svelte";

  type Props = {
    testcase: string;
    results?: ResultDataResult[];
    descriptions: Record<string, string>;
  };

  const { testcase, results, descriptions }: Props = $props();
  let open = $state(testcase === 'UNSPECIFIED');
  const level = results?.[0]?.level || 'INFO';
</script>
<section class="zm-result-group">
  {#if testcase !== 'UNSPECIFIED' && testcase in descriptions}
    <header>
      <h4>
        <button onclick={() => open = !open} class={level.toLowerCase()}>
          <i class="bi bi-{open ? 'dash' : 'plus'}-square-fill"></i>
          {descriptions[testcase]}
        </button>
      </h4>
    </header>
  {/if}
  {#if results && open}
    <div class="zm-result-entries" id="testcase-entries-{testcase}">
      <ul>
        {#each results as result}
          <li>
            <div>
              <Badge level={result.level}>{niceName(result.level)}</Badge>
            </div>
            <p>{result.message}</p>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</section>
<style>
  .zm-result-group {
     h4 {
       margin-bottom: 0;
     }
  }
  .zm-result-group header + div {
    margin-top: var(--spacing-s);
  }

  button {
    all: unset;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: var(--spacing-s);
    white-space: nowrap;
    font-size: calc(var(--font-xs) * 1.15);
    color: var(--color-palette-black);

    &:hover, &:focus {
      text-decoration: underline;
    }

    i {
      font-size: var(--font-s);
      color: var(--color-palette-success-70);
    }

    &.notice {
        i {
            color: var(--color-palette-info-70);
        }
    }

    &.warning {
      i {
        color: var(--color-palette-warning-60);
      }
    }

    &.error {
      i {
          color: var(--color-palette-error-70);
      }
    }

     &.error, &.critical {
       i {
          color: var(--color-palette-error-70);
       }
     }
  }

  ul {
    list-style: none;

    > li {
      display: flex;
      gap: var(--spacing-xs);
    }
  }

  p {
      margin-bottom: 0;
  }
</style>
