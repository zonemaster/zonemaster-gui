# Contribute

Thank you for considering contributing to Zonemaster GUI! This document provides guidelines for contributing to the project.

## Project Overview

Zonemaster GUI is built with:
- [Astro](https://astro.build/) as the main framework
- [Svelte](https://svelte.dev/) for UI components
- [TypeScript](https://www.typescriptlang.org/) for type safety

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Code Style

We use [Prettier](https://prettier.io/) for code formatting with the following configuration:
- Single quotes
- 4 spaces for indentation
- No tabs

To format your code:
```bash
npx prettier --write .
```

## Testing

We use [Playwright](https://playwright.dev/) for end-to-end testing. Tests are located in the `e2e` directory.

To run tests:
```bash
npm run e2e
```

## GUI Modifications

Zonemaster GUI is designed to be cloned and customized for theming purposes. When making changes to the GUI, please be mindful of the following:

- **Be careful when renaming CSS class names** - Many themes may depend on these class names
- **Avoid deleting, renaming, or moving template files** without proper deprecation notices
- **Consider backward compatibility** when modifying component structures
- **Document any breaking changes** that might affect custom themes

While it's ultimately up to theme creators to handle conflicts when syncing with the main repository, we should minimize disruption where possible. For more information on theming, see the [THEMING.md](docs/THEMING.md) document.

## Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure tests pass
5. Submit a pull request

## Code of Conduct

Please be respectful and considerate of others when contributing to this project.
