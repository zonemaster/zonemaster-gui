<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'large';
    disabled?: boolean;
    children?: Snippet;
    onClick?: null;
    class?: string;
  };

  const {
    type = 'button',
    variant = 'primary',
    size = 'large',
    onClick,
    disabled,
    children,
    class: className = '',
    ...restProps
  }: Props = $props();
</script>

<button
  type={type}
  class={['zm-button', variant, size, className]}
  onclick={onClick}
  disabled={disabled}
  {...restProps}
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
    gap: var(--spacing-xs);
    height: var(--button-size);
    border: 1px solid var(--button-color);
    border-radius: var(--border-radius);
    background: var(--button-color);
    text-decoration: none;
    color: var(--button-text-color);
    font-size: var(--button-font-size);
    font-weight: 700;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
  }

  .secondary {
    background: var(--color-palette-black-30);
    border-color: var(--color-palette-black-40);
    color: var(--color-palette-black-90);
  }

  .danger {
    background: var(--color-palette-danger-50);
    border-color: var(--color-palette-danger-70);
    color: var(--color-palette-danger-0);
  }

  .small {
    font-size: var(--button-font-size-small);
    height: var(--button-size-small);
  }
</style>
