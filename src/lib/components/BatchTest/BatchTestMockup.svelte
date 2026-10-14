<script lang="ts">
    import { onMount } from 'svelte';
    import { getLocale } from '@/messages';
    import BatchTest, {
        type BatchTestEntry,
    } from '@/lib/components/BatchTest/BatchTest.svelte';

    let active = $state(false);

    const tests: BatchTestEntry[] = Array.from({ length: 10 }, (_, index) => ({
        domain: `batch-domain-${String(index + 1).padStart(2, '0')}.example`,
        status: index < 6 ? 'finished' : index < 8 ? 'failed' : 'ongoing',
        resultUrl:
            index < 8
                ? `${import.meta.env.BASE_URL}${getLocale()}/result/batch-mock-${index + 1}/`
                : undefined,
    }));

    onMount(() => {
        const showMockup = () => {
            active = true;
        };

        document.addEventListener('zm:show-batch-test-mockup', showMockup);

        return () => {
            document.removeEventListener('zm:show-batch-test-mockup', showMockup);
        };
    });
</script>

{#if active}
    <BatchTest {tests} />
{/if}
