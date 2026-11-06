<script lang="ts">
    type Props = {
        type?: string;
        size?: 'small' | 'large';
        name: string;
        value?: string;
        placeholder?: string;
        label?: string;
        id?: string;
        disabled?: boolean;
        onInput?: (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => void;
        class?: string;
        matchContentWidth?: boolean;
        autoScroll?: boolean;
        error?: string | null | false;
        [x: string]: unknown;
    };

    let {
        type = 'text',
        size = 'large',
        value = $bindable(),
        name,
        placeholder,
        label,
        disabled,
        id,
        onInput: onInputCb,
        class: className = '',
        matchContentWidth = false,
        autoScroll = false,
        error: defaultError = null,
        ...restProps
    }: Props = $props();

    let inputWidth = $state(0);
    let error = $state(defaultError);
    let input: HTMLInputElement;
    let animationFrame: number | undefined;

    function onInput(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
        error = false;
        onInputCb?.(event);
    }

    function stopAutoScroll() {
        if (animationFrame !== undefined) {
            cancelAnimationFrame(animationFrame);
            animationFrame = undefined;
        }
    }

    function startAutoScroll() {
        stopAutoScroll();

        if (
            !autoScroll ||
            !input ||
            input.scrollWidth <= input.clientWidth ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            return;
        }

        const maxScroll = input.scrollWidth - input.clientWidth;
        const pause = 1200;
        const travel = (maxScroll / 20) * 1000;
        const cycle = pause * 2 + travel * 2;
        const startedAt = performance.now();

        const animate = (now: number) => {
            const elapsed = (now - startedAt) % cycle;
            let scrollLeft = 0;

            if (elapsed > pause && elapsed <= pause + travel) {
                scrollLeft = ((elapsed - pause) / travel) * maxScroll;
            } else if (elapsed > pause + travel && elapsed <= pause * 2 + travel) {
                scrollLeft = maxScroll;
            } else if (elapsed > pause * 2 + travel) {
                scrollLeft =
                    maxScroll - ((elapsed - pause * 2 - travel) / travel) * maxScroll;
            }

            input.scrollLeft = scrollLeft;
            animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);
    }

    $effect(() => {
        error = defaultError;

        if (matchContentWidth) {
            const mirror = document.createElement('span');

            mirror.style.visibility = 'hidden';
            mirror.style.whiteSpace = 'pre';
            mirror.style.position = 'absolute';
            mirror.style.width = 'auto';
            mirror.className = `zm-input zm-input--${size}`;
            mirror.textContent = value || placeholder || '';

            document.body.appendChild(mirror);

            setTimeout(() => {
                inputWidth = mirror.offsetWidth;
                document.body.removeChild(mirror);
            }, 0);
        }
    });

    $effect(() => {
        if (!autoScroll || !input) {
            return;
        }

        const observer = new ResizeObserver(startAutoScroll);
        observer.observe(input);
        startAutoScroll();

        return () => {
            observer.disconnect();
            stopAutoScroll();
        };
    });
</script>

{#if label}
    <label for={id} class="zm-label">{label}</label>
{/if}
<input bind:this={input} name={name} id={id} bind:value={value} type={type} class={['zm-input', `zm-input--${size}`, className]} disabled={disabled}
       placeholder={placeholder} oninput={onInput} onmouseenter={stopAutoScroll} onfocus={stopAutoScroll}
       onmouseleave={() => input !== document.activeElement && startAutoScroll()} onblur={startAutoScroll}
       style:min-width="0" style:width={matchContentWidth ? `${inputWidth}px` : undefined} {...restProps} />
{#if error}
    <div class="zm-input-error">{error}</div>
{/if}
