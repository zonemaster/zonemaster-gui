<svelte:options customElement={{ tag: 'zm-domain-test', shadow: 'none' }} />

<script lang="ts">
    import Button from '../Button/Button.svelte';
    import Input from '../Input/Input.svelte';
    import * as m from '@/paraglide/messages';
    import Switch from '@/lib/components/Switch/Switch.svelte';
    import Advanced from '@/lib/components/DomainTest/Advanced.svelte';
    import Stack from '@/lib/components/Stack/Stack.svelte';
    import Result from '@/lib/components/DomainTest/Result.svelte';
    import { machine, transition } from '@/lib/machine.svelte.ts';
    import Route from '@/lib/components/Route/Route.svelte';
    import formToObj from '@/lib/formToObj.ts';
    import type { FaqItem } from '@/content.config.ts';
    import { getValidationErrorByPath } from '@/lib/getValidationErrorByPath.ts';
    import { languageTag } from '@/paraglide/runtime';
    import { onMount } from 'svelte';

    type Props = {
        aboutLevels: FaqItem | null;
    };

    const { aboutLevels }: Props = $props();

    let domain = $state('');
    let advanced = $state(false);
    let { currentState, currentContext, previousState } = $derived(machine);

    function startTest(e: Event) {
        e.preventDefault();

        const form = e.target as HTMLFormElement;

        if (!form.reportValidity()) {
            return;
        }

        const formData: Record<string, any> = formToObj(form);

        if (!formData.domain) {
            return;
        }

        if (formData.iptype) {
            formData.ipv4 = formData.iptype !== 'ipv6';
            formData.ipv6 = formData.iptype !== 'ipv4';

            delete formData.iptype;
        }

        transition('START', formData);
    }

    $effect(() => {
        if (currentState === 'complete' && previousState === 'testing') {
            document.location.href = `/${languageTag()}/result/${currentContext.testId}`;
            transition('RESET');
        }
    });

    onMount(() => {
        document.body.dataset.domainTestHydrated = 'true';
    });
</script>

<form
    id="zmDomainTestForm"
    novalidate
    onsubmit={startTest}
    class="zm-domain-test {currentState === 'testing' ? 'zm-is-testing' : ''}"
>
    <Stack>
        <div class="zm-domain-test__progress">
            <label class="zm-u-visually-hidden" for="domainInput"
                >{m.domainName()}</label
            >
            <Input
                required
                name="domain"
                id="domainInput"
                type="text"
                bind:value={domain}
                placeholder={m.domainName()}
                disabled={currentState === 'testing'}
                class={currentState === 'finished' ? 'finished' : undefined}
                error={getValidationErrorByPath(
                    currentContext.error,
                    '/domain',
                )}
            />
            {#if currentState === 'testing'}
                {#key currentState}
                    <span
                        class="zm-domain-test__progress-bar"
                        style="width: {currentContext.progress}%"
                    ></span>
                {/key}
            {/if}
        </div>
        <Button
            type="submit"
            disabled={currentState === 'testing'}
            variant="primary"
        >
            {currentState !== 'testing' ? m.startTestBtn() : m.runningTest()}
            {#if currentState === 'testing'}
                {currentContext.progress}%
            {/if}
        </Button>
    </Stack>
    <Switch
        id="advanced-toggle"
        controls="advanced-options"
        active={advanced}
        onClick={() => (advanced = !advanced)}
    >
        {advanced ? m.hideOptions() : m.showOptions()}
    </Switch>
    <div id="advanced-options" hidden={!advanced}>
        {#if advanced}
            <Advanced />
        {/if}
    </div>
</form>
<Route path="/result/:id">
    <Result {aboutLevels} />
</Route>
