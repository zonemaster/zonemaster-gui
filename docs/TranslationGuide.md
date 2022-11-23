# Translation Guide

This guide gives instructions for how to add a new language to
Zonemaster-GUI. The language is assumed to exist in or to be added
to Zonemaster-Engine and Zonemaster-Backend.

When updating a language in use, this document could also be used as
a checklist for where the changes are done.

You should usually read this document from develop branch to make
sure you have the latest version.

## Language code

Zonemaster uses [ISO 639-1] two-letter language codes, normally in
lower case, but in GUI sometimes with first letter in upper case
to make the display nicer. GUI is currently available in the
following languages with the attached language code:

* `da` for Danish language
* `en` for English language
* `es` for Spanish language
* `fi` for Finnish language
* `fr` for French language
* `nb` for Norwegian language
* `sv` for Swedish language


## Extracting translatable strings

When adding new translatable strings to the GUI, they need to be added to each
`messages.<LANG>.xlf` file. This can be done with the following command:

```
npm run i18n:extract
```

This will update each file with the new strings using the English string as
default value. All new strings are appended to the end of the files, obsolete
strings are removed from the files.


## Submitting changes

Below are instructions for how to add or modify files. Preferably,
submit the new or updated file as a pull request to Github (see
[translators guide for Engine]). Contact the Zonemaster Group if
that does not work.

The translator must always create or update the `messages.<LANG>.xlf` and
the `gui-faq-<LANG>.md`. The other changes are only done when
a language is added and will be completed by the Zonemaster Group.


## messages.\<LANG\>.xlf

The XLF files `messages.<LANG>.xlf` are XML files and contains the messages
for GUI in respective language, where `<LANG>` is the language code,
e.g. `messages.fr.xlf`.

The files are located in the [src/locale] folder, one file for each
supported language.

Each language file contains a list of `<trans-unit>` elements with a
`<source>` element containing the message in English (the source locale),
and a `<target>` element containing the translated message. Optionally a
`<note>` element can contain context to help the translator.

```xml
<trans-unit datatype="html" id="a434ae37bd56265a0693fbc28bd8338a38500871">
  <source>About Zonemaster</source>
  <target state="new">À propos de Zonemaster</target>
</trans-unit>
```

To help translating the locale files, tools like [Poedit] can be used.

### Poedit

In Poedit, the translator can see the new strings to translated in an accent
color. Additional context for translation, if available, is shown in the
bottom left corner of the window under "Notes for translators".

## gui-faq-\<LANG\>.md

The FAQ document holds questions and answers on Zonemaster, and there
is one document per language, e.g. `gui-faq-en.md`.

The files are located in the [docs/FAQ] folder, one file for each supported
language.

When creating a new FAQ file, make a copy of `gui-faq-en.md` with the new
language code instead of `en`. The code must be in lower case. Then
translate the file using English as the model.

It is important to preserve the structure of the file. There must be a
table of contents linking to the question plus answer below. The anchor
names must be "q1" etc and nothing else. There are links in the code
that assume this model, where the `<a>` tag is just before the heading.

```
1. [What is Zonemaster?](#q1)

<a name="q1"></a>
#### 1. What is Zonemaster?
```

## Adding a new language

The new language must be added to the following source files:

* [angular.json],
* [src/environments/common.ts],
* [src/assets/app.config.sample.json],
* [zonemaster.conf-example].

and the following documentation file:

Then run `npm run i18n:extract` to create and populate the new
translation file.

* [Configuration.md].

### angular.json

In `angular.json` locate and update the following sections
* `/projects/zonemaster/i18n/locales`: add a new property named `<LANG>` with a value of object having the `translation` property containing the path to the `messages.<LANG>.xlf` file;
* `/projects/architect/build/configurations`: add a new build configuration named `<LANG>`, with a `localize` property set to an array containing the language code and a `baseHref` property set a URL prefix in the form `/<LANG>/`;
* `/projects/architect/serve/configurations`: add a new serve configuration baled `<LANG>`, with a `browserTarget` set to the name of the build configuration created in the previous step, `zonemaster:build:<LANG>`;
* `/projects/zonemaster/extract-i18n/options/targetFiles`: add the name of the translation file (`messages.<LANG>.xlf`) to the array.

```jsonc
{
  // ...
  "projects": {
    "zonemaster"
      // ...
      "i18n": {
        "locales": {
          // ...
          "<LANG>": {
            "translation": "src/locale/messages.<LANG>.xlf"
          }
        }
      },
      "architect": {
        "build": {
          // ...
          "configurations": {
            // ...
            "<LANG>": {
              "localize": ["<LANG>"],
              "baseHref": "/<LANG>/"
            }
          }
        },
        "serve": {
          // ...
          "configurations": {
            // ...
            "<LANG>": {
              "browserTarget": "zonemaster:build:<LANG>"
            }
          }
        },
        "extract-i18n": {
          // ...
          "options": {
            // ...
            "targetFiles": [
              // ...
              "messages.<LANG>.xlf"
            ],
          }
        }
      }
    }
  },
  // ...
}
```

### common.ts

In `common.ts` locate

```js
languages: {
  'da': 'Dansk',
  ...
}
```
and append the new two-letter language code and the corresponding new
language name.

Also locate
```js
enabledLanguages: ['da', ...]
```
and append the new two-letter language code of the new language.

### app.config.sample.json

In  `app.config.sample.json` locate

```json
"enabledLanguages": ["da", ...]
```
and append the new two-letter language code of the new language.

### zonemaster.conf-example

In the Apache example configuration add a rewrite rule to redirect the
user to the new language:

```apache
RewriteCond %{HTTP:Accept-Language} ^<LANG> [NC]
RewriteRule ^$ /<LANG>/ [R,L]
```

### Configuration.md

Add the new language's two-letter code to the list of default values for
`"enabledLanguages"`.

## Add e2e test script for the language

In `FR05.e2e-spec.ts` add a new test case in the `testSuite` array:

```js
const testSuite = [
      ...
      { language: 'New language name', code: 'two-letter code', expected: '`Domain name` translation in the new language' },
      ...
  ];
```


[ISO 639-1]:                                               https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
[docs/FAQ]:                                                FAQ
[e2e]:                                                     ../e2e
[FR05-en.e2e-spec.ts]:                                     ../e2e/FR05-en.e2e-spec.ts
[angular.json]:                                            ../angular.json
[src/locale]:                                              ../src/locale
[translators guide for Engine]:                            https://github.com/zonemaster/zonemaster-engine/blob/develop/docs/Translation-translators.md
[src/environments/common.ts]:                              ../src/environments/common.ts
[src/assets/app.config.sample.json]:                       ../src/assets/app.config.sample.json
[Configuration.md]:                                        ./Configuration.md
[zonemaster.conf-example]:                                 ../zonemaster.conf-example
[Poedit]:                                                  https://poedit.net
