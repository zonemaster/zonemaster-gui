<script lang="ts">
  import type {Snippet} from "svelte";
  import Button from '@/lib/components/Button/Button.svelte';

  type Props = {
    id: string;
    controls?: string;
    active: boolean;
    size?: 'small' | 'large';
    iconOnly?: boolean;
    label?: string;
    onClick: () => void;
    children?: Snippet;
  };

  let {
    id,
    active,
    controls,
    size = 'large',
    iconOnly = false,
    label,
    onClick,
    children,
  }: Props = $props();

  let icon = $derived(iconOnly ? (active ? 'caret-up' : 'caret-down') : active ? 'caret-up-fill' : 'caret-down-fill');
</script>
<div class={`zm-switch zm-switch--${size}${iconOnly ? ' zm-switch--icon-only' : ''}${active ? ' zm-switch--active' : ''}`}>
  {#if !iconOnly}
    <label for="{id}" id="{id}-label">{@render children?.()}</label>
  {/if}
  <Button type="button" id={id} aria-controls={controls || null} variant="transparent" {size} class="switch-toggle" aria-expanded={active} aria-labelledby={iconOnly ? null : `${id}-label`} ariaLabel={iconOnly ? label : undefined} title={iconOnly ? label : undefined} onclick={onClick}>
    <i class="bi bi-{icon}"></i>
  </Button>
</div>
