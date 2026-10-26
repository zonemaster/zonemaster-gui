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
    const dateTimeLabel = (date: string) => `${date} 10:00`;

    const tests: Test[] = [
        {
            id: '7294b2cfb1561823',
            domain: 'zonemaster.net',
            date: '2026-10-14',
            type: 'single',
            status: 'finished',
            resultUrl: resultUrl('7294b2cfb1561823'),
        },
        {
            id: 'e5a8d73f4c1290ba',
            domain: 'batch-test-01',
            date: '2026-10-13',
            type: 'batch',
            status: 'finished',
            tests: [
                { id: 'c18e4a907db5623f', domain: 'example.com', date: '2026-10-13', resultUrl: resultUrl('c18e4a907db5623f'), status: 'finished' },
                { id: '4f73bc8d1ea95062', domain: 'example.net', date: '2026-10-13', resultUrl: resultUrl('4f73bc8d1ea95062'), status: 'finished' },
                { id: '9a62edc5b80147f3', domain: 'example.org', date: '2026-10-13', resultUrl: resultUrl('9a62edc5b80147f3'), status: 'finished' },
            ],
        },
        {
            id: 'd6c371f8a2049be5',
            domain: 'internetstiftelsen.se',
            date: '2026-10-12',
            type: 'single',
            status: 'finished',
            resultUrl: resultUrl('d6c371f8a2049be5'),
        },
        {
            id: '2b94ef6c7d1830a5',
            domain: 'batch-test-02',
            date: '2026-10-11',
            type: 'batch',
            status: 'finished',
            tests: [
                { id: '8de25b719c40fa63', domain: 'example.edu', date: '2026-10-11', resultUrl: resultUrl('8de25b719c40fa63'), status: 'finished' },
                { id: '37a6c9e1d4528fb0', domain: 'example.info', date: '2026-10-11', resultUrl: resultUrl('37a6c9e1d4528fb0'), status: 'finished' },
            ],
        },
        {
            id: 'b04d8f3267ea159c',
            domain: 'failed-single.example',
            date: '2026-10-10',
            type: 'single',
            status: 'failed',
            resultUrl: resultUrl('b04d8f3267ea159c'),
        },
        {
            id: '6f19ab42cde78053',
            domain: 'batch-test-03',
            date: '2026-10-09',
            type: 'batch',
            status: 'failed',
            tests: [
                { id: '1c8a5e7db2094f36', domain: 'failed-batch.example', date: '2026-10-09', resultUrl: resultUrl('1c8a5e7db2094f36'), status: 'failed' },
                { id: 'f4372b8c6e1d950a', domain: 'completed-batch.example', date: '2026-10-09', resultUrl: resultUrl('f4372b8c6e1d950a'), status: 'finished' },
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
        <caption>{m.testHistory()}</caption>
        <thead>
            <tr>
                <th scope="col">{m.batchTestDomain()}</th>
                <th scope="col">{m.myTestsTestType()}</th>
                <th scope="col">{m.myTestsTestId()}</th>
                <th scope="col">{m.myTestsDate()}</th>
                <th scope="col">{m.batchTestResult()}</th>
                <th scope="col">{m.batchTestStatus()}</th>
            </tr>
        </thead>
        {#each tests as test}
            <tbody>
                <tr class={`zm-batch-test__row zm-batch-test__row--${test.status}`}>
                    <td data-row-header="true" title={test.domain}>{test.domain}</td>
                    <td>{test.type === 'single' ? m.myTestsSingle() : m.myTestsBatch()}</td>
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
                    <td class:zm-my-tests__expand-cell={test.type === 'batch'}>
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
                            <td>{m.myTestsSingle()}</td>
                            <td>{batchTest.id}</td>
                            <td>
                                <time
                                    datetime={`${batchTest.date}T10:00:00+01:00`}
                                    title={dateTimeLabel(batchTest.date)}
                                    aria-label={dateTimeLabel(batchTest.date)}
                                >
                                    {batchTest.date}
                                </time>
                            </td>
                            <td>
                                <a class="zm-batch-test__result-link" href={batchTest.resultUrl}>
                                    {m.batchTestGoToResult()}
                                </a>
                            </td>
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
