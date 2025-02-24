<script lang="ts">
  import type {ResultData} from "@/lib/client.ts";
  import Stack from "@/lib/components/Stack/Stack.svelte";
  import Button from "@/lib/components/Button/Button.svelte";
  import FilterToggle from "@/lib/components/FilterToggle/FilterToggle.svelte";

  type Props = {
    data: ResultData;
  };

  const { data }: Props = $props();

  let filterAll = $state(true);
  let filterInfo = $state(false);
  let filterNotice = $state(false);
  let filterWarning = $state(false);
  let filterError = $state(false);
  let filterCritical = $state(false);

  function onCheck({ target }: Event) {
    const { value, checked } = target as HTMLInputElement;

    if (value === 'all' && checked) {
      filterInfo = false;
      filterNotice = false;
      filterWarning = false;
      filterError = false;
      filterCritical = false;
    } else {
      filterAll = false;
    }
  }
</script>
<h2>Test result for {data.params.domain}</h2>
<Stack middle wrap spaceBetween>
  <div>
    Created on <time datetime={data.created_at}>{new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'medium' }).format(new Date(data.created_at))}</time>
  </div>
  <Stack middle gap="xs">
    <Button variant="secondary" size="small" type="button">
      <i class="bi bi-clock-history"></i>
      History
    </Button>
    <Button variant="secondary" size="small" type="button">
      <i class="bi bi-cloud-arrow-down"></i>
      Export
    </Button>
    <Button variant="secondary" size="small" type="button">
      <i class="bi bi-share"></i>
      Share
    </Button>
  </Stack>
</Stack>
<fieldset class="zm-result">
  <legend>Filter severity levels</legend>
  <Stack middle wrap>
    <FilterToggle name="filter[all]" label="All" badge={data.results.length} bind:checked={filterAll} onCheck={onCheck} value="all" />
    <FilterToggle name="filter[info]" label="Info" badge={data.results.filter((r) => r.level === 'INFO').length} bind:checked={filterInfo} onCheck={onCheck} severity="info" value="info" />
    <FilterToggle name="filter[notice]" label="Notice" badge={data.results.filter((r) => r.level === 'NOTICE').length} bind:checked={filterNotice} onCheck={onCheck} severity="notice" value="notice" />
    <FilterToggle name="filter[warning]" label="Warning" badge={data.results.filter((r) => r.level === 'WARNING').length} bind:checked={filterWarning} onCheck={onCheck} severity="warning" value="warning" />
    <FilterToggle name="filter[error]" label="Error" badge={data.results.filter((r) => r.level === 'ERROR').length} bind:checked={filterError} onCheck={onCheck} severity="error" value="error" />
    <FilterToggle name="filter[critical]" label="Critical" badge={data.results.filter((r) => r.level === 'CRITICAL').length} bind:checked={filterCritical} onCheck={onCheck} severity="critical" value="critical" />
  </Stack>
</fieldset>

<style>
  .zm-result {
    border: 0;
    margin-top: var(--spacing-s);
    padding-top: calc(var(--rhythm) / 2);

    legend {
      font-weight: 700;
    }
  }
</style>
