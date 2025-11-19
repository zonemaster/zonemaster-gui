# Zonemaster UI

Zonemaster UI is a static website built with [Astro](https://astro.build/), using [Svelte](https://svelte.dev/) for interactive components and [Paraglide](https://paraglide.io/) for internationalization (i18n).

## Standalone Components

Zonemaster UI also provides a set of standalone web components that can be reused in other projects. Currently, there are two available:

- `<zm-domain-test>` – for initiating domain tests
- `<zm-program-versions>` – displays the current versions of Zonemaster components

These components are framework-agnostic and can be embedded in other websites or apps as needed.

```html
<zm-domain-test></zm-domain-test>
<zm-program-versions></zm-program-versions>

<script type="module">
    import '@zonemaster/ui';
</script>
```

## Headless Mode

Zonemaster UI can also be used in **headless mode**, where it acts as a JavaScript API layer between the Zonemaster backend and your own frontend.

This is useful if you want to:

- Build your own custom UI
- Integrate Zonemaster functionality into another application or CLI tool

In headless mode, the UI logic is decoupled from the visual components, allowing you to access core functionality programmatically through JavaScript.

```ts
import { TestAgent } from '@zonemaster/ui';

TestAgent.subscribe((state, context) => {
    console.log(state, context);
});

TestAgent.transition('START', { domain: 'example.com' });
```


