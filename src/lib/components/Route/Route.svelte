<script lang="ts">
  import type {Snippet} from "svelte";

  type Props = {
    path: string;
    children: Snippet;
  };

  const { path, children }: Props = $props();

  let match = $derived.by(() => {
    const regex = new RegExp(path.replace(/:\w+/g, '([^/]+)'));

    return regex.test(path);
  });
</script>

{#if match}
  {@render children?.()}
{/if}
