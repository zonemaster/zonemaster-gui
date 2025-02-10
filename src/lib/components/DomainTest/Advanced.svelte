<script>
  import Records from "@/lib/components/DomainTest/Records.svelte";
  import Nameservers from "@/lib/components/DomainTest/Nameservers.svelte";
  import General from "@/lib/components/DomainTest/General.svelte";
  import Button from "@/lib/components/Button/Button.svelte";
</script>
<Nameservers />
<hr />
<Records />
<hr />
<General />
<Button variant="danger" type="reset">Reset the form</Button>
