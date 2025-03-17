<fieldset class="zm-general">
    <legend>General</legend>
    <label>
        <input type="radio" name="disabledIpType" value="ipv4" />
        Disable IPv4
    </label>
    <label>
        <input type="radio" name="disabledIpType" value="ipv6" />
        Disable IPv6
    </label>
</fieldset>
<style>
    .zm-general {
        all: unset;
        display: block;
        padding-top: calc(var(--rhythm) / 2);
        margin-bottom: var(--rhythm);

        legend {
            font-weight: 700;
        }

        label {
            cursor: pointer;
            margin-right: var(--rhythm);
        }
    }
</style>
