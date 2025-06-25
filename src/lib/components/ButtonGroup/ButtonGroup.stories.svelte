<script lang="ts">
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import ButtonGroup from './ButtonGroup.svelte';

    const options = [
        { key: 'option1', value: 'Option 1' },
        { key: 'option2', value: 'Option 2' },
        { key: 'option3', value: 'Option 3' }
    ];
</script>

<Meta
    title="Components/ButtonGroup"
    component={ButtonGroup}
    argTypes={{
        options: { control: 'object' },
        active: { control: 'text' },
    }}
/>

<Template let:args>
    <ButtonGroup {...args} />
</Template>

<Story
    name="Default"
    args={{
        options,
        active: 'option1'
    }}
/>
