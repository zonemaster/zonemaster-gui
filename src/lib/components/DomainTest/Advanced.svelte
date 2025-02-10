<script>
  import Grid from "@/lib/components/Grid/Grid.svelte";
  import Input from "@/lib/components/Input/Input.svelte";
  import Button from "@/lib/components/Button/Button.svelte";
  import Stack from "@/lib/components/Stack/Stack.svelte";
</script>

<fieldset>
  <legend>Nameservers</legend>
  <Stack vertical left gap="s">
    <Grid cols={2}>
      <div>
        <Input type="text" placeholder="ns1.example.com" label="Name" />
      </div>
      <div>
        <Input type="text" placeholder="" label="Address (optional)" />
      </div>
    </Grid>
    <Button variant="secondary" type="button">Fetch nameservers from parent zone</Button>
  </Stack>
</fieldset>
<style>
  fieldset {
    all: unset;
    display: block;
  }
</style>
