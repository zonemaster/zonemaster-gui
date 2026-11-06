<script lang="ts">
    import * as m from '@/messages';
    import { getLocale } from '@/messages';
    import { onMount } from 'svelte';
    import type { Test } from '@/lib/components/MyTests/testData.ts';

    type Props = {
        batch: Test;
    };

    const { batch }: Props = $props();
    const baseUrl = import.meta.env.BASE_URL;
    const locale = getLocale();
    const resultUrl = (id: string) => `${baseUrl}${locale}/result/${id}/`;
    const dateTimeLabel = (date: string) => `${date} 10:00`;

    let tableContainer = $state<HTMLDivElement>();
    let table = $state<HTMLTableElement>();
    let canScrollTable = $state(false);
    let isAtTableEnd = $state(false);

    function statusLabel(status: 'finished' | 'failed') {
        return status === 'finished' ? m.batchTestFinished() : m.batchTestFailed();
    }

    function updateScrollIndicator() {
        if (!tableContainer) {
            return;
        }

        canScrollTable = tableContainer.scrollWidth > tableContainer.clientWidth;
        isAtTableEnd =
            tableContainer.scrollLeft + tableContainer.clientWidth >=
            tableContainer.scrollWidth - 1;
    }

    onMount(() => {
        if (!tableContainer) {
            return;
        }

        const resizeObserver = new ResizeObserver(updateScrollIndicator);
        resizeObserver.observe(tableContainer);

        if (table) {
            resizeObserver.observe(table);
        }

        tableContainer.addEventListener('scroll', updateScrollIndicator, {
            passive: true,
        });
        updateScrollIndicator();

        return () => {
            resizeObserver.disconnect();
            tableContainer?.removeEventListener('scroll', updateScrollIndicator);
        };
    });
</script>

<div class="zm-my-tests-wrapper">
    {#if canScrollTable && !isAtTableEnd}
        <span class="zm-my-tests__scroll-indicator" aria-hidden="true">
            Scroll <i class="bi bi-arrow-right"></i>
        </span>
    {/if}
    <div class="zm-batch-test zm-my-tests" bind:this={tableContainer}>
        <table bind:this={table}>
            <caption>{m.batchTestTests()}</caption>
            <thead>
                <tr>
                    <th scope="col">{m.batchTestDomain()}</th>
                    <th scope="col">{m.myTestsTestType()}</th>
                    <th scope="col">{m.myTestsTestId()}</th>
                    <th scope="col">{m.myTestsDate()}</th>
                    <th scope="col">{m.batchTestStatus()}</th>
                    <th class="zm-batch-test__view-cell" scope="col">{m.myTestsLink()}</th>
                </tr>
            </thead>
            <tbody>
                {#each batch.tests ?? [] as test}
                    <tr class={`zm-batch-test__row zm-batch-test__row--${test.status}`}>
                        <td data-row-header="true" title={test.domain}>{test.domain}</td>
                        <td>{m.myTestsSingle()}</td>
                        <td>{test.id}</td>
                        <td>
                            <time
                                datetime={`${test.date}T10:00:00+01:00`}
                                title={dateTimeLabel(test.date)}
                                aria-label={dateTimeLabel(test.date)}
                            >
                                {test.date}
                            </time>
                        </td>
                        <td>
                            <i class={`bi bi-${test.status === 'finished' ? 'check-circle-fill' : 'x-circle-fill'} zm-batch-test__icon zm-batch-test__icon--${test.status}`} role="img" aria-label={statusLabel(test.status)} title={statusLabel(test.status)}></i>
                        </td>
                        <td class="zm-batch-test__view-cell">
                            <a class="zm-batch-test__result-link zm-batch-test__result-link--icon" href={resultUrl(test.id)} aria-label={m.batchTestGoToResult()} title={m.batchTestGoToResult()}>
                                <i class="bi bi-link-45deg" aria-hidden="true"></i>
                            </a>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
