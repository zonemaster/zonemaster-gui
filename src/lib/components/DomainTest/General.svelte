<script>
  import Grid from "@/lib/components/Grid/Grid.svelte";
  import Input from "@/lib/components/Input/Input.svelte";
  import Button from "@/lib/components/Button/Button.svelte";
  import Stack from "@/lib/components/Stack/Stack.svelte";
  import utils from '@/lib/utils.module.css';

  let disabledIpType = $state('');
</script>

<fieldset class="zm-general">
  <legend>General</legend>
  <label>
    <input type="radio" name="ipType" value="ipv4" bind:group={disabledIpType} />
    Disable IPv4
  </label>
  <label>
    <input type="radio" name="ipType" value="ipv6" bind:group={disabledIpType} />
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
