<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { ResultLevel } from '@/lib/client.ts';

    type Props = {
        level?: ResultLevel | 'default';
        children?: Snippet;
        round?: boolean;
        border?: boolean;
        size?: 'small' | 'medium';
    };

    let {
        children,
        level = 'default',
        round = false,
        size = 'medium',
        border = false,
    }: Props = $props();
</script>
<span class={['zm-badge', `zm-bg-${level.toLowerCase()}`, `zm-badge--${size}`, round ? 'zm-badge--round' : false, border ? 'zm-badge--border' : false]}>
  {@render children?.()}
</span>
