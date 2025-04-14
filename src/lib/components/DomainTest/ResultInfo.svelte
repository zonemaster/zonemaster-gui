<script lang="ts">
    import type { ResultData } from '@/lib/client.ts';
    import Stack from '@/lib/components/Stack/Stack.svelte';
    import Button from '@/lib/components/Button/Button.svelte';
    import FilterToggle from '@/lib/components/FilterToggle/FilterToggle.svelte';
    import ResultModule from '@/lib/components/DomainTest/ResultModule.svelte';
    import stack from '@/lib/components/Stack/stack.module.css';
    import Input from '@/lib/components/Input/Input.svelte';
    import { collapseAll, expandAll } from '@/lib/components/DomainTest/store.svelte.ts';
    import History from '@/lib/components/DomainTest/History.svelte';
    import Collapsible from '@/lib/components/Collapsible/Collapsible.svelte';
    import type { FaqItem } from '@/content.config.ts';
    import { exportCSV, exportHTML, exportJson, exportText } from '@/lib/export.ts';
    import Copy from '../Copy/Copy.svelte';

    type Props = {
        data: ResultData;
        aboutLevels: FaqItem | null;
    };

    const { data, aboutLevels }: Props = $props();

    let query = $state('');
    let filterAll = $state(true);
    let filterInfo = $state(false);
    let filterNotice = $state(false);
    let filterWarning = $state(false);
    let filterError = $state(false);
    let filterCritical = $state(false);
    let result = $state(Object.groupBy(data.results, ({ module }) => module));
    let showExport = $state(false);
    let showShare = $state(false);

    function filterItems() {
        const filters = [
            filterInfo ? 'INFO' : null,
            filterNotice ? 'NOTICE' : null,
            filterWarning ? 'WARNING' : null,
            filterError ? 'ERROR' : null,
            filterCritical ? 'CRITICAL' : null
        ].filter(filter => filter !== null);

        const queryLower = query.toLowerCase();
        const filtered = data.results
            .filter((item) => filterAll || filters.includes(item.level))
            .filter((item) => !query || item.message.toLowerCase().includes(queryLower));

        result = Object.groupBy(
            filtered,
            ({ module }) => module
        );
    }

    function onCheck({ target }: Event) {
        const { value, checked } = target as HTMLInputElement;

        if (value === 'all' && checked) {
            filterInfo = false;
            filterNotice = false;
            filterWarning = false;
            filterError = false;
            filterCritical = false;
        } else {
            filterAll = false;
        }

        filterItems();
    }

    function expandAllModules() {
        expandAll(Object.keys(result));
    }

    function collapseAllModules() {
        collapseAll(Object.keys(result));
    }

    // Handle popover close on click outside
    document.addEventListener('click', (e: Event) => {
        const target = e.target as Element;
        if (!target.closest('.zm-popover')) {
            showExport = false;
            showShare = false;
        }
    });

    // Handle popover close on escape key
    document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            showExport = false;
            showShare = false;
        }
    });
</script>
<div class="zm-result">
    <h2 class="zm-result__title">Test result for {data.params.domain}</h2>
    <Stack middle wrap spaceBetween>
        <div>
            Created on
            <time datetime={data.created_at}>{new Intl.DateTimeFormat('en-US', {
                dateStyle: 'medium',
                timeStyle: 'medium'
            }).format(new Date(data.created_at))}</time>
        </div>
        <Stack middle gap="xs">
            <History data={data} />
            <div class="zm-popover">
                <Button
                    variant="secondary"
                    size="small"
                    type="button"
                    aria-controls="exportDialog"
                    onclick={() => {
                    showExport = !showExport;
                    }}
                >
                    <i class="bi bi-cloud-arrow-down"></i>
                    Export
                </Button>
                <div class="zm-popover__content" role="dialog" id="exportDialog" style:display={showExport ? 'block' : 'none'}>
                    <div class="{stack.stack} {stack.middle} {stack.spaceBetween} {stack['gap--s']}">
                        <button onmousedown={() => exportJson(data)}>JSON</button>
                        <button onmousedown={() => exportHTML(data)}>HTML</button>
                        <button onmousedown={() => exportCSV(data)}>CSV</button>
                        <button onmousedown={() => exportText(data)}>TEXT</button>
                    </div>
                </div>
            </div>
            <div class="zm-popover">
                <Button
                    variant="secondary"
                    size="small"
                    type="button"
                    aria-controls="copyURLDialog"
                    onclick={() => {
                        showShare = !showShare;
                    }}
                >
                    <i class="bi bi-share"></i>
                    Share
                </Button>
                <div class="zm-popover__content" role="dialog" id="copyURLDialog" style:display={showShare ? 'block' : 'none'}>
                    <div class="{stack.stack} {stack.stretch} {stack.spaceBetween} {stack['gap--s']}">
                        <Input size="small" type="text" readonly name="url" value={window.location.href} />
                        <Copy value={window.location.href} />
                    </div>
                </div>
            </div>
        </Stack>
    </Stack>
    <Stack vertical gap="m">
        <fieldset class="zm-fieldset">
            <legend>Filter severity levels</legend>
            <Stack middle wrap>
                <FilterToggle name="filter[all]" label="All" badge={data.results.length} bind:checked={filterAll}
                            onCheck={onCheck} value="all" />
                <FilterToggle name="filter[info]" label="Info" badge={data.results.filter((r) => r.level === 'INFO').length}
                            bind:checked={filterInfo} onCheck={onCheck} severity="info" value="info" />
                <FilterToggle name="filter[notice]" label="Notice"
                            badge={data.results.filter((r) => r.level === 'NOTICE').length} bind:checked={filterNotice}
                            onCheck={onCheck} severity="notice" value="notice" />
                <FilterToggle name="filter[warning]" label="Warning"
                            badge={data.results.filter((r) => r.level === 'WARNING').length} bind:checked={filterWarning}
                            onCheck={onCheck} severity="warning" value="warning" />
                <FilterToggle name="filter[error]" label="Error"
                            badge={data.results.filter((r) => r.level === 'ERROR').length} bind:checked={filterError}
                            onCheck={onCheck} severity="error" value="error" />
                <FilterToggle name="filter[critical]" label="Critical"
                            badge={data.results.filter((r) => r.level === 'CRITICAL').length}
                            bind:checked={filterCritical} onCheck={onCheck} severity="critical" value="critical" />
            </Stack>
        </fieldset>
        {#if aboutLevels}
            <Collapsible title={aboutLevels.question} id={'helper'} content={aboutLevels.answer}></Collapsible>
        {/if}
        <fieldset class="zm-fieldset {stack.stack} {stack.bottom} {stack['gap--xs']}">
            <div class={stack.expand}>
                <Input
                    id="filterQuery"
                    type="search"
                    placeholder="Search"
                    name="q"
                    bind:value={query}
                    label="Search text in messages"
                    onInput={filterItems}
                />
            </div>
            <Button onClick={expandAllModules} variant="secondary">Expand all modules</Button>
            <Button onClick={collapseAllModules} variant="secondary">Collapse all</Button>
        </fieldset>
        <Stack vertical gap="xs">
            {#each Object.entries(result) as [module, results]}
                {#key module}
                    <ResultModule module={module} results={results || []} descriptions={data.testcase_descriptions} />
                {/key}
            {/each}
        </Stack>
    </Stack>
</div>
