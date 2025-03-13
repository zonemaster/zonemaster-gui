<script lang="ts">
    import stack from '@/lib/components/Stack/stack.module.css';

    type Props = {
        id: string;
        title: string;
        content: string;
    };

    let {
        id,
        title,
        content
    }: Props = $props();
    let open = $state(false);

    function onClick() {
        open = !open;
    }
</script>
<article class="zm-collapsible" id={id}>
    <header>
        <a class="{stack.stack} {stack.middle} {stack['gap--xs']}" onclick={onClick} aria-controls="faq-entry-{id}"
           aria-expanded="{open ? 'true' : 'false'}" href="#{id}">
            <i class="bi bi-caret-{open ? 'up' : 'down'}-fill"></i>
            <h3>{title}</h3>
        </a>
    </header>
    <div class="zm-collapsible-content" id="faq-entry-{id}" aria-hidden="{open ? 'false' : 'true'}">
        {@html content}
    </div>
</article>
<style>
    .zm-collapsible {
        overflow: hidden;
        border: 1px solid var(--color-palette-secondary-30);
        border-radius: var(--border-radius);
        background-color: var(--color-palette-secondary-10);

        header {
            padding: var(--spacing-s);
        }
    }

    .zm-collapsible + .zm-collapsible {
        margin-top: var(--spacing-s);
    }

    .zm-collapsible-content {
        padding: var(--spacing-s);
        border-top: 1px solid var(--color-palette-secondary-30);
        background-color: var(--color-palette-white);
    }

    p,
    ul,
    ol,
    h2,
    h3,
    h4,
    h6,
    h6 {
        max-width: 60ch;
    }

    [aria-hidden='true'] {
        display: none;
    }
</style>
