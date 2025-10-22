<script lang="ts">
    import * as m from '@/paraglide/messages';
    import utils from '@/lib/utils.module.css';
    import Stack from '@/lib/components/Stack/Stack.svelte';
    import Grid from '@/lib/components/Grid/Grid.svelte';
    import Select from '@/lib/components/Select/Select.svelte';

    const profiles = [
        { value: '1', name: 'Profile 1' },
        { value: '2', name: 'Profile 2' }
    ];
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
                value="profile"
                label="{m.profile()}"
                onSelect=""
                options="{profiles}"
            />
        </div>
    </Grid>
</Stack>
