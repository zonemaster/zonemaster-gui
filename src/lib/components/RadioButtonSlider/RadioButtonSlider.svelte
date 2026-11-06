<script lang="ts">
    import { onMount } from 'svelte';

    type Props = {
        id: string;
        label: string;
        /** Matches the target container's data-radio-button-slider-container value. */
        target: string;
        /** Optional ID of the region controlled by this switch. */
        controls?: string;
        checked?: boolean;
        disabled?: boolean;
        /** Optional session storage key used to restore the switch state. */
        sessionStorageKey?: string;
        onChange?: (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => void;
    };

    let {
        id,
        label,
        target,
        controls,
        checked = $bindable(false),
        disabled = false,
        sessionStorageKey,
        onChange,
    }: Props = $props();

    let restoringState = $state(Boolean(sessionStorageKey));

    if (typeof window !== 'undefined' && sessionStorageKey) {
        const storedState = sessionStorage.getItem(sessionStorageKey);

        if (storedState !== null) {
            checked = storedState === 'true';
        }
    }

    function getTargetContainer() {
        return Array.from(
            document.querySelectorAll<HTMLElement>(
                '[data-radio-button-slider-container]',
            ),
        ).find(
            (container) =>
                container.dataset.radioButtonSliderContainer === target,
        );
    }

    function syncTarget() {
        const targetContainer = getTargetContainer();

        if (!targetContainer) {
            return;
        }

        const value = checked ? 'on' : 'off';
        targetContainer.dataset.radioButtonSliderState = value;

        targetContainer
            .querySelectorAll<HTMLElement>('[data-radio-button-slider-value]')
            .forEach((element) => {
                const active =
                    element.dataset.radioButtonSliderValue === value;

                element.hidden = !active;
                element
                    .querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
                        '[data-radio-button-slider-control]',
                    )
                    .forEach((control) => {
                        control.disabled = !active;
                    });
            });
    }

    function handleChange(
        event: Event & { currentTarget: EventTarget & HTMLInputElement },
    ) {
        if (sessionStorageKey) {
            sessionStorage.setItem(sessionStorageKey, String(checked));
        }

        syncTarget();
        onChange?.(event);
    }

    onMount(() => {
        syncTarget();

        document.addEventListener('zm:sync-radio-button-slider', syncTarget);

        let followUpAnimationFrame: number | undefined;
        const animationFrame = requestAnimationFrame(() => {
            syncTarget();

            followUpAnimationFrame = requestAnimationFrame(() => {
                restoringState = false;
            });
        });

        return () => {
            document.removeEventListener(
                'zm:sync-radio-button-slider',
                syncTarget,
            );
            cancelAnimationFrame(animationFrame);

            if (followUpAnimationFrame !== undefined) {
                cancelAnimationFrame(followUpAnimationFrame);
            }
        };
    });
</script>

<label
    class:zm-radio-button-slider--restoring={restoringState}
    class="zm-radio-button-slider"
    for={id}
>
    <span id="{id}-label">{label}</span>
    <input
        {id}
        type="checkbox"
        role="switch"
        bind:checked
        {disabled}
        aria-controls={controls || null}
        data-radio-button-slider-target={target}
        onchange={handleChange}
    />
</label>
