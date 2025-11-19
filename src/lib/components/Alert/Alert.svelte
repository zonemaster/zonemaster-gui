<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { Severity } from '@/lib/alert.svelte.ts';
    import Button from '../Button/Button.svelte';
    import * as m from '@/paraglide/messages';

    type Props = {
        severity: Severity;
        variant?: 'primary' | 'centered';
        children?: Snippet;
        onRemove?: () => void;
    };

    const { severity = 'info', variant = 'primary', children, onRemove }: Props = $props();
</script>
<div role="alert" class="zm-alert zm-alert--{severity} zm-alert--{variant}">
    <p>{@render children?.()}</p>
    {#if onRemove}
        <Button aria-label={m.close()} class="zm-button alert-close" variant="transparent" onclick={onRemove}>
            <span aria-hidden="true"><i class="bi bi-x-lg"></i></span>
        </Button>
    {/if}
</div>
