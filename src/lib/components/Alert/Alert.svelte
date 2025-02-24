<script lang="ts">
  import type { Snippet } from 'svelte';
  import type {Severity} from "@/lib/alert.svelte.ts";
  import Button from '../Button/Button.svelte';
  import * as m from '@/paraglide/messages';

  type Props = {
    severity: Severity;
    children?: Snippet;
    onRemove?: () => void;
  };

  const { severity = 'info', children, onRemove }: Props = $props();
</script>
<div role="alert" class="zm-alert {severity}">
  <p>{@render children?.()}</p>
  {#if onRemove}
    <Button aria-label={m.close()} class="zm-button alert-close" variant="transparent" onclick={onRemove}>
      <span aria-hidden="true"><i class="bi bi-x-lg"></i></span>
    </Button>
  {/if}
</div>

<style>
  .zm-alert {
    --alert-bg: var(--color-palette-info-10);
    --alert-border: var(--color-palette-info-50);
    --alert-text-color: var(--color-palette-info-90);

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-s);
    background: var(--alert-bg);
    border: 1px solid var(--alert-border);
    border-radius: var(--border-radius);
    color: var(--alert-text-color);
  }

  .success {
    --alert-bg: var(--color-palette-success-10);
    --alert-border: var(--color-palette-success-50);
    --alert-text-color: var(--color-palette-success-90);
  }

  .warning {
    --alert-bg: var(--color-palette-warning-10);
    --alert-border: var(--color-palette-warning-50);
    --alert-text-color: var(--color-palette-warning-90);
  }

  .error {
    --alert-bg: var(--color-palette-danger-10);
    --alert-border: var(--color-palette-danger-50);
    --alert-text-color: var(--color-palette-danger-90);
  }
</style>
