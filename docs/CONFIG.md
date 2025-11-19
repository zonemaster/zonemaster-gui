# Configuration Guide for Zonemaster GUI

## Configuration Files Overview

Zonemaster GUI uses three different configuration files, each serving a specific purpose:

1. **config.ts** - The main application configuration file that is compiled with the application. It contains default settings and reads environment variables during the build process.

2. **tsconfig.json** - TypeScript configuration file that includes path aliases like `@theme/*` to simplify imports and make theming more manageable.

3. **static/config.json** - Runtime configuration file that is loaded after the application is deployed. This allows changing certain settings without rebuilding the application, such as displaying banner messages.

This document provides detailed information about each of these configuration files and mechanisms used in the Zonemaster GUI project.

## config.ts

The `config.ts` file is the central configuration file for the Zonemaster GUI application. It defines various settings that control the behavior and appearance of the application.

```typescript
const config: Config = {
    defaultLanguage: 'en',
    enabledLanguages: ['da', 'en', 'es', 'fi', 'fr', 'nb', 'sv'],
    apiBaseUrl: import.meta.env.PUBLIC_API_URL || '/api',
    pollingInterval: import.meta.env.PUBLIC_POLLING_INTERVAL || 5000,
    clientInfo: {
        version: packageJson.version,
        id: 'Zonemaster-GUI',
    },
    siteInfo: {
        email: 'contact@zonemaster.net',
        siteName: '',
    },
};
```

### Configuration Options

- **defaultLanguage**: The default language to use when no language is specified.
- **enabledLanguages**: An array of language codes that are supported by the application.
- **apiBaseUrl**: The base URL for API requests. This is taken from the `PUBLIC_API_URL` environment variable or defaults to '/api'.
- **pollingInterval**: The interval (in milliseconds) for polling the API. This is taken from the `PUBLIC_POLLING_INTERVAL` environment variable or defaults to 5000ms.
- **clientInfo**: Information about the client application.
  - **version**: The version of the application, taken from package.json.
  - **id**: The identifier for the client application.
- **siteInfo**: Information about the site.
  - **email**: The contact email address.
  - **siteName**: The name of the site.

## @theme/* Alias in tsconfig.json

The `tsconfig.json` file includes a path alias configuration that allows importing from the default theme directory using the `@theme` prefix:

```json
{
  "paths": {
    "@/*": ["./src/*"],
    "@theme/*": ["./src/themes/default/*"]
  }
}
```

This alias makes it easier to import theme-specific components and styles in your code. For example, instead of writing:

```typescript
import Button from '../../themes/default/components/Button';
```

You can use:

```typescript
import Button from '@theme/components/Button';
```

This approach simplifies imports and makes it easier to switch between different themes by changing the alias path.

## static/config.json

The `static/config.json` file contains configuration that is loaded at runtime. Currently, it includes settings for displaying banner messages in different languages:

```json
{
    "msgBanner": {
        "en": "",
        "sv": "",
        "da": "",
        "es": "",
        "fi": "",
        "fr": "",
        "nb": ""
    }
}
```

### Configuration Options

- **msgBanner**: An object containing message banner text for each supported language. These messages can be used to display important announcements or notifications to users in their preferred language.

To display a message banner, simply add the message text to the corresponding language key. For example:

```json
{
    "msgBanner": {
        "en": "System maintenance scheduled for tomorrow at 10:00 UTC",
        "sv": "Systemunderhåll planerat till imorgon kl 10:00 UTC"
    }
}
```

For more information about message banners, see [MessageBanner.md](MessageBanner.md).
