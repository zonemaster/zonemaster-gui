<script lang="ts">
    import * as m from '@/paraglide/messages';
</script>

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
