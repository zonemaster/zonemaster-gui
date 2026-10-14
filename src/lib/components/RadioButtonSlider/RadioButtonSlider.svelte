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
        onChange?: (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => void;
    };

    let {
        id,
        label,
        target,
        controls,
        checked = $bindable(false),
        disabled = false,
        onChange,
    }: Props = $props();

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
        syncTarget();
        onChange?.(event);
    }

    onMount(syncTarget);
</script>

<label class="zm-radio-button-slider" for={id}>
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
