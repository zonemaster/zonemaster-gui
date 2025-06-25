<script lang="ts">
    import type { ResultDataResult } from '@/lib/client.ts';
    import niceName from '@/lib/niceName.ts';
    import Badge from '@/lib/components/Badge/Badge.svelte';

    type Props = {
        testcase: string;
        results?: ResultDataResult[];
        descriptions: Record<string, string>;
    };

    const { testcase, results, descriptions }: Props = $props();
    let open = $state(testcase === 'UNSPECIFIED');
    const level = results?.[0]?.level || 'INFO';
</script>
<section class="zm-result__group zm-result__group--{level.toLowerCase()}">
    {#if testcase !== 'UNSPECIFIED' && testcase in descriptions}
        <header>
            <h4>
                <button onclick={() => open = !open} class="zm-result__group__button">
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
