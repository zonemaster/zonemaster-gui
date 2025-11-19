<script lang="ts">
    type Option = {
        value: string;
        name: string;
    };

    type Props = {
        name: string;
        value?: string;
        label?: string;
        id?: string;
        options: Option[];
        onSelect?: (event: Event & { currentTarget: EventTarget & HTMLSelectElement }) => void;
    };

    let {
        name,
        value = $bindable(),
        label,
        id,
        options,
        onSelect
    }: Props = $props();
</script>

{#if label}
    <label for={id} class="zm-label">{label}</label>
{/if}
<select name={name} id={id} bind:value={value} class="zm-select" onchange={onSelect}>
    {#each options as option}
        <option value={option.value}>{option.name}</option>
    {/each}
</select>