<script>
  import Stack from "@/lib/components/Stack/Stack.svelte";
  import Button from "@/lib/components/Button/Button.svelte";
  import FilterToggle from "@/lib/components/FilterToggle/FilterToggle.svelte";

  let filterAll = $state(true);
  let filterInfo = $state(false);
  let filterNotice = $state(false);
  let filterWarning = $state(false);
  let filterError = $state(false);
  let filterCritical = $state(false);

  function onCheck({ target }) {
    const { value, checked } = target;

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

<h2>Test result for zonemaster.net</h2>
<Stack middle spaceBetween>
  <div>
    Created on <time datetime="2025-02-10T13:04:07.000Z"> Feb 10, 2025, 2:04:07 PM</time>
  </div>
  <Stack middle gap="xs">
    <Button variant="secondary" type="button">
      <i class="bi bi-clock-history"></i>
      History
    </Button>
    <Button variant="secondary" type="button">
      <i class="bi bi-cloud-arrow-down"></i>
      Export
    </Button>
    <Button variant="secondary" type="button">
      <i class="bi bi-share"></i>
      Share
    </Button>
  </Stack>
</Stack>
<fieldset>
  <legend>Filter severity levels</legend>
  <Stack middle>
    <FilterToggle name="filter[all]" label="All" badge="54" bind:checked={filterAll} onCheck={onCheck} value="all" />
    <FilterToggle name="filter[info]" label="Info" badge="52" bind:checked={filterInfo} onCheck={onCheck} severity="info" value="info" />
    <FilterToggle name="filter[notice]" label="Notice" badge="2" bind:checked={filterNotice} onCheck={onCheck} severity="notice" value="notice" />
    <FilterToggle name="filter[warning]" label="Warning" badge="0" bind:checked={filterWarning} onCheck={onCheck} severity="warning" value="warning" />
    <FilterToggle name="filter[error]" label="Error" badge="0" bind:checked={filterError} onCheck={onCheck} severity="error" value="error" />
    <FilterToggle name="filter[critical]" label="Critical" badge="0" bind:checked={filterCritical} onCheck={onCheck} severity="critical" value="critical" />
  </Stack>
</fieldset>
