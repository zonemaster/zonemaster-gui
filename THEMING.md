# Zonemaster Theming

The Zonemaster UI is built to be cloned and customized. You have full control over the styling and layout.

That said, to avoid headaches when syncing with the original repository, we recommend following a few simple guidelines.

## TL;DR

- Start by customizing the **theme variables** — this is enough for most use cases.
- If that's not enough, apply **custom CSS** targeting specific elements.
- For large framework changes, **create a new theme** and update `tsconfig.json`.
- For interactive components, **keep changes minimal** to avoid breaking functionality.
- Use **headless mode** for major customizations or when building your own UI.

---


## Basic customization

The Zonemaster UI is built around a global theme based on CSS variables (./src/themes/default/styles/theme.css).
The easiest way to make your own theme is to override theme variables in the `./src/themes/default/styles/custom.css` file.
You can tweak colors, fonts, spacing, and more. You'll get surprisingly far by just updating the theme variables.
All class names are prefixed with `zm-` to avoid conflicts with other styles. This makes it easy to apply custom CSS on top of the theme to target specific elements.

## Modifying structure and layout

There's two layers of the UI.

### Framework

The framework is the foundation of the UI and is built with [Astro](https://astro.build/). These files are located under `./src/themes/default`. The starting point for these imports are pages. Pages are simple, they consist of a single component wrapped inside a layout. *We suggest not modifying the page files*. Instead, create your own theme, for example `./src/themes/my-theme`. You can still reuse components from the original theme in your new theme.

Then update tsconfig.json

```diff
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
-     "@theme/*": ["./src/themes/default/*"]
+     "@theme/*": ["./src/themes/my-theme/*"]
    }
  }
}
```

### Interactive components

All interactive components are built with [Svelte](https://svelte.dev/). These files are located under `./src/lib/components`. These are referenced from Astro components. We have tried to make the components as self-contained as possible, but some components may have dependencies on other components. In most cases you won't need to modify these files. A better approach is to modify the CSS.

If you absolutely need to modify these. We suggest creating new components in ./src/lib/components/my-theme and reference them from the Astro components. These interactive components contain important functionality that needs to be carefully considered when modifying.

You might be better off creating a new component from scratch and integrate it with the TestAgent yourself.