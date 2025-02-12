<script lang="ts">
  import type {Snippet} from "svelte";
  import Button from '@/lib/components/Button/Button.svelte';

  type Props = {
    id: string;
    controls?: string;
    active: boolean;
    onClick: () => void;
    children?: Snippet;
  };

  let {
    id,
    active,
    controls,
    onClick,
    children
  }: Props = $props();
</script>
<div class="zm-switch">
  <Button type="button" id="{id}" aria-controls="{controls || null}" variant="primary" class="switch-toggle" aria-expanded={active} aria-labelledby="{id}-label" onclick={onClick}></Button>
  <label for="{id}" id="{id}-label">{@render children?.()}</label>
</div>

<style>
  .zm-switch {

  }
</style>
