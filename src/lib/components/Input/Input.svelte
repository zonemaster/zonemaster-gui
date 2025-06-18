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
        matchContentWidth?: boolean;
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
        matchContentWidth = false,
        ...restProps
    }: Props = $props();

    let inputWidth = $state(0);

    $effect(() => {
        if (matchContentWidth) {
            const mirror = document.createElement('span');

            mirror.style.visibility = 'hidden';
            mirror.style.whiteSpace = 'pre';
            mirror.style.position = 'absolute';
            mirror.style.width = 'auto';
            mirror.className = `zm-input zm-input--${size}`;
            mirror.textContent = value || placeholder || '';

            document.body.appendChild(mirror);

            setTimeout(() => {
                inputWidth = mirror.offsetWidth;
                document.body.removeChild(mirror);
            }, 0);
        }
    });
</script>

{#if label}
    <label for={id} class="zm-label">{label}</label>
{/if}
<input name={name} id={id} bind:value={value} type={type} class={['zm-input', `zm-input--${size}`, className]} disabled={disabled}
       placeholder={placeholder} oninput={onInput} style="min-width: {inputWidth}px" {...restProps} />
