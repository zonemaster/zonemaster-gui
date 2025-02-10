<script lang="ts">
  type Option = {
    value: string;
    name: string;
  };

  type Props = {
    value?: string;
    label?: string;
    id?: string;
    options: Option[];
    onSelect?: (event: Event & { currentTarget: EventTarget & HTMLSelectElement }) => void;
  };

  let {
    value = $bindable(),
    label,
    id,
    options,
    onSelect,
  }: Props = $props();
</script>

{#if label}
  <label for={id} class="zm-label">{label}</label>
{/if}
<select id={id} bind:value={value} class="zm-select" on:change={onSelect}>
  {#each options as option}
    <option value={option.value}>{option.name}</option>
  {/each}
</select>

<style>
  .zm-select {
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: var(--input-height);
    padding: 0 var(--spacing-s);
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    font-family: var(--font-body-family);
    font-size: var(--font-s);
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right .75rem center;
    background-size: 16px 12px;
    appearance: none;
  }
</style>
