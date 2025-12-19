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
    class="zm-copy"
    on:click={copyToClipboard}
    aria-label={copied ? "Copied" : "Copy to clipboard"}
    title={copied ? "Copied" : "Copy to clipboard"}
>
    {#if copied}
        <i class="bi bi-check-lg"></i>
    {:else}
        <i class="bi bi-clipboard-fill"></i>
    {/if}
</button>
