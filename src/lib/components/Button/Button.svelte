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
  class="zm-button"
  onclick={onClick}
  disabled={disabled}
>
  {@render children?.()}
  <i class="bi bi-person-walking"></i>
</button>

<style>
  .zm-button {
    position: relative;
    display: inline-flex;
    padding: 0 var(--button-padding);
    align-items: center;
    justify-content: center;
    height: var(--button-size);
    border: 0;
    box-shadow: 0 0 0 2px inset var(--button-color);
    border-radius: var(--border-radius);
    background: var(--button-color);
    text-decoration: none;
    color: var(--button-text-color);
    font-size: var(--button-font-size);
    font-weight: 700;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;

    i {
      display: none;
    }

    &[disabled] {
      background: var(--color-disabled);
      color: var(--color-muted-text);
      box-shadow: 0 0 0 2px inset var(--button-disabled);
      text-shadow: 0 1px 0 var(--color-palette-black-0);
      cursor: not-allowed;

      i {
        display: initial;
      }
    }
  }
</style>
