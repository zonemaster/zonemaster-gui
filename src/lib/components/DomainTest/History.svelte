<script lang="ts">
    import Button from '@/lib/components/Button/Button.svelte';
    import { getTestHistory, type ResultData, type TestHistoryItem } from '@/lib/client.js';
    import { navigate } from '@/lib/router.svelte';

    type Props = {
        data: ResultData;
    };

    const { data }: Props = $props();
    let history: TestHistoryItem[] = $state([]);
    let page: number = $state(1);

    function onClick() {
        const historyDialog = document.getElementById('historyDialog') as HTMLDialogElement;

        getTestHistory({ domain: data.params.domain })
            .then((data) => {
                history = data;
                historyDialog.showModal();
            });
    }

    function onClickLink(e: Event) {
        e.preventDefault();

        const target = e.target as HTMLAnchorElement;
        const historyDialog = document.getElementById('historyDialog') as HTMLDialogElement;

        navigate(target.getAttribute('href') as string);
        historyDialog.close();
    }

    const itemsPerPage = 10;
    const paginatedHistory = $derived(history.slice((page - 1) * itemsPerPage, page * itemsPerPage));
    const totalPages = $derived(Math.ceil(history.length / itemsPerPage));

    function goToPage(newPage: number) {
        if (newPage >= 1 && newPage <= totalPages) {
            page = newPage;
        }
    }
</script>

<Button variant="secondary" size="small" type="button" onClick={onClick}>
    <i class="bi bi-clock-history"></i>
    History
</Button>
<dialog id="historyDialog" class="zm-dialog">
    <header>
        <h2>Test history</h2>
        <form method="dialog">
            <button aria-label="Close">
                <i class="bi bi-x"></i>
            </button>
        </form>
    </header>
    <ul>
        {#each paginatedHistory as item}
            <li class="{item.overall_result}">
                <a href={`/result/${item.id}`} onclick={onClickLink}>
                    {item.created_at}
                    <i class="bi bi-chevron-right"></i>
                </a>
            </li>
        {/each}
    </ul>
    <footer>
        <Button variant="secondary" size="small" type="button" onClick={() => goToPage(1)} disabled={page === 1}>
            <i class="bi bi-chevron-double-left"></i>
        </Button>
        <Button variant="secondary" size="small" type="button" onClick={() => page--} disabled={page === 1}>
            <i class="bi bi-chevron-left"></i>
        </Button>

        {#if totalPages > 0}
            {#each Array(Math.min(5, totalPages)) as _, i}
                {#if totalPages <= 5}
                    <!-- Show all pages if 5 or fewer total pages -->
                    {@const pageNum = i + 1}
                    <Button
                        variant={pageNum === page ? "primary" : "secondary"}
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
                        variant={pageNum === page ? "primary" : "secondary"}
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
                        variant={pageNum === page ? "primary" : "secondary"}
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
                        variant={pageNum === page ? "primary" : "secondary"}
                        size="small"
                        type="button"
                        onClick={() => goToPage(pageNum)}
                    >
                        {pageNum}
                    </Button>
                {/if}
            {/each}
        {/if}

        <Button variant="secondary" size="small" type="button" onClick={() => page++} disabled={page === totalPages}>
            <i class="bi bi-chevron-right"></i>
        </Button>
        <Button variant="secondary" size="small" type="button" onClick={() => goToPage(totalPages)} disabled={page === totalPages}>
            <i class="bi bi-chevron-double-right"></i>
        </Button>
    </footer>
</dialog>
