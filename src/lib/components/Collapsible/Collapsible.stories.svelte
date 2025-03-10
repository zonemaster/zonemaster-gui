<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Collapsible from './Collapsible.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Components/Collapsible',
    component: Collapsible,
    tags: ['autodocs'],
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" args={{ id: 'the-id', title: 'The title', content: 'The content' }} />
