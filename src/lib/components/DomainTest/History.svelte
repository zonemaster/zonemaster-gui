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
<dialog id="historyDialog">
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
<style>
    dialog {
        min-width: 500px;
        border: none;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        background-color: white;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        header {
            position: sticky;
            top: 0;
            padding: var(--spacing-s) var(--spacing-m);
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid var(--color-border);
            background: var(--color-palette-white);
        }

        ul {
            list-style: none;
            padding: 0;
            margin: 0;

            li {
                padding: var(--spacing-xs) var(--spacing-s);

                & + li {
                    margin-top: 0;
                    border-top: 1px solid var(--color-border);
                }

                a {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    text-decoration: underline;
                }

                &.ok {
                    background-color: var(--color-palette-success-10);

                    a {
                        color: var(--color-palette-success-90);
                    }
                }

                &.warning {
                    background-color: var(--color-palette-warning-10);

                    a {
                        color: var(--color-palette-warning-90);
                    }
                }

                &.error, &.critical {
                    background-color: var(--color-palette-danger-10);

                    a {
                        color: var(--color-palette-danger-90);
                    }
                }
            }
        }

        button {
            all: unset;
            position: absolute;
            top: 0;
            right: 0;
            display: grid;
            place-items: center;
            width: var(--button-size-small);
            height: var(--button-size-small);
            font-size: var(--font-l);
        }
        
        footer {
            position: sticky;
            bottom: 0;
            display: flex;
            justify-content: center;
            gap: var(--spacing-xs);
            padding: var(--spacing-s);
            border-top: 1px solid var(--color-border);
        }
    }

    dialog::backdrop {
        backdrop-filter: blur(4px);
        background-color: rgba(0, 0, 0, 0.3);
    }
</style>
