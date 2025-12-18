<script lang="ts">
    import * as m from '@/messages';
    import { getLocale } from '@/messages';
    import Button from '@/lib/components/Button/Button.svelte';
    import ButtonGroup from '@/lib/components/ButtonGroup/ButtonGroup.svelte';
    import {
        getTestHistory,
        type ResultData,
        type TestHistoryItem,
    } from '@/lib/client.js';
    import { navigate } from '@/lib/router.svelte';
    import { formatDate } from '@/lib/formatDate.ts';

    type Props = {
        data: ResultData;
    };

    const { data }: Props = $props();
    let history: TestHistoryItem[] = $state([]);
    let filteredHistory: TestHistoryItem[] = $state([]);
    let page: number = $state(1);
    let filter: string = $state('all');

    const filterOptions = $derived([
        { key: 'all', value: m.historyAll() },
        { key: 'delegated', value: m.delegated() },
        { key: 'undelegated', value: m.undelegated() },
    ]);

    function onClick() {
        const historyDialog = document.getElementById(
            'historyDialog',
        ) as HTMLDialogElement;

        getTestHistory({ domain: data.params.domain }).then((data) => {
            history = data;
            applyFilter();
            historyDialog.showModal();
        });
    }

    function applyFilter() {
        if (filter === 'all') {
            filteredHistory = history;
        } else if (filter === 'delegated') {
            filteredHistory = history.filter((item) => !item.undelegated);
        } else if (filter === 'undelegated') {
            filteredHistory = history.filter((item) => item.undelegated);
        }
        page = 1; // Reset to first page when filter changes
    }

    function handleFilterChange(v: string) {
        filter = v;
        applyFilter();
    }

    function onClickLink(e: Event) {
        e.preventDefault();

        const target = e.target as HTMLAnchorElement;
        const historyDialog = document.getElementById(
            'historyDialog',
        ) as HTMLDialogElement;

        navigate(target.getAttribute('href') as string);
        historyDialog.close();
    }

    const itemsPerPage = 10;
    const paginatedHistory = $derived(
        filteredHistory.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    );
    const totalPages = $derived(
        Math.ceil(filteredHistory.length / itemsPerPage),
    );

    function goToPage(newPage: number) {
        if (newPage >= 1 && newPage <= totalPages) {
            page = newPage;
        }
    }
</script>

<Button
    variant="secondary"
    size="small"
    type="button"
    {onClick}
    id="zmHistoryButton"
>
    <i class="bi bi-clock-history"></i>
    {m.history()}
</Button>
<dialog id="historyDialog" class="zm-dialog">
    <header>
        <h2>{m.testHistory()}</h2>
        <ButtonGroup
            options={filterOptions}
            active={filter}
            onChange={handleFilterChange}
        />
        <form method="dialog">
            <button aria-label="Close" class="zm-dialog__close">
                <i class="bi bi-x"></i>
            </button>
        </form>
    </header>
    <ul>
        {#each paginatedHistory as item}
            <li class={item.overall_result}>
                <a
                    href={`${import.meta.env.BASE_URL}${getLocale()}/result/${item.id}`}
                    onclick={onClickLink}
                >
                    {formatDate(item.created_at)}
                </a>
                {#if item.undelegated}
                    <span>{m.undelegated()}</span>
                {/if}
                <i class="bi bi-chevron-right"></i>
            </li>
        {/each}
    </ul>
    <footer>
        <Button
            variant="secondary"
            size="small"
            type="button"
            onClick={() => goToPage(1)}
            disabled={page === 1}
        >
            <i class="bi bi-chevron-double-left"></i>
        </Button>
        <Button
            variant="secondary"
            size="small"
            type="button"
            onClick={() => page--}
            disabled={page === 1}
        >
            <i class="bi bi-chevron-left"></i>
        </Button>

        {#if totalPages > 0}
            {#each Array(Math.min(5, totalPages)) as _, i}
                {#if totalPages <= 5}
                    <!-- Show all pages if 5 or fewer total pages -->
                    {@const pageNum = i + 1}
                    <Button
                        variant={pageNum === page ? 'primary' : 'secondary'}
                        size="small"
                        type="button"
                        onClick={() => goToPage(pageNum)}
                    >
                        {pageNum}
                    </Button>
                {:else if page <= 3}
                    <!-- First 5 pages when current page is near the beginning -->
                    {@const pageNum = i + 1}
                    <Button
                        variant={pageNum === page ? 'primary' : 'secondary'}
                        size="small"
                        type="button"
                        onClick={() => goToPage(pageNum)}
                    >
                        {pageNum}
                    </Button>
                {:else if page >= totalPages - 2}
                    <!-- Last 5 pages when current page is near the end -->
                    {@const pageNum = totalPages - 4 + i}
                    <Button
                        variant={pageNum === page ? 'primary' : 'secondary'}
                        size="small"
                        type="button"
                        onClick={() => goToPage(pageNum)}
                    >
                        {pageNum}
                    </Button>
                {:else}
                    <!-- Middle pages with current page in center -->
                    {@const pageNum = page - 2 + i}
                    <Button
                        variant={pageNum === page ? 'primary' : 'secondary'}
                        size="small"
                        type="button"
                        onClick={() => goToPage(pageNum)}
                    >
                        {pageNum}
                    </Button>
                {/if}
            {/each}
        {/if}

        <Button
            variant="secondary"
            size="small"
            type="button"
            onClick={() => page++}
            disabled={page === totalPages}
        >
            <i class="bi bi-chevron-right"></i>
        </Button>
        <Button
            variant="secondary"
            size="small"
            type="button"
            onClick={() => goToPage(totalPages)}
            disabled={page === totalPages}
        >
            <i class="bi bi-chevron-double-right"></i>
        </Button>
    </footer>
</dialog>
