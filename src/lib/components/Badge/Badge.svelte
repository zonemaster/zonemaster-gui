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
<span class="zm-badge {level.toLowerCase()}" class:round={round}>
  {@render children?.()}
</span>
<style>
    .zm-badge {
        background: var(--color-muted);
        color: var(--color-palette-white);
        font-size: var(--font-s);
        font-weight: bold;
        border-radius: var(--border-radius);
        padding: var(--spacing-xxs) var(--spacing-xs);

        &.info {
            background: var(--color-palette-success-50);
        }

        &.notice {
            background: var(--color-palette-info-50);
        }

        &.warning {
            background: var(--color-palette-warning-50);
            color: var(--color-palette-black);
        }

        &.error {
            background: var(--color-palette-error-50);
        }

        &.critical {
            background: var(--color-palette-error-70);
        }

        &.round {
            border-radius: 50%;
            font-size: var(--font-xs);
        }
    }
</style>
