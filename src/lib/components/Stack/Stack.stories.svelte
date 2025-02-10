<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Stack from './Stack.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Components/Stack',
    component: Stack,
    tags: ['autodocs'],
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" args={{}}>
  {#snippet children(args)}
    <Stack {...args}>
      <div>First</div>
      <div>Second</div>
      <div>Third</div>
    </Stack>
  {/snippet}
</Story>
<style>
  div {
    background-color: #f0f0f0;
    padding: 1rem;
    text-align: center;
  }
</style>
