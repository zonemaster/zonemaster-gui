<svelte:options customElement="zm-domain-test" />
<script lang="ts">
  import Button from '../Button/Button.svelte';
  import Input from '../Input/Input.svelte';
  import TestAgent from '../../TestAgent.ts';
  import * as m from '@/paraglide/messages';
  import Switch from "@/lib/components/Switch/Switch.svelte";
  import Advanced from "@/lib/components/DomainTest/Advanced.svelte";
  import Stack from "@/lib/components/Stack/Stack.svelte";
  import Result from "@/lib/components/DomainTest/Result.svelte";

  let currentState = $state(TestAgent.getState());
  let currentContext = $state(TestAgent.getContext());
  let domain = $state('');
  let advanced = $state(false);

  function startTest(e: Event) {
    e.preventDefault();
    TestAgent.transition('START', { domain });
  }

  $effect(() => {
    TestAgent.subscribe((s, c) => {
      currentState = s;
      currentContext = c;
    });
  });
</script>
<form novalidate onsubmit={startTest} class="zm-domain-test testing-{currentState === 'testing'}">
  <Stack>
    <div class="zm-domain-test-progress">
      <Input type="text" bind:value={domain} placeholder={m.domain()} disabled={currentState === 'testing'} class={ currentState === 'finished' ? 'finished' : undefined }/>
      <span class="zm-domain-test-progress-bar" style="width: {currentContext.progress}%"></span>
    </div>
    <Button type="submit" disabled={currentState === 'testing'} variant="primary">
      {currentState !== 'testing' ? m.startTestBtn() : m.runningTest()}
      {#if currentState === 'testing'}
        {currentContext.progress}%
      {/if}
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
    margin-bottom: var(--rhythm);
    padding: var(--spacing-default);

    .zm-domain-test-progress-bar {
      display: none;
    }

    &.testing-true {
      .zm-domain-test-progress-bar {
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 50%;
        opacity: 0.5;
        transition: width 0.5s linear;
        background-image: linear-gradient(45deg, var(--color-palette-main-30) 25%, transparent 25%, transparent 50%, var(--color-palette-main-30) 50%, var(--color-palette-main-30) 75%, transparent 75%, transparent);
        background-size: 80px 80px;
        animation: progress-bar-stripes 2s linear infinite;
        z-index: 2;
      }
    }

    .zm-domain-test-progress {
      position: relative;
      width: 100%;
      border-radius: var(--border-radius);
    }
  }

  @keyframes progress-bar-stripes {
    from {
      background-position: 80px 0;
    }
    to {
      background-position: 0 0;
    }
  }
</style>
