<script lang="ts">
  import {versionInfo} from "@/lib/client.ts";
  import {error} from "@/lib/alert.svelte.ts";

  type Version = {
    key: string;
    value: string;
  };

  type Data = {
    [key: string]: string;
  };

  let versions: Version[] = $state([]);
  let loading = $state(true);

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
<ul>
  {#each versions as {key, value}}
    <li>{key}: {value}</li>
  {/each}
</ul>
{/if}
