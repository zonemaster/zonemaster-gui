# Translation Guide

This guide provides instructions for how to add a new language to Zonemaster-GUI or update translations for existing languages. The language is assumed to exist in or to be added to Zonemaster-Engine and Zonemaster-Backend.

## Overview of the Translation System

Zonemaster-GUI uses [Paraglide](https://paraglide.io/) for internationalization (i18n). The translation system works as follows:

1. Translation strings are stored in JSON files in the `/messages` directory, one file per language
2. The Paraglide compiler reads these files and generates JavaScript functions in the `src/paraglide` directory
3. These functions are imported and used in the code to display translated text
4. The current language is determined using the `languageTag()` function from the runtime
5. The available languages and default language are configured in `config.ts`

## Language Codes

Zonemaster uses [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) two-letter language codes, in lower case. Zonemaster-GUI is currently available in the following languages:

* `da` for Danish language
* `en` for English language
* `es` for Spanish language
* `fi` for Finnish language
* `fr` for French language
* `nb` for Norwegian language
* `sv` for Swedish language

## Adding or Modifying Translations

### Modifying Existing Translations

To update translations for an existing language:

1. Edit the corresponding JSON file in the `/messages` directory (e.g., `messages/fr.json` for French)
2. Run `npm run build` to compile the translations
3. Test your changes by running the application and switching to the language you modified

### Adding New Translations

To add translations for a new string:

1. Add the string to the English file (`messages/en.json`) first
2. Add translations for the string to all other language files
3. Run `npm run build` to compile the translations
4. Test your changes by running the application

## Adding a New Language

To add a new language to Zonemaster-GUI:

1. Create a new JSON file in the `/messages` directory with the language code as the filename (e.g., `messages/de.json` for German)
2. Copy the content from `messages/en.json` and translate all the strings
3. Update the following files to include the new language code:
   - `project.inlang/settings.json`: Add the language code to the `languageTags` array
   - `config.ts`: Add the language code to the `enabledLanguages` array

4. Run `npm run build` to compile the translations
5. Test your changes by running the application and switching to the new language

## Configuration

The language settings are configured in the following files:

### config.ts

This file contains the default language and the list of enabled languages:

```typescript
const config: Config = {
    defaultLanguage: 'en',
    enabledLanguages: ['da', 'en', 'es', 'fi', 'fr', 'nb', 'sv'],
    // other configuration options...
};
```

### project.inlang/settings.json

This file configures the Paraglide translation system:

```json
{
  "$schema": "https://inlang.com/schema/project-settings",
  "sourceLanguageTag": "en",
  "languageTags": [
    "en",
    "da",
    "es",
    "fi",
    "fr",
    "nb",
    "sv"
  ],
  "modules": [
    "https://cdn.jsdelivr.net/npm/@inlang/message-lint-rule-empty-pattern@latest/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/message-lint-rule-missing-translation@latest/dist/index.js"
  ],
  "plugin.inlang.messageFormat": {
    "pathPattern": "./messages/{languageTag}.json"
  }
}
```

## Using Translations in Code

Translations are used in the code by importing the message functions from the generated JavaScript files:

```javascript
import * as m from '../../paraglide/messages.js';
import { languageTag } from '../../paraglide/runtime';

// Get the current language
const currentLanguage = languageTag();

// Use a translation
const translatedText = m.startTestNav();
```

## Using PoEdit for Translations

[PoEdit](https://poedit.net/) is a powerful translation editor that can simplify the process of translating Zonemaster's JSON files. It provides a user-friendly interface for translators and includes features like translation memory and suggestions.

### Setting Up PoEdit for JSON Files

1. Download and install PoEdit from [poedit.net](https://poedit.net/)
2. PoEdit works with various file formats, including JSON. To work with Zonemaster's JSON files:
   - Open PoEdit
   - Go to File > Preferences > Parsers
   - Make sure the JSON parser is enabled

### Creating a Translation Project

1. In PoEdit, go to File > New
2. Select "Create from existing file" and choose the English JSON file (`messages/en.json`) as your source
3. Select the JSON format when prompted
4. Save the project file (.po) in a convenient location

### Translating with PoEdit

1. PoEdit will display the English source text in the left column
2. Enter your translations in the right column
3. PoEdit highlights untranslated or fuzzy (needs review) entries
4. Use the translation memory and suggestions features to maintain consistency

### Exporting Translations

1. After completing your translations, go to File > Save as
2. Select JSON format
3. Save the file with the appropriate language code in the `/messages` directory (e.g., `messages/de.json` for German)
4. Verify that the exported JSON file maintains the same structure as the original English file

### Tips for Using PoEdit

- Use the "Validate" feature to check for any formatting issues
- The "Translation Memory" feature helps maintain consistency across translations
- You can add comments to translations for future reference
- PoEdit can highlight potentially problematic translations (e.g., those with mismatched formatting tags)

## Building and Testing

After making changes to the translation files, you need to rebuild the application to compile the translations:

```bash
npm run build
```

To test your changes, run the application and switch to the language you modified:

```bash
npm run dev
```

## Submitting Changes

Submit your changes as a pull request to the Zonemaster-GUI repository. Make sure to include all the necessary files and to test your changes thoroughly.
