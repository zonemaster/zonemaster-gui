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
<input name={name} id={id} bind:value={value} type={type} class={['zm-input', size, className]} disabled={disabled}
       placeholder={placeholder} oninput={onInput} {...restProps} />

<style>
    .zm-input {
        all: unset;
        box-sizing: border-box;
        display: block;
        height: var(--input-height);
        padding: 0 var(--spacing-s);
        background: var(--color-background);
        border: 1px solid var(--color-border);
        border-radius: var(--border-radius);
        font-family: var(--font-body-family);
        min-width: 346px;
        font-size: var(--font-s);
        outline: none;
        width: 100%;
        position: relative;
        z-index: 1;
        color: var(--color-text);

        &:focus {
            box-shadow: 0 0 0 3px var(--color-border);
        }

        &:disabled {
            cursor: wait;
            position: relative;

            &::placeholder {
                color: var(--color-palette-black);
                opacity: 1;
            }
        }

        &.small {
            height: var(--input-height-small);
        }
    }
</style>
