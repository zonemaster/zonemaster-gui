<script lang="ts">
    type ButtonOption = {
        key: string;
        value: string;
    };

    type Props = {
        options: ButtonOption[];
        active?: string;
        onChange?: (key: string) => void;
        [key: string]: any;
    };

    const {
        options = [],
        active,
        onChange = () => {},
    }: Props = $props();
</script>

<div
    class={['zm-button-group']}
>
    {#each options as option}
        <button
            type="button"
            class={['zm-button-group__button', active === option.key ? 'zm-button-group__button--active' : '']}
            onclick={() => onChange(option.key)}
        >
            {option.value}
        </button>
    {/each}
</div>
