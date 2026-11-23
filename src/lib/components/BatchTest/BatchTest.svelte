<script lang="ts">
    import * as m from '@/messages';

    export type BatchTestEntry = {
        domain: string;
        id: string;
        status: 'finished' | 'failed' | 'ongoing';
        resultUrl?: string;
    };

    type Props = {
        tests: BatchTestEntry[];
    };

    const { tests }: Props = $props();

    function statusLabel(status: BatchTestEntry['status']) {
        if (status === 'finished') {
            return m.batchTestFinished();
        }

        return status === 'failed' ? m.batchTestFailed() : m.batchTestOngoing();
    }

</script>

<div class="zm-batch-test-wrapper" data-table-scroll>
    <span
        class="zm-batch-test__scroll-indicator"
        aria-hidden="true"
        data-table-scroll-indicator
        hidden
    >
        Scroll <i class="bi bi-arrow-right"></i>
    </span>
    <div
        class="zm-batch-test zm-batch-test--responsive"
        data-table-scroll-container
    >
    <table>
        <caption>{m.batchTestProgress()}</caption>
        <thead>
            <tr>
                <th scope="col">{m.batchTestDomain()}</th>
                <th class="zm-batch-test__id-cell" scope="col">{m.myTestsTestId()}</th>
                <th class="zm-batch-test__view-cell" scope="col">{m.myTestsLink()}</th>
                <th scope="col">{m.batchTestStatus()}</th>
            </tr>
        </thead>
        <tbody>
            {#each tests as test}
                <tr class={`zm-batch-test__row zm-batch-test__row--${test.status}`}>
                    <td>
                        {test.domain}
                    </td>
                    <td class="zm-batch-test__id-cell">{test.id}</td>
                    <td class="zm-batch-test__view-cell">
                        {#if test.resultUrl}
                            <a class="zm-batch-test__result-link zm-batch-test__result-link--icon" href={test.resultUrl} aria-label={m.batchTestGoToResult()} title={m.batchTestGoToResult()}>
                                <i class="bi bi-link-45deg" aria-hidden="true"></i>
                            </a>
                        {:else}
                            <span class="zm-batch-test__no-result" aria-hidden="true">—</span>
                            <span class="zm-u-visually-hidden">{m.batchTestOngoing()}</span>
                        {/if}
                    </td>
                    <td>
                        {#if test.status === 'finished'}
                            <i class="bi bi-check-circle-fill zm-batch-test__icon" role="img" aria-label={statusLabel(test.status)} title={statusLabel(test.status)}></i>
                        {:else if test.status === 'failed'}
                            <i class="bi bi-x-circle-fill zm-batch-test__icon" role="img" aria-label={statusLabel(test.status)} title={statusLabel(test.status)}></i>
                        {:else}
                            <span class="zm-batch-test__ongoing" role="status">
                                <i class="bi bi-arrow-repeat" role="img" aria-label={statusLabel(test.status)} title={statusLabel(test.status)}></i>
                            </span>
                        {/if}
                    </td>
                </tr>
            {/each}
        </tbody>
        <tfoot>
            <tr>
                <td colspan="4">
                    <h3 class="zm-batch-test__legend-heading">
                        {m.batchTestIconLegendHeading()}
                    </h3>
                    <div class="zm-batch-test__legend">
                        <span>
                            <i class="bi bi-check-circle-fill zm-batch-test__icon zm-batch-test__icon--finished" role="img" aria-label={m.batchTestFinished()} title={m.batchTestFinished()}></i>
                            <em>{m.batchTestFinished()}</em>
                        </span>
                        <span>
                            <i class="bi bi-x-circle-fill zm-batch-test__icon zm-batch-test__icon--failed" role="img" aria-label={m.batchTestFailed()} title={m.batchTestFailed()}></i>
                            <em>{m.batchTestFailed()}</em>
                        </span>
                        <span>
                            <i class="bi bi-arrow-repeat zm-batch-test__icon zm-batch-test__icon--ongoing" role="img" aria-label={m.batchTestOngoing()} title={m.batchTestOngoing()}></i>
                            <em>{m.batchTestOngoing()}</em>
                        </span>
                    </div>
                </td>
            </tr>
        </tfoot>
    </table>
    </div>
</div>
