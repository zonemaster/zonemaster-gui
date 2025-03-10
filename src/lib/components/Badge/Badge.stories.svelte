<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Badge from './Badge.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Components/Badge',
    component: Badge,
    tags: ['autodocs'],
  });
</script>

<Story name="Info" args={{ level: 'INFO' }}>
  {#snippet children(args)}
    <Badge {...args}>Info badge</Badge>
  {/snippet}
</Story>

<Story name="Notice" args={{ level: 'NOTICE' }}>
  {#snippet children(args)}
    <Badge {...args}>Notice badge</Badge>
  {/snippet}
</Story>

<Story name="Warning" args={{ level: 'WARNING' }}>
  {#snippet children(args)}
    <Badge {...args}>Warning badge</Badge>
  {/snippet}
</Story>

<Story name="Error" args={{ level: 'ERROR' }}>
  {#snippet children(args)}
    <Badge {...args}>Error badge</Badge>
  {/snippet}
</Story>

<Story name="Critical" args={{ level: 'CRITICAL' }}>
  {#snippet children(args)}
    <Badge {...args}>Critical badge</Badge>
  {/snippet}
</Story>
