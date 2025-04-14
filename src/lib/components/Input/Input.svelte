<script lang="ts">
    type Props = {
        type?: string;
        size?: 'small' | 'large';
        name: string;
        value?: string;
        placeholder?: string;
        label?: string;
        id?: string;
        disabled?: boolean;
        onInput?: (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => void;
        class?: string;
        [x: string]: unknown;
    };

    let {
        type = 'text',
        size = 'large',
        value = $bindable(),
        name,
        placeholder,
        label,
        disabled,
        id,
        onInput,
        class: className = '',
        ...restProps
    }: Props = $props();
</script>

{#if label}
    <label for={id} class="zm-label">{label}</label>
{/if}
<input name={name} id={id} bind:value={value} type={type} class={['zm-input', `zm-input--${size}`, className]} disabled={disabled}
       placeholder={placeholder} oninput={onInput} {...restProps} />
