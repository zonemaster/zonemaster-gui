<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import FilterToggle from './FilterToggle.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Components/FilterToggle',
    component: FilterToggle,
    tags: ['autodocs'],
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" args={{ label: 'All', badge: '54' }} />

<Story name="Info" args={{ label: 'Info', badge: '52', severity: 'info' }} />

<Story name="Notice" args={{ label: 'Notice', badge: '2', severity: 'notice' }} />

<Story name="Warning" args={{ label: 'Warning', badge: '0', severity: 'warning' }} />

<Story name="Error" args={{ label: 'Error', badge: '0', severity: 'error' }} />

<Story name="Critical" args={{ label: 'Critical', badge: '0', severity: 'critical' }} />
