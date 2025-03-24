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
            <i class="bi bi-check-lg"></i>
        </div>
    {:else}
        <div class="icon">
            <i class="bi bi-clipboard-fill"></i>
        </div>
    {/if}
</button>

<style>
    .copy-button {
        background: var(--color-palette-main-70);
        border: none;
        cursor: pointer;
        padding: 0  var(--button-padding);
        border-radius: var(--border-radius);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--color-palette-white);
        transition: background-color 0.2s ease;
        font-size: var(--button-font-size);
    }

    .copy-button:hover {
        background: var(--color-palette-main-90);
    }

    .icon {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
