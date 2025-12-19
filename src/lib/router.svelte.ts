export let location = $state({
    pathname: '',
});

$effect.root(() => {
    $effect(() => {
        location.pathname = window.location.pathname;

        window.addEventListener('popstate', () => {
            location.pathname = window.location.pathname;
        });
    });
});

export function navigate(path: string): void {
    window.history.pushState(null, '', path);
    location.pathname = path;
}
