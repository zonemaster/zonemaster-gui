<script lang="ts">
  type Props = {
    type?: string;
    size?: 'small' | 'large';
    value?: string;
    placeholder?: string;
    onClick?: () => void;
  };

  let {
    type = 'text',
    size = 'large',
    value = $bindable(),
    placeholder,
  }: Props = $props();
</script>

<input aria-labelledby="testInputHeading" bind:value={value} type={type} class="zm-input {size}" placeholder={placeholder} />

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
