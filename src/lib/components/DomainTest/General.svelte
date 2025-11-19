<script lang="ts">
    import * as m from '@/paraglide/messages';
    import Stack from '@/lib/components/Stack/Stack.svelte';
    import Grid from '@/lib/components/Grid/Grid.svelte';
    import Select from '@/lib/components/Select/Select.svelte';
    import { profileNames } from '@/lib/client.ts';

    const profiles = $state<Array<{ value: string; name: string }>>([]);

    $effect(() => {
        profileNames().then((names) => {
            profiles.splice(
                0,
                profiles.length,
                ...names.map((name) => ({
                    value: name,
                    name,
                })),
            );
        });
    });
</script>

<Stack gap="xs">
    <Grid cols={2} gap="xs">
        <fieldset class="zm-domain-test__general">
            <legend>{m.general()}</legend>
            <label>
                <input type="radio" name="iptype" value="both" checked />
                {m.ipv4AndIpv6()}
            </label>
            <label>
                <input type="radio" name="iptype" value="ipv4" />
                IPv4 {m.only()}
            </label>
            <label>
                <input type="radio" name="iptype" value="ipv6" />
                IPv6 {m.only()}
            </label>
        </fieldset>
        {#if profiles.length > 1}
            <div>
                <Select
                    name="profile"
                    value="default"
                    label={m.profile()}
                    options={profiles}
                />
            </div>
        {/if}
    </Grid>
</Stack>
