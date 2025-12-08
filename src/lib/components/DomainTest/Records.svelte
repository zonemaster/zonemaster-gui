<script lang="ts">
    import * as m from '@/messages';
    import Grid from '@/lib/components/Grid/Grid.svelte';
    import Input from '@/lib/components/Input/Input.svelte';
    import Button from '@/lib/components/Button/Button.svelte';
    import Stack from '@/lib/components/Stack/Stack.svelte';
    import utils from '@/lib/utils.module.css';
    import Select from '@/lib/components/Select/Select.svelte';
    import { fetchFromParent } from '@/lib/client.ts';
    import { warn } from '@/lib/alert.svelte.ts';
    import { getValidationErrorByPath } from '@/lib/getValidationErrorByPath.ts';
    import { machine } from '@/lib/machine.svelte.ts';

    let { currentContext } = $derived(machine);
    let fetchingZoneData = $state(false);
    const algorithms = [
        { value: '1', name: '1 - RSAMD5' },
        { value: '3', name: '3 - DSA' },
        { value: '5', name: '5 - RSASHA1' },
        { value: '6', name: '6 - DSA-NSEC3-SHA1' },
        { value: '7', name: '7 - RSASHA1-NSEC3-SHA1' },
        { value: '8', name: '8 - RSASHA256' },
        { value: '10', name: '10 - RSASHA512' },
        { value: '12', name: '12 - ECC-GOST' },
        { value: '13', name: '13 - ECDSAP256SHA256' },
        { value: '14', name: '14 - ECDSAP384SHA384' },
        { value: '15', name: '15 - ED25519' },
        { value: '16', name: '16 - ED448' }
    ];

    const digestTypes = [
        { value: '1', name: '1 - SHA-1' },
        { value: '2', name: '2 - SHA-256' },
        { value: '3', name: '3 - GOST R 34.11-94' },
        { value: '4', name: '4 - SHA-384' }
    ];

    let records = $state([
        { keytag: '', algorithm: '', digestType: '', digest: '' }
    ]);

    // On input change, append a new empty nameserver
    function addRow() {
        records = [...records, { keytag: '', algorithm: '', digestType: '', digest: '' }];
    }

    // On input change, update the nameserver at the given index
    function updateRow(index: number, key: string, value: string): void {
        records = records.map((ns, i) => {
            if (i === index) {
                return { ...ns, [key]: value };
            }
            return ns;
        });

        if (index === records.length - 1 && value) {
            addRow();
        }
    }

    function removeRow(index: number): void {
        if (records.length < 2) {
            return;
        }

        records = records.filter((_, i) => i !== index);
    }

    function fetch(e: Event) {
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
                if (!data.ds_list || !data.ds_list.length) {
                    warn(m.noDSRecords());

                    return;
                }

                records = data.ds_list.map((post) => ({
                    keytag: post.keytag.toString(),
                    algorithm: post.algorithm.toString(),
                    digestType: post.digtype.toString(),
                    digest: post.digest
                }));
            })
            .finally(() => {
                fetchingZoneData = false;
            });
    }

    function reset() {
        records = [{ keytag: '', algorithm: '', digestType: '', digest: '' }];
    }

    $effect(() => {
        document.getElementById('zmDomainTestForm')?.addEventListener('reset', reset);

        return () => {
            document.getElementById('zmDomainTestForm')?.removeEventListener('reset', reset);
        };
    });
</script>
<fieldset class="zm-domain-test__records">
    <legend>{m.DSRecords()}</legend>
    <Stack vertical gap="s">
        {#each records as r, i}
            <fieldset class="zm-domain-test__ds-record zm-fieldset" id="zmDsRecord-{i + 1}">
                <legend>{m.dsRecord({ index: i + 1 })}</legend>
                <Stack gap="xs" class={utils.expand}>
                    <Grid cols={4} gap="xs">
                        <div>
                            <Input
                                name="ds_info[{i}][keytag]"
                                type="text"
                                value={r.keytag}
                                label={m.keytag()}
                                onInput={(e) => updateRow(i, 'keytag', e.currentTarget.value)}
                                error={getValidationErrorByPath(currentContext.error, `/ds_info/${i}/keytag`)}
                            />
                        </div>
                        <div>
                            <Select
                                name="ds_info[{i}][algorithm]"
                                value={r.algorithm}
                                label={m.algorithm()}
                                onSelect={(e) => updateRow(i, 'algorithm', e.currentTarget.value)}
                                options={algorithms}
                            />
                        </div>
                        <div>
                            <Select
                                name="ds_info[{i}][digtype]"
                                value={r.digestType}
                                label={m.digestType()}
                                onSelect={(e) => updateRow(i, 'digestType', e.currentTarget.value)}
                                options={digestTypes}
                            />
                        </div>
                        <div>
                            <Input
                                name="ds_info[{i}][digest]"
                                value={r.digest}
                                type="text"
                                label={m.digest()}
                                onInput={(e) => updateRow(i, 'digest', e.currentTarget.value)}
                                error={getValidationErrorByPath(currentContext.error, `/ds_info/${i}/digest`)}
                            />
                        </div>
                    </Grid>
                    {#if records.length > 1}
                        <div>
                            <span class="zm-label zm-label--hidden" role="presentation">–</span>
                            <Button aria-controls="zmDsRecord-{i + 1}" variant="danger" type="button" onClick={() => removeRow(i)}>
                                <i class="bi bi-trash"></i>
                                <span class="zm-u-visually-hidden">{m.deleteDSRecord({ index: i + 1 })}</span>
                            </Button>
                        </div>
                    {/if}
                </Stack>
            </fieldset>
        {/each}
        <Button
            class={utils.selfLeft}
            variant="secondary"
            size="small"
            type="button"
            onClick={fetch}
            disabled={fetchingZoneData}
        >
            {m.fetchDSRecords()}
        </Button>
    </Stack>
</fieldset>
