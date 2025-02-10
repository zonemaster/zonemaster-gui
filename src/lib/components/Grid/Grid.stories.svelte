<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Grid from './Grid.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Components/Grid',
    component: Grid,
    tags: ['autodocs'],
    argTypes: {
      cols: {
        control: {
          type: 'range',
          min: 2,
          max: 6,
          step: 1,
        },
      },
    },
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Default" args={{ cols: 3 }}>
  {#snippet children(args)}
    <Grid {...args}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </Grid>
  {/snippet}
</Story>
<style>
  div {
    background-color: #f0f0f0;
    padding: 1rem;
    text-align: center;
  }
</style>
