<script lang="ts">
  import {versionInfo} from "@/lib/client.ts";

  type Version = {
    key: string;
    value: string;
  };

  type Data = {
    [key: string]: string;
  };

  let versions: Version[] = $state([]);

  $effect(() => {
    versionInfo().then((data: Data) => {
      versions = Object.entries(data).map(([key, value]) => ({key, value}));
    });
  });
</script>
<ul>
  {#each versions as {key, value}}
    <li>{key}: {value}</li>
  {/each}
</ul>
