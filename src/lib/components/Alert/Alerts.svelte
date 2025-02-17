<script lang="ts">
  import {alerts, removeAlert} from "@/lib/alert.svelte.ts";
  import Alert from "@/lib/components/Alert/Alert.svelte";
</script>
<div style:position="fixed" style:top="var(--spacing-m)" style:right="var(--spacing-m)" style:left="var(--spacing-m)" style:z-index="1000">
  {#each alerts as {id, message, severity}}
    <Alert {severity} onRemove={() => removeAlert(id)}>{message}</Alert>
  {/each}
</div>
