<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'large';
    disabled?: boolean;
    children?: Snippet;
    onClick?: null;
  };

  const {
    type = 'button',
    variant = 'primary',
    size = 'large',
    onClick,
    disabled,
    children
  }: Props = $props();
</script>

<button
  type={type}
  class="zm-button ${variant} ${size}"
  onclick={onClick}
  disabled={disabled}
>
  {@render children?.()}
</button>

<style>
  .zm-button {
    position: relative;
    display: inline-flex;
    padding: 0 var(--button-padding);
    align-items: center;
    justify-content: center;
    height: var(--button-size);
    border: 2px solid var(--button-color);
    border-radius: var(--border-radius);
    background: var(--button-color);
    text-decoration: none;
    color: var(--button-text-color);
    font-size: var(--button-font-size);
    font-weight: 700;
    line-height: 1;
    white-space: nowrap;
    gap: var(--spacing-xs);
    cursor: pointer;
  }
</style>
