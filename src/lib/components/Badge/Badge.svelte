<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { ResultLevel } from '@/lib/client.ts';

    type Props = {
        level: ResultLevel
        children?: Snippet;
        round?: boolean;
    };

    let {
        children,
        level,
        round = false
    }: Props = $props();
</script>
<span class={['zm-badge', `zm-bg-${level.toLowerCase()}`, round ? 'zm-badge--round' : false]}>
  {@render children?.()}
</span>
