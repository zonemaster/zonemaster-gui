<script lang="ts">
    import * as m from '@/messages';
    import { getLocale } from '@/messages';
    import type { Test } from '@/lib/components/MyTests/testData.ts';

    type Props = {
        tests: Test[];
    };

    const { tests }: Props = $props();

    const baseUrl = import.meta.env.BASE_URL;
    const locale = getLocale();
    const resultUrl = (id: string) => `${baseUrl}${locale}/result/${id}/`;
    const dateTimeLabel = (date: string) => `${date} 10:00`;

    function statusLabel(status: Test['status']) {
        return status === 'finished' ? m.batchTestFinished() : m.batchTestFailed();
    }
</script>

<div class="zm-my-tests-wrapper" data-table-scroll>
    <span
        class="zm-my-tests__scroll-indicator"
        aria-hidden="true"
        data-table-scroll-indicator
        hidden
    >
        Scroll <i class="bi bi-arrow-right"></i>
    </span>
    <div class="zm-batch-test zm-my-tests" data-table-scroll-container>
    <table>
        <caption>{m.testHistory()}</caption>
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
            {#each tests as test}
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
                    <td>
                        <i
                            class={`bi bi-${test.status === 'finished' ? 'check-circle-fill' : 'x-circle-fill'} zm-batch-test__icon`}
                            role="img"
                            aria-label={statusLabel(test.status)}
                            title={statusLabel(test.status)}
                            hidden={test.type === 'batch'}
                        ></i>
                    </td>
                    <td class="zm-batch-test__view-cell">
                        <a
                            class="zm-batch-test__result-link zm-batch-test__result-link--icon"
                            href={resultUrl(test.id)}
                            aria-label={test.type === 'single' ? m.batchTestGoToResult() : m.myTestsShowBatchTests()}
                            title={test.type === 'single' ? m.batchTestGoToResult() : m.myTestsShowBatchTests()}
                        >
                            <i class="bi bi-link-45deg" aria-hidden="true"></i>
                        </a>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
    </div>
</div>
