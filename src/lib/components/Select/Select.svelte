<script lang="ts">
    import type { Snippet } from 'svelte';

    type Option = {
        value: string;
        name: string;
    };

    type Props = {
        name: string;
        value?: string;
        label?: string;
        labelContent?: Snippet;
        id?: string;
        options: Option[];
        onSelect?: (event: Event & { currentTarget: EventTarget & HTMLSelectElement }) => void;
    };

    let {
        name,
        value = $bindable(),
        label,
        labelContent,
        id,
        options,
        onSelect
    }: Props = $props();
</script>

{#if label || labelContent}
    <label for={id} class="zm-label">
        {#if labelContent}
            {@render labelContent()}
        {:else}
            {label}
        {/if}
    </label>
{/if}

<select
    name={name}
    id={id}
    bind:value={value}
    class="zm-select"
    onchange={onSelect}
>
    {#each options as option}
        <option value={option.value}>{option.name}</option>
    {/each}
</select>