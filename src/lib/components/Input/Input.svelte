<script lang="ts">
  type Props = {
    type?: string;
    size?: 'small' | 'large';
    value?: string;
    placeholder?: string;
    label?: string;
    id?: string;
    onInput?: (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => void;
  };

  let {
    type = 'text',
    size = 'large',
    value = $bindable(),
    placeholder,
    label,
    id,
    onInput,
  }: Props = $props();
</script>

{#if label}
  <label for={id} class="zm-label">{label}</label>
{/if}
<input id={id} bind:value={value} type={type} class="zm-input {size}" placeholder={placeholder} on:input={onInput} />

<style>
  .zm-input {
    all: unset;
    box-sizing: border-box;
    display: block;
    height: var(--input-height);
    padding: 0 var(--spacing-s);
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    font-family: var(--font-body-family);
    font-size: var(--font-s);
    outline: none;
    width: 100%;
    position: relative;
    z-index: 1;
    color: var(--color-text);
  }
</style>
