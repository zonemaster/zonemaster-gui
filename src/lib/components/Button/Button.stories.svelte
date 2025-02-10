<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Button from './Button.svelte';
  import { fn } from '@storybook/test';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    args: {
      onClick: fn(),
    }
  });
</script>

{#snippet template()}
  <Button>Click me</Button>
{/snippet}

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Primary" args={{ variant: 'primary' }}>
  {#snippet children(args)}
    <Button {...args}>Click me</Button>
  {/snippet}
</Story>

<Story name="Secondary" args={{ variant: 'secondary' }}>
  {#snippet children(args)}
    <Button {...args}>Click me</Button>
  {/snippet}
</Story>

<Story name="Danger" args={{ variant: 'danger' }}>
  {#snippet children(args)}
    <Button {...args}>Click me</Button>
  {/snippet}
</Story>
