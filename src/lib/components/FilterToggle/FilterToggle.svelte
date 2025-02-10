<script lang="ts">
  type Props = {
    value?: string;
    label: string;
    badge?: string;
    name: string;
    checked: boolean;
    severity?: 'all' | 'info' | 'notice' | 'warning' | 'error' | 'critical';
    onCheck?: (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => void;
  };

  let {
    badge,
    label,
    value,
    severity = 'all',
    checked = $bindable(false),
    onCheck = () => {},
  }: Props = $props();
</script>
<label class={['zm-filter-toggle', { active: checked }, severity]}>
  <input type="checkbox" bind:checked={checked} onchange={onCheck} value={value} />
  {label}
  {#if badge}
    <span class="zm-filter-toggle-badge">{badge}</span>
  {/if}
</label>
<style>
  .zm-filter-toggle {
    --active-color: var(--color-subtle);
    --active-text-color: var(--color-text);
    --badge-color: var(--color-muted);

    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    cursor: pointer;
    border-radius: var(--border-radius);
    padding: var(--spacing-xs);
    font-weight: 500;

    &.active.info {
      --active-color: var(--color-palette-success-50);
      --active-text-color: var(--color-palette-success-0);
      --badge-color: var(--color-palette-success-70);
    }

    &.active.notice {
      --active-color: var(--color-palette-info-50);
      --active-text-color: var(--color-palette-info-0);
      --badge-color: var(--color-palette-info-70);
    }

    &.active.warning {
      --active-color: var(--color-palette-warning-50);
      --active-text-color: var(--color-palette-warning-0);
      --badge-color: var(--color-palette-warning-70);
    }

    &.active.error,
    &.active.critical {
      --active-color: var(--color-palette-danger-50);
      --active-text-color: var(--color-palette-danger-0);
      --badge-color: var(--color-palette-danger-70);
    }

    &.active {
      background: var(--active-color);
      color: var(--active-text-color);
    }
  }

  .zm-filter-toggle-badge {
    background: var(--badge-color);
    color: var(--color-palette-white);
    font-size: var(--font-xs);
    font-weight: bold;
    border-radius: 999px;
    padding: var(--spacing-xxs) var(--spacing-xs);
  }
</style>
