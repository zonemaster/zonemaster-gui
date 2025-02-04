<svelte:options customElement="zm-domain-test" />
<script lang="ts">
  import Button from '../Button/Button.svelte';
  import Input from '../Input/Input.svelte';
  import TestAgent from '../../TestAgent';
  import * as m from '@/paraglide/messages';

  let currentState = $state(TestAgent.state);
  let domain = $state('');

  function startTest(e: Event) {
    e.preventDefault();
    TestAgent.dispatch('startTest', { domain });
  }

  $effect(() => {
    TestAgent.on('transition', (s: string) => {
      currentState = s;
    });
  });
</script>
<form novalidate onsubmit={startTest} class="zm-domain-test">
  <Input type="text" bind:value={domain} placeholder="Domain" />
  <Button type="submit" disabled={currentState !== 'IDLE'}>
    {currentState === 'IDLE' ? m.startTestBtn() : m.runningTest()}
  </Button>
</form>

<style>
  .zm-domain-test {
    background-color: var(--color-palette-main-10);
    border: 1px solid var(--color-palette-main-30);
    border-radius: var(--border-radius);
    margin-top: calc(var(--rhythm) / 2);
    padding: var(--spacing-default);
    display: flex;
    gap: calc(var(--rhythm) / 2);
  }
</style>
