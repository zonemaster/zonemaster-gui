<script>
    import Records from '@/lib/components/DomainTest/Records.svelte';
    import Nameservers from '@/lib/components/DomainTest/Nameservers.svelte';
    import General from '@/lib/components/DomainTest/General.svelte';
    import Button from '@/lib/components/Button/Button.svelte';
    import Alert from '@/lib/components/Alert/Alert.svelte';
</script>
<Alert variant="centered">
    Notice! More info on undelegated test<br>
    <a href="#">What is an undelegated domain test?</a>
</Alert>
<Nameservers />
<hr />
<Records />
<hr />
<General />
<Button variant="danger" type="reset">Reset the form</Button>
