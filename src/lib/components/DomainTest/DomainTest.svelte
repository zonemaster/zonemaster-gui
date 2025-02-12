<svelte:options customElement="zm-domain-test" />
<script lang="ts">
  import Button from '../Button/Button.svelte';
  import Input from '../Input/Input.svelte';
  import TestAgent from '../../TestAgent';
  import * as m from '@/paraglide/messages';
  import Switch from "@/lib/components/Switch/Switch.svelte";
  import Advanced from "@/lib/components/DomainTest/Advanced.svelte";
  import Stack from "@/lib/components/Stack/Stack.svelte";
  import Result from "@/lib/components/DomainTest/Result.svelte";

  let currentState = $state(TestAgent.state);
  let domain = $state('');
  let advanced = $state(false);

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
  <Stack>
    <Input type="text" bind:value={domain} placeholder="{m.domain()}" />
    <Button type="submit" disabled={currentState !== 'IDLE'} variant="primary" class="zm-domain-test-button">
      {currentState === 'IDLE' ? m.startTestBtn() : m.runningTest()}
      <i class="bi bi-person-walking"></i>
    </Button>
  </Stack>
  <Switch id="advanced-toggle" controls="advanced-options" active={advanced} onClick={() => advanced = !advanced}>
    Show options
  </Switch>
  <div id="advanced-options" hidden={!advanced}>
    {#if advanced}
    <Advanced />
    {/if}
  </div>
</form>
<Result />
<style>
  .zm-domain-test {
    background-color: var(--color-palette-main-10);
    border: 1px solid var(--color-palette-main-30);
    border-radius: var(--border-radius);
    margin-top: calc(var(--rhythm) / 2);
    padding: var(--spacing-default);
  }

  .zm-domain-test-button {
    i {
      display: none;
    }

    &[disabled] {
      background: var(--color-disabled);
      color: var(--color-muted-text);
      box-shadow: 0 0 0 2px inset var(--button-disabled);
      text-shadow: 0 1px 0 var(--color-palette-black-0);
      cursor: not-allowed;

      i {
        display: initial;
      }
    }
  }
</style>
