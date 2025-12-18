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
    class={['zm-button', `zm-button--${variant}`, `zm-button--${size}`, className]}
    onclick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
    aria-controls={ariaControls}
    {...restProps}
>
    {@render children?.()}
</button>
