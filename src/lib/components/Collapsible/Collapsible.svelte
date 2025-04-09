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

    function onClick(e: Event) {
        e.preventDefault();
        open = !open;

        if (open) {
            const target = (e.target as HTMLElement).closest('a') as HTMLAnchorElement;

            window.history.pushState(null, '', target.getAttribute('href') as string);
        } else {
            window.history.pushState(null, '', '#');
        }
    }

    $effect(() => {
        open = window.location.hash === `#${id}`;
    });
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
