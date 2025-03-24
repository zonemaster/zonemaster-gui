<script lang="ts">
    import type { Snippet } from 'svelte';

    type Props = {
        type?: 'button' | 'submit' | 'reset';
        variant?: 'primary' | 'secondary' | 'danger' | 'transparent';
        size?: 'small' | 'large';
        disabled?: boolean;
        children?: Snippet;
        onClick?: (e: Event) => void;
        ariaLabel?: string;
        class?: string;
        [key: string]: any;
    };

    const {
        type = 'button',
        variant = 'primary',
        size = 'large',
        onClick,
        disabled,
        children,
        ariaLabel,
        ariaControls = null,
        class: className = '',
        ...restProps
    }: Props = $props();
</script>

<button
    type={type}
    class={['zm-button', variant, size, className]}
    onclick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
    aria-controls={ariaControls}
    {...restProps}
>
    {@render children?.()}
</button>

<style>
    .zm-button {
        position: relative;
        display: inline-flex;
        padding: 0 var(--button-padding);
        align-items: center;
        justify-content: center;
        gap: var(--spacing-xs);
        height: var(--button-size);
        border: 1px solid var(--button-color);
        border-radius: var(--border-radius);
        background-color: var(--button-color);
        text-decoration: none;
        color: var(--button-text-color);
        font-size: var(--button-font-size);
        font-weight: 700;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;

        &:hover,
        &:focus {
            background-color: var(--color-palette-main-70);
            border-color: var(--color-palette-main-70);
        }

        &[disabled] {
            background: var(--color-disabled);
            color: var(--color-muted-text);
            border-color: var(--button-border-color-disabled);
            text-shadow: 0 1px 0 var(--color-palette-black-0);
            cursor: not-allowed;
        }
    }

    .secondary {
        background: var(--color-palette-black-30);
        border-color: var(--color-palette-black-40);
        color: var(--color-palette-black-90);

        &:hover,
        &:focus {
            background: var(--color-palette-black-40);
            border-color: var(--color-palette-black-40);
        }
    }

    .danger {
        background: var(--color-palette-danger-50);
        border-color: var(--color-palette-danger-50);
        color: var(--color-palette-white);

        &:hover,
        &:focus {
            background-color: var(--color-palette-danger-70);
            border-color: var(--color-palette-danger-70);
        }
    }

    .small {
        font-size: var(--button-font-size-small);
        height: var(--button-size-small);
    }

    .transparent {
        background: transparent;
        border-color: transparent;
        color: var(--color-palette-black);
        padding-left: 0;
        padding-right: 0;

        &:hover,
        &:focus {
            background-color: transparent;
            border-color: transparent;
            color: var(--color-palette-main-70);
        }
    }
</style>
