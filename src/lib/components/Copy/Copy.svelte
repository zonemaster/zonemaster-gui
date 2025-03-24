<script lang="ts">
    import { onMount } from 'svelte';

    export let value: string;

    let copied = false;
    let timeout: ReturnType<typeof setTimeout>;

    function copyToClipboard() {
        navigator.clipboard.writeText(value)
            .then(() => {
                copied = true;

                // Reset the copied state after 2 seconds
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    copied = false;
                }, 2000);
            })
            .catch((err) => {
                console.error('Failed to copy text: ', err);
            });
    }

    onMount(() => {
        return () => {
            clearTimeout(timeout);
        };
    });
</script>

<button
    class="copy-button"
    on:click={copyToClipboard}
    aria-label={copied ? "Copied" : "Copy to clipboard"}
    title={copied ? "Copied" : "Copy to clipboard"}
>
    {#if copied}
        <div class="icon">
            <i class="bi bi-check"></i>
        </div>
    {:else}
        <div class="icon">
            <i class="bi bi-clipboard"></i>
        </div>
    {/if}
</button>

<style>
    .copy-button {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--color-text, #333);
        transition: background-color 0.2s ease;
    }

    .copy-button:hover {
        background-color: var(--color-background-hover, rgba(0, 0, 0, 0.05));
    }

    .copy-button:focus {
        outline: 2px solid var(--color-primary, #4d7c0f);
        outline-offset: 2px;
    }

    .icon {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
