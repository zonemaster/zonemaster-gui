<svelte:options customElement={{ tag: 'zm-program-versions', shadow: 'none' }} />
<script lang="ts">
  import * as m from '@/paraglide/messages';
  import {versionInfo} from "@/lib/client.ts";
  import {error} from "@/lib/alert.svelte.ts";
  import Switch from '@/lib/components/Switch/Switch.svelte';
  import config from '@/lib/config.ts';

  type Version = {
    key: string;
    value: string;
  };

  type Data = {
    [key: string]: string;
  };

  let versions: Version[] = $state([]);
  let loading = $state(true);
  let version = $state(false);

  $effect(() => {
    versionInfo().then((data: Data) => {
      versions = Object.entries(data).map(([key, value]) => ({key, value}));
    }).catch((err) => {
      error('Failed to fetch version information');
    }).finally(() => {
      loading = false;
    });
  });
</script>

{#if loading}
  <p>Loading...</p>
{:else}
  <Switch id="program-versions-toggle" controls="program-versions" active={version} onClick={() => version = !version}>
      {m.programVersions()}
  </Switch>
  <ul id="program-versions" hidden={!version}>
    {#each versions as {key, value}}
      <li>{key}: {value}</li>
    {/each}
      <li>Zonemaster-GUI: {config.clientInfo.version}</li>
  </ul>
{/if}

