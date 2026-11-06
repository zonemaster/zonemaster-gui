<script lang="ts">
    import { onMount } from 'svelte';
    import { getLocale } from '@/messages';
    import BatchTest, {
        type BatchTestEntry,
    } from '@/lib/components/BatchTest/BatchTest.svelte';

    let active = $state(false);

    const mockTestIds = [
        'a3f7c91e5b2d8f64',
        'd84e2a7c1f956b30',
        '6b1d4f9a8c32e705',
        'f29c6e3b0a84d157',
        '4e8a1d7f5c90b263',
        'c715b4e8a2f9360d',
        '9d3f7a1c6e84b250',
        '2a6e9c4f1b73d805',
        'e5b0d28a7f1c9463',
        '7c4a9e15b2d860f3',
    ];

    const tests: BatchTestEntry[] = Array.from({ length: 10 }, (_, index) => {
        const id = mockTestIds[index];

        return {
            domain: `batch-domain-${String(index + 1).padStart(2, '0')}.example`,
            id,
            status: index < 6 ? 'finished' : index < 8 ? 'failed' : 'ongoing',
            resultUrl:
                index < 8
                    ? `${import.meta.env.BASE_URL}${getLocale()}/result/${id}/`
                    : undefined,
        };
    });

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
