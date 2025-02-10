<script lang="ts">
  import type {Snippet} from "svelte";

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
  <button type="button" id="{id}" aria-controls="{controls || null}" class="switch-toggle" aria-expanded={active} aria-labelledby="{id}-label" onclick={onClick}></button>
  <label for="{id}" id="{id}-label">{@render children?.()}</label>
</div>
