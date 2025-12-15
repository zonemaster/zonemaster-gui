<script lang="ts">
    import type { ResultData, ResultLevel } from '@/lib/client.ts';
    import Stack from '@/lib/components/Stack/Stack.svelte';
    import Button from '@/lib/components/Button/Button.svelte';
    import FilterToggle from '@/lib/components/FilterToggle/FilterToggle.svelte';
    import ResultModule from '@/lib/components/DomainTest/ResultModule.svelte';
    import stack from '@/lib/components/Stack/stack.module.css';
    import Input from '@/lib/components/Input/Input.svelte';
    import {
        collapseAll,
        expandAll,
    } from '@/lib/components/DomainTest/store.svelte.ts';
    import History from '@/lib/components/DomainTest/History.svelte';
    import Collapsible from '@/lib/components/Collapsible/Collapsible.svelte';
    import type { FaqItem } from '@/content.config.ts';
    import {
        exportCSV,
        exportHTML,
        exportJson,
        exportText,
    } from '@/lib/export.ts';
    import Copy from '../Copy/Copy.svelte';
    import { resultIcon } from '@/lib/resultIcon.ts';
    import * as m from '@/paraglide/messages';
    import { groupResult } from '@/lib/groupResult.ts';
    import type { ResultFilter } from '@/types.ts';

    type Props = {
        data: ResultData;
        aboutLevels: FaqItem | null;
    };

    const { data, aboutLevels }: Props = $props();
    let filter: ResultFilter = $state({
        levels: {
            ALL: true,
            INFO: false,
            NOTICE: false,
            WARNING: false,
            ERROR: false,
            CRITICAL: false,
        },
        query: '',
    });
    const rawData = $derived(data.results);
    const result = $derived(groupResult(data.results));
    let showExport = $state(false);
    let showShare = $state(false);
    let showURL = $state(false);

    function filterResults() {
        const filtered = groupResult(
            rawData.filter(
                (r) =>
                    (filter.levels[r.level] || filter.levels['ALL']) &&
                    (!filter.query.length ||
                        r.message
                            .toLowerCase()
                            .includes(filter.query.toLowerCase())),
            ),
        );

        result.modules = filtered.modules;
        result.modulesMap = filtered.modulesMap;
    }

    function onCheck({ target }: Event) {
        const { value, checked } = target as HTMLInputElement;
        const level = value as ResultLevel | 'ALL';

        filter.levels[level] = checked;

        if (level === 'ALL' && checked) {
            filter.levels['INFO'] = false;
            filter.levels['NOTICE'] = false;
            filter.levels['WARNING'] = false;
            filter.levels['ERROR'] = false;
            filter.levels['CRITICAL'] = false;
        } else {
            filter.levels['ALL'] = false;
        }

        // If no level is selected, select ALL
        if (Object.values(filter.levels).every((v) => !v)) {
            filter.levels['ALL'] = true;
        }

        filterResults();
    }

    function onQueryChange({ target }: Event) {
        filter.query = (target as HTMLInputElement).value;
        filterResults();
    }

    function expandAllModules() {
        expandAll(Object.keys(result.modulesMap));
    }

    function collapseAllModules() {
        collapseAll(Object.keys(result.modulesMap));
    }

    // Handle popover close on click outside
    document.addEventListener('click', (e: Event) => {
        const target = e.target as Element;
        if (!target.closest('.zm-popover')) {
            showExport = false;
            showShare = false;
            showURL = false;
        }
    });

    // Handle popover close on escape key
    document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            showExport = false;
            showShare = false;
            showURL = false;
        }
    });

    let shareUrl = window.location.href;

    if (shareUrl.includes('#')) {
        shareUrl = shareUrl.split('#')[0];
    }

    let TLDURL = window.location.href;
</script>

<div class="zm-result">
    <h2 class="zm-result__title">{m.testResultFor()} {data.params.domain}</h2>
    <Stack middle wrap spaceBetween>
        <div>
            {m.createdOn()}
            <time datetime={data.created_at}
                >{new Intl.DateTimeFormat('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'medium',
                }).format(new Date(data.created_at))}</time
            >
        </div>
        <Stack middle gap="xs">
            <div class="zm-popover zm-u-hide">
                <Button
                    variant="secondary"
                    size="small"
                    type="button"
                    aria-controls="copyTLDURLDialog"
                    onclick={() => {
                        showURL = !showURL;
                        showExport = false;
                        showShare = false;
                    }}
                    id="zmTLDURLButton"
                >
                    <i class="bi bi-link-45deg"></i>
                    {m.tldURL()}
                </Button>
                <div
                    class="zm-popover__content"
                    role="dialog"
                    id="copyTLDURLDialog"
                    style:display={showURL ? 'block' : 'none'}
                >
                    <div
                        class="{stack.stack} {stack.stretch} {stack.spaceBetween} {stack[
                            'gap--s'
                        ]}"
                    >
                        <Input
                            matchContentWidth
                            size="small"
                            type="text"
                            readonly
                            name="url"
                            value={TLDURL}
                        />
                        <Copy value={TLDURL} />
                    </div>
                </div>
            </div>
            <History {data} />
            <div class="zm-popover">
                <Button
                    variant="secondary"
                    size="small"
                    type="button"
                    aria-controls="zmExportDialog"
                    onclick={() => {
                        showExport = !showExport;
                        showShare = false;
                        showURL = false;
                    }}
                    id="zmExportButton"
                >
                    <i class="bi bi-cloud-arrow-down"></i>
                    {m.exportResult()}
                </Button>
                <div
                    class="zm-popover__content"
                    role="dialog"
                    id="zmExportDialog"
                    style:display={showExport ? 'block' : 'none'}
                >
                    <div
                        class="{stack.stack} {stack.middle} {stack.spaceBetween} {stack[
                            'gap--s'
                        ]}"
                    >
                        <button
                            class="zm-popover__plain-btn"
                            onmousedown={() => exportJson(data)}
                        >
                            {m.exportJson()}</button
                        >
                        <button
                            class="zm-popover__plain-btn"
                            onmousedown={() => exportHTML(data)}
                        >
                            {m.exportHtml()}</button
                        >
                        <button
                            class="zm-popover__plain-btn"
                            onmousedown={() => exportCSV(data)}
                        >
                            {m.exportCsv()}</button
                        >
                        <button
                            class="zm-popover__plain-btn"
                            onmousedown={() => exportText(data)}
                        >
                            {m.exportText()}</button
                        >
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
                        showExport = false;
                        showURL = false;
                    }}
                >
                    <i class="bi bi-share"></i>
                    {m.share()}
                </Button>
                <div
                    class="zm-popover__content"
                    role="dialog"
                    id="copyURLDialog"
                    style:display={showShare ? 'block' : 'none'}
                >
                    <div
                        class="{stack.stack} {stack.stretch} {stack.spaceBetween} {stack[
                            'gap--s'
                        ]}"
                    >
                        <Input
                            matchContentWidth
                            size="small"
                            type="text"
                            readonly
                            name="url"
                            value={shareUrl}
                        />
                        <Copy value={shareUrl} />
                    </div>
                </div>
            </div>
        </Stack>
    </Stack>
    <Stack vertical gap="m">
        <fieldset class="zm-fieldset">
            <legend>{m.filterSeverityLevels()}</legend>
            <Stack gap="xs" middle wrap>
                <FilterToggle
                    name="filter[all]"
                    label={m.all()}
                    badge={result.counts.ALL}
                    bind:checked={filter.levels.ALL}
                    {onCheck}
                    value="ALL"
                />
                <FilterToggle
                    name="filter[info]"
                    label={m.info()}
                    badge={result.counts.INFO}
                    icon={resultIcon('INFO')}
                    bind:checked={filter.levels.INFO}
                    {onCheck}
                    severity="info"
                    value="INFO"
                />
                <FilterToggle
                    name="filter[notice]"
                    label={m.notice()}
                    badge={result.counts.NOTICE}
                    icon={resultIcon('NOTICE')}
                    bind:checked={filter.levels.NOTICE}
                    {onCheck}
                    severity="notice"
                    value="NOTICE"
                />
                <FilterToggle
                    name="filter[warning]"
                    label={m.warning()}
                    badge={result.counts.WARNING}
                    icon={resultIcon('WARNING')}
                    bind:checked={filter.levels.WARNING}
                    {onCheck}
                    severity="warning"
                    value="WARNING"
                />
                <FilterToggle
                    name="filter[error]"
                    label={m.error()}
                    badge={result.counts.ERROR}
                    icon={resultIcon('ERROR')}
                    bind:checked={filter.levels.ERROR}
                    {onCheck}
                    severity="error"
                    value="ERROR"
                />
                <FilterToggle
                    name="filter[critical]"
                    label={m.critical()}
                    badge={result.counts.CRITICAL}
                    icon={resultIcon('CRITICAL')}
                    bind:checked={filter.levels.CRITICAL}
                    {onCheck}
                    severity="critical"
                    value="CRITICAL"
                />
            </Stack>
        </fieldset>
        {#if aboutLevels}
            <Collapsible
                title={aboutLevels.question}
                id={'helper'}
                content={aboutLevels.answer}
            ></Collapsible>
        {/if}
        <fieldset
            class="zm-fieldset {stack.stack} {stack.wrap} {stack.bottom} {stack[
                'gap--xs'
            ]}"
        >
            <div class={stack.expand}>
                <Input
                    id="filterQuery"
                    type="search"
                    placeholder={m.search()}
                    name="q"
                    bind:value={filter.query}
                    label={m.searchInText()}
                    onInput={onQueryChange}
                />
            </div>
            <Button onClick={expandAllModules} variant="secondary"
                >{m.expandAll()}</Button
            >
            <Button onClick={collapseAllModules} variant="secondary"
                >{m.collapseAll()}</Button
            >
        </fieldset>
        <Stack vertical gap="xs">
            {#each result.modules as module}
                {#key module}
                    <ResultModule
                        data={module}
                        summary={result.moduleSummary[module.name]}
                        descriptions={data.testcase_descriptions}
                    />
                {/key}
            {/each}
        </Stack>
    </Stack>
</div>
