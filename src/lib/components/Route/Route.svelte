<script lang="ts">
  import type {Snippet} from "svelte";
  import { location } from '@/lib/router.svelte.js';

  type Props = {
    path: string;
    children: Snippet;
  };

  const { path, children }: Props = $props();

  let match = $derived.by(() => {
    const regex = new RegExp(path.replace(/:\w+/g, '([^/]+)'));

    return regex.test(location.pathname);
  });
</script>

{#if match}
  {@render children?.()}
{/if}
