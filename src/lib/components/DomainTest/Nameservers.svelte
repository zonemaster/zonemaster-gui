<script lang="ts">
    import * as m from '@/paraglide/messages';
    import Grid from '@/lib/components/Grid/Grid.svelte';
    import Input from '@/lib/components/Input/Input.svelte';
    import Button from '@/lib/components/Button/Button.svelte';
    import Stack from '@/lib/components/Stack/Stack.svelte';
    import utils from '@/lib/utils.module.css';
    import { fetchFromParent } from '@/lib/client.ts';
    import { warn } from '@/lib/alert.svelte.ts';

    let fetchingZoneData = $state(false);
    let nameservers = $state([
        { ns: '', ip: '' }
    ]);

    // On input change, append a new empty nameserver
    function addNameserver() {
        nameservers = [...nameservers, { ns: '', ip: '' }];
    }

    // On input change, update the nameserver at the given index
    function updateNameserver(index: number, key: string, value: string): void {
        nameservers = nameservers.map((ns, i) => {
            if (i === index) {
                return { ...ns, [key]: value };
            }
            return ns;
        });

        if (index === nameservers.length - 1 && value) {
            addNameserver();
        }
    }

    function removeNameserver(index: number): void {
        if (nameservers.length < 2) {
            return;
        }

        nameservers = nameservers.filter((_, i) => i !== index);
    }

    function fetch(e: Event): void {
        const target = e.target as HTMLButtonElement;
        const form = target.closest('form');

        if (!form) {
            return;
        }

        const input = form.querySelector('input[name="domain"]') as HTMLInputElement;
        const domain = input.value;

        fetchingZoneData = true;

        fetchFromParent(domain)
            .then((data) => {
                if (!data.ns_list || !data.ns_list.length) {
                    warn(m.noNameServers());

                    return;
                }

                nameservers = data.ns_list.map((ns) => ({
                    ns: ns.ns,
                    ip: ns.ip || '',
                }));
            })
            .finally(() => {
                fetchingZoneData = false;
            });
    }

    function reset() {
        nameservers = [{ ns: '', ip: '' }];
    }

    $effect(() => {
        document.getElementById('zmDomainTestForm')?.addEventListener('reset', reset);

        return () => {
            document.getElementById('zmDomainTestForm')?.removeEventListener('reset', reset);
        };
    });
</script>

<fieldset class="zm-domain-test__nameservers">
    <legend>{m.nameServers()}</legend>
    <Stack vertical gap="s">
        {#each nameservers as ns, i}
            <Stack bottom gap="xs" class={utils.expand}>
                <Grid cols={2} gap="xs">
                    <div>
                        <Input
                            name="nameservers[{i}][ns]"
                            type="text"
                            value={ns.ns}
                            placeholder="ns1.example.com"
                            label={i === 0 ? m.name() : undefined}
                            onInput={(e) => updateNameserver(i, 'ns', e.currentTarget.value)}
                        />
                    </div>
                    <div>
                        <Input
                            name="nameservers[{i}][ip]"
                            value={ns.ip}
                            type="text"
                            placeholder=""
                            label={i === 0 ? m.addressOptional() : undefined}
                            onInput={(e) => updateNameserver(i, 'ip', e.currentTarget.value)}
                        />
                    </div>
                </Grid>
                {#if nameservers.length > 1}
                    <Button variant="secondary" type="button" onClick={() => removeNameserver(i)}>
                        <i class="bi bi-trash"></i>
                        <span class="zm-u-visually-hidden">{m.deleteRow()}</span>
                    </Button>
                {/if}
            </Stack>
        {/each}
        <Button
            class={utils.selfLeft}
            variant="secondary"
            size="small"
            type="button"
            onClick={fetch}
            disabled={fetchingZoneData}
        >
            {fetchingZoneData ? m.fetching() : m.fetchNameservers()}
        </Button>
    </Stack>
</fieldset>
