<script>
  import Grid from "@/lib/components/Grid/Grid.svelte";
  import Input from "@/lib/components/Input/Input.svelte";
  import Button from "@/lib/components/Button/Button.svelte";
  import Stack from "@/lib/components/Stack/Stack.svelte";
  import utils from '@/lib/utils.module.css';
  import Select from "@/lib/components/Select/Select.svelte";

  const algorithms = [
    { value: '1', name: 'RSAMD5' },
    { value: '2', name: 'DSA' },
    { value: '5', name: 'RSASHA1' },
    { value: '6', name: 'DSA-NSEC3-SHA1' },
    { value: '7', name: 'RSASHA1-NSEC3-SHA1' },
    { value: '8', name: 'RSASHA256' },
    { value: '10', name: 'RSASHA512' },
    { value: '12', name: 'ECC-GOST' },
    { value: '13', name: 'ECDSAP256SHA256' },
    { value: '14', name: 'ECDSAP384SHA384' },
    { value: '15', name: 'ED25519' },
    { value: '16', name: 'ED448' },
  ];

  const digestTypes = [
    { value: '1', name: 'SHA-1' },
    { value: '2', name: 'SHA-256' },
    { value: '3', name: 'GOST R 34.11-94' },
    { value: '4', name: 'SHA-384' },
  ];

  let records = $state([
    { keytag: '', algorithm: '', digestType: '', digest: '' },
  ]);

  // On input change, append a new empty nameserver
  function addRow() {
    records = [...records, { keytag: '', algorithm: '', digestType: '', digest: '' }];
  }

  // On input change, update the nameserver at the given index
  function updateRow(index, key, value) {
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

  function removeRow(index) {
    if (records.length < 2) {
      return;
    }

    records = records.filter((_, i) => i !== index);
  }
</script>
<fieldset class="zm-records">
  <legend>DS Records</legend>
  <Stack vertical gap="s">
    {#each records as r, i}
      <Stack bottom gap="xs" class={utils.expand}>
        <Grid cols={4} gap="xs">
          <div>
            <Input type="text" value={r.keytag} label={i === 0 ? 'Keytag' : null} onInput={(e) => updateRow(i, 'keytag', e.target.value)} />
          </div>
          <div>
            <Select value={r.algorithm} label={i === 0 ? 'Algorithm' : null} onSelect={(e) => updateRow(i, 'algorithm', e.target.value)} options={algorithms} />
          </div>
          <div>
            <Select value={r.digestType} label={i === 0 ? 'Digest Type' : null} onSelect={(e) => updateRow(i, 'digestType', e.target.value)} options={digestTypes} />
          </div>
          <div>
            <Input value={r.digest} type="text"  label={i === 0 ? 'Digest' : null} onInput={(e) => updateRow(i, 'digest', e.target.value)} />
          </div>
        </Grid>
        {#if records.length > 1}
          <Button variant="secondary" type="button" onClick={() => removeRow(i)}>
            <i class="bi bi-trash"></i>
          </Button>
        {/if}
      </Stack>
    {/each}
    <Button class={utils.selfLeft} variant="secondary" size="small" type="button">Fetch DS from parent zone</Button>
  </Stack>
</fieldset>
<style>
  .zm-records {
    all: unset;
    display: block;
    padding-top: calc(var(--rhythm) / 2);

    legend {
      font-weight: 700;
    }
  }
</style>
