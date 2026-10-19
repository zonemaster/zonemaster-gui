<script lang="ts">
    import * as m from '@/messages';
    import { getLocale } from '@/messages';
    import { onMount } from 'svelte';
    import Switch from '@/lib/components/Switch/Switch.svelte';

    type SingleTest = {
        id: string;
        domain: string;
        date: string;
        resultUrl: string;
        status: 'finished' | 'failed';
    };

    type Test = {
        id: string;
        domain: string;
        date: string;
        type: 'single' | 'batch';
        status: 'finished' | 'failed';
        resultUrl?: string;
        tests?: SingleTest[];
    };

    const baseUrl = import.meta.env.BASE_URL;
    const locale = getLocale();
    const resultUrl = (id: string) => `${baseUrl}${locale}/result/${id}/`;

    const tests: Test[] = [
        {
            id: 'single-1',
            domain: 'zonemaster.net',
            date: '2026-10-14',
            type: 'single',
            status: 'finished',
            resultUrl: resultUrl('single-1'),
        },
        {
            id: 'batch-1',
            domain: 'batch-test-01',
            date: '2026-10-13',
            type: 'batch',
            status: 'finished',
            tests: [
                { id: 'batch-1-1', domain: 'example.com', date: '2026-10-13', resultUrl: resultUrl('batch-1-1'), status: 'finished' },
                { id: 'batch-1-2', domain: 'example.net', date: '2026-10-13', resultUrl: resultUrl('batch-1-2'), status: 'finished' },
                { id: 'batch-1-3', domain: 'example.org', date: '2026-10-13', resultUrl: resultUrl('batch-1-3'), status: 'finished' },
            ],
        },
        {
            id: 'single-2',
            domain: 'internetstiftelsen.se',
            date: '2026-10-12',
            type: 'single',
            status: 'finished',
            resultUrl: resultUrl('single-2'),
        },
        {
            id: 'batch-2',
            domain: 'batch-test-02',
            date: '2026-10-11',
            type: 'batch',
            status: 'finished',
            tests: [
                { id: 'batch-2-1', domain: 'example.edu', date: '2026-10-11', resultUrl: resultUrl('batch-2-1'), status: 'finished' },
                { id: 'batch-2-2', domain: 'example.info', date: '2026-10-11', resultUrl: resultUrl('batch-2-2'), status: 'finished' },
            ],
        },
        {
            id: 'single-3',
            domain: 'failed-single.example',
            date: '2026-10-10',
            type: 'single',
            status: 'failed',
            resultUrl: resultUrl('single-3'),
        },
        {
            id: 'batch-3',
            domain: 'batch-test-03',
            date: '2026-10-09',
            type: 'batch',
            status: 'failed',
            tests: [
                { id: 'batch-3-1', domain: 'failed-batch.example', date: '2026-10-09', resultUrl: resultUrl('batch-3-1'), status: 'failed' },
                { id: 'batch-3-2', domain: 'completed-batch.example', date: '2026-10-09', resultUrl: resultUrl('batch-3-2'), status: 'finished' },
            ],
        },
    ];

    let expandedBatchIds = $state(new Set<string>());
    let tableContainer = $state<HTMLDivElement>();
    let table = $state<HTMLTableElement>();
    let canScrollTable = $state(false);
    let isAtTableEnd = $state(false);

    function isExpanded(id: string) {
        return expandedBatchIds.has(id);
    }

    function toggleBatch(id: string) {
        const nextExpandedBatchIds = new Set(expandedBatchIds);

        if (nextExpandedBatchIds.has(id)) {
            nextExpandedBatchIds.delete(id);
        } else {
            nextExpandedBatchIds.add(id);
        }

        expandedBatchIds = nextExpandedBatchIds;
    }

    function statusLabel(status: Test['status']) {
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
        <caption>{m.myTestsTableCaption()}</caption>
        <thead>
            <tr>
                <th scope="col">{m.batchTestDomain()}</th>
                <th scope="col">{m.batchTestResult()}</th>
                <th scope="col">{m.myTestsTestType()}</th>
                <th scope="col">{m.myTestsTestId()}</th>
                <th scope="col">{m.myTestsDate()}</th>
                <th scope="col">{m.batchTestStatus()}</th>
            </tr>
        </thead>
        {#each tests as test}
            <tbody>
                <tr class={`zm-batch-test__row zm-batch-test__row--${test.status}`}>
                    <td data-row-header="true" title={test.domain}>{test.domain}</td>
                    <td>
                        {#if test.type === 'single' && test.resultUrl}
                            <a class="zm-batch-test__result-link" href={test.resultUrl}>
                                {m.batchTestGoToResult()}
                            </a>
                        {:else}
                            <Switch
                                id={`batch-tests-toggle-${test.id}`}
                                controls={`batch-tests-${test.id}`}
                                active={isExpanded(test.id)}
                                size="small"
                                onClick={() => toggleBatch(test.id)}
                            >
                                {isExpanded(test.id)
                                    ? m.myTestsHideBatchTests()
                                    : m.myTestsShowBatchTests()}
                            </Switch>
                        {/if}
                    </td>
                    <td>{test.type === 'single' ? m.myTestsSingle() : m.myTestsBatch()}</td>
                    <td>{test.id}</td>
                    <td><time datetime={test.date}>{test.date}</time></td>
                    {#if test.type === 'single'}
                        <td>
                            <i class={`bi bi-${test.status === 'finished' ? 'check-circle-fill' : 'x-circle-fill'} zm-batch-test__icon`} role="img" aria-label={statusLabel(test.status)} title={statusLabel(test.status)}></i>
                        </td>
                    {:else}
                        <td aria-hidden="true"></td>
                    {/if}
                </tr>
            </tbody>
            {#if test.type === 'batch'}
                <tbody
                    id={`batch-tests-${test.id}`}
                    class="zm-my-tests__batch-details"
                    hidden={!isExpanded(test.id)}
                >
                    {#each test.tests ?? [] as batchTest}
                        <tr class={`zm-batch-test__row zm-batch-test__row--${batchTest.status}`}>
                            <td data-row-header="true" title={batchTest.domain}>{batchTest.domain}</td>
                            <td>
                                <a class="zm-batch-test__result-link" href={batchTest.resultUrl}>
                                    {m.batchTestGoToResult()}
                                </a>
                            </td>
                            <td>{m.myTestsSingle()}</td>
                            <td>{batchTest.id}</td>
                            <td><time datetime={batchTest.date}>{batchTest.date}</time></td>
                            <td>
                                <i class={`bi bi-${batchTest.status === 'finished' ? 'check-circle-fill' : 'x-circle-fill'} zm-batch-test__icon zm-batch-test__icon--${batchTest.status}`} role="img" aria-label={statusLabel(batchTest.status)} title={statusLabel(batchTest.status)}></i>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            {/if}
        {/each}
    </table>
    </div>
</div>
