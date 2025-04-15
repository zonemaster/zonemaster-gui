# Zonemaster Theming

The Zonemaster UI is built to be cloned and customized. You have full control over the styling and layout.

That said, to avoid headaches when syncing with the original repository, we recommend following a few simple guidelines.

## TL;DR

- Start by customizing the **theme variables** — this is enough for most use cases.
- If that's not enough, apply **custom CSS** targeting specific elements.
- For framework changes, **create new components** and swap references instead of modifying originals.
- For interactive components, **keep changes minimal** to avoid breaking functionality.
- Use **headless mode** for major customizations or when building your own UI.

---


## Basic customization

The Zonemaster UI is built around a global theme based on CSS variables (./src/styles/theme.css).
The easiest way to make your own theme is to override theme variables in the `./src/styles/theme/theme.css` file.
You can tweak colors, fonts, spacing, and more. You'll get surprisingly far by just updating the theme variables.

All class names are prefixed with `zm-` to avoid conflicts with other styles. This makes it easy to apply custom CSS on top of the theme to target specific elements.

## Modifying structure and layout

There's two layers of the UI.

### Framework

The framework is the foundation of the UI and is built with [Astro](https://astro.build/). These files are located under `./src/components` and `./src/layouts`. The starting point for these imports are pages. Pages are simple, they consist of a single component wrapped inside a layout. *We suggest not modifying the page files*. Instead, create your own components and layouts. For example, ./src/components/StartTest.astro is referenced in ./src/pages/[lang]/index.astro. This file wont change when synchronizing with the original repository so you can safely modify it.

```diff
---
- import StartTestComponent from '../components/default/StartTest.astro';
+ import StartTestComponent from '../components/my-theme/StartTest.astro';
---

<StartTestComponent />
```

The same principle applies to all ./src/components/*.astro files. If you need to modify the layout, create your own layout in ./src/layouts/my-theme/Layout.astro. And modify ./src/layouts/Layout.astro

```diff
---
- import Layout from './DefaultLayout.astro';
+ import Layout from './MyLayout.astro';
---

<Layout>
    <slot />
</Layout>
```

### Interactive components

All interactive components are built with [Svelte](https://svelte.dev/). These files are located under `./src/lib/components`. These are referenced from Astro components. We have tried to make the components as self-contained as possible, but some components may have dependencies on other components. In most cases you won't need to modify these files. A better approach is to modify the CSS.

If you absolutely need to modify these. We suggest creating new components in ./src/lib/components/my-theme and reference them from the Astro components. These interactive components contain important functionality that needs to be carefully considered when modifying.

You might be better off creating a new component from scratch and integrate it with the TestAgent yourself.