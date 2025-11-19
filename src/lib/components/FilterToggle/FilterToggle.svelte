<script lang="ts">
  type Props = {
    value?: string;
    label: string;
    badge?: number;
    icon?: string;
    name: string;
    checked: boolean;
    severity?: 'all' | 'info' | 'notice' | 'warning' | 'error' | 'critical';
    onCheck?: (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => void;
  };

  let {
    badge,
    label,
    value,
    icon,
    severity = 'all',
    checked = $bindable(false),
    onCheck = () => {},
  }: Props = $props();
</script>
<label class={['zm-filter-toggle', { ['zm-is-active']: checked }, `zm--${severity}`]}>
  <input type="checkbox" bind:checked={checked} onchange={onCheck} value={value} />
  {label}
  {#if badge !== undefined}
    <span class="zm-filter-toggle__badge">
        {#if icon}
          <i class={`bi bi-${icon}`}></i>
        {/if}
        {badge}
    </span>
  {/if}
</label>
