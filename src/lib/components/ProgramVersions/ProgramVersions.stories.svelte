<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ProgramVersions from './ProgramVersions.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Components/ProgramVersions',
    component: ProgramVersions,
    tags: ['autodocs'],
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" />
