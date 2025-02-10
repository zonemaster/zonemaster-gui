<script>
  import Grid from "@/lib/components/Grid/Grid.svelte";
  import Input from "@/lib/components/Input/Input.svelte";
  import Button from "@/lib/components/Button/Button.svelte";
  import Stack from "@/lib/components/Stack/Stack.svelte";
  import utils from '@/lib/utils.module.css';

  let nameservers = $state([
    { name: '', address: '' },
  ]);

  // On input change, append a new empty nameserver
  function addNameserver() {
    nameservers = [...nameservers, { name: '', address: '' }];
  }

  // On input change, update the nameserver at the given index
  function updateNameserver(index, key, value) {
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

  function removeNameserver(index) {
    if (nameservers.length < 2) {
      return;
    }

    nameservers = nameservers.filter((_, i) => i !== index);
  }
</script>

<fieldset>
  <legend>Nameservers</legend>
  <Stack vertical gap="s">
    {#each nameservers as ns, i}
      <Stack bottom gap="xs" class={utils.expand}>
        <Grid cols={2} gap="xs">
          <div>
            <Input type="text" value={ns.name} placeholder="ns1.example.com" label={i === 0 ? 'Name' : null} onInput={(e) => updateNameserver(i, 'name', e.target.value)} />
          </div>
          <div>
            <Input value={ns.address} type="text" placeholder=""  label={i === 0 ? 'Address (optional)' : null} onInput={(e) => updateNameserver(i, 'address', e.target.value)} />
          </div>
        </Grid>
        {#if nameservers.length > 1}
          <Button variant="secondary" type="button" onClick={() => removeNameserver(i)}>
            <i class="bi bi-trash"></i>
          </Button>
        {/if}
      </Stack>
    {/each}
    <Button class={utils.selfLeft} variant="secondary" type="button">Fetch nameservers from parent zone</Button>
  </Stack>
</fieldset>
<style>
  fieldset {
    all: unset;
    display: block;
  }
</style>
