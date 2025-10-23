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
                <input type="radio" name="disabledIpType" value="ipv4" />
                {m.disable()} IPv4
            </label>
            <label>
                <input type="radio" name="disabledIpType" value="ipv6" />
                {m.disable()} IPv6
            </label>
        </fieldset>
        <div>
            <Select
                name="profile"
                value={profiles.length ? profiles[0].value : undefined}
                label={m.profile()}
                onSelect=""
                options={profiles}
            />
        </div>
    </Grid>
</Stack>
