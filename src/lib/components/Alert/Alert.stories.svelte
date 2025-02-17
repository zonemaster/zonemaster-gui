<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Alert from './Alert.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Components/Alert',
    component: Alert,
    tags: ['autodocs'],
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Info" args={{ variant: 'info' }}>
  {#snippet children(args)}
    <Alert {...args}>This is an informational message.</Alert>
  {/snippet}
</Story>

<Story name="Success" args={{ variant: 'success' }}>
  {#snippet children(args)}
    <Alert {...args}>This is a success message.</Alert>
  {/snippet}
</Story>

<Story name="Warning" args={{ variant: 'warning' }}>
  {#snippet children(args)}
    <Alert {...args}>This is a warning message.</Alert>
  {/snippet}
</Story>

<Story name="Error" args={{ variant: 'error' }}>
  {#snippet children(args)}
    <Alert {...args}>This is an error message.</Alert>
  {/snippet}
</Story>

<Story name="Dismissable" args={{ variant: 'info', onRemove: () => alert('Removed') }}>
  {#snippet children(args)}
    <Alert {...args}>This is a dismissable message.</Alert>
  {/snippet}
</Story>
