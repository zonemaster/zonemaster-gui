<script lang="ts">
    import niceName from '@/lib/niceName.ts';
    import Badge from '@/lib/components/Badge/Badge.svelte';
    import type { Testcase } from '@/types.ts';

    type Props = {
        testcase: string;
        data?: Testcase;
        descriptions: Record<string, string>;
    };

    const { testcase, data, descriptions }: Props = $props();
    let open = $state(testcase === 'Unspecified');
    const level = data?.entries?.[0]?.level || 'INFO';
</script>

<section class="zm-result__group zm-result__group--{level.toLowerCase()}">
    {#if testcase !== 'Unspecified' && testcase in descriptions}
        <header>
            <h4 class="zm-result__group__title">
                <button
                    onclick={() => (open = !open)}
                    class="zm-result__group__button"
                >
                    <i class="bi bi-{open ? 'dash' : 'plus'}-square-fill"></i>
                    {descriptions[testcase]}
                </button>
                {#if data && open}
                    <Badge size="small" border={true}>
                        <i class="bi bi-exclamation-circle-fill"></i>
                        {niceName(testcase)}
                    </Badge>
                {/if}
            </h4>
        </header>
    {/if}
    {#if data && open}
        <div class="zm-result-entries" id="testcase-entries-{testcase}">
            <ul>
                {#each data.entries as result}
                    <li>
                        <div>
                            <Badge level={result.level}>
                                {niceName(result.level)}
                            </Badge>
                        </div>
                        <p>{result.message}</p>
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</section>
