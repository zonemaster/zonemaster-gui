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
* `fi` for Finnish language
* `fr` for French language
* `nb` for Norwegian language
* `sv` for Swedish language


## Extracting translatable strings

When adding new translatable strings to the GUI, they need to be added to each
*LANG.json* file. This can be done with the following command:

```
npm run i18n:extract
```

This will update each file with the new strings using `null` as default value.
The file will also be automatically sorted and obsolete strings will be
removed.

Once updated, it might be required to update the *en.json* file with the
correct translation.


## Submitting changes

Below are instructions for how to add or modify files. Preferably,
submit the new or updated file as a pull request to Github (see
[translators guide for Engine]). Contact the Zonemaster Group if
that does not work.

The translator must always create or update the *LANG.json* and 
the *gui-faq-LANG.md*. The other changes are only done when
a language is added and will be completed by the Zonemaster Group.


## LANG.json

The JSON structure LANG.json holds all the messages for GUI in respective
language, where "LANG" is the language code, e.g. `en.json`.

The files are located in the [src/assets/i18n] folder, one file for each
supported language.

Each language file contains a hash structure with the English message
(default messages) as the key and the translated messages as the value. In
a few cases, when the value is long, the key is a KEY_STRING.

When creating a new language file, make a copy of `en.json` with the new
language code instead of `en`. The code must be in lower case. Then
translate the file using English as the model.


## gui-faq-LANG.md

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

## Add the language to HTML code

The language must be linked from the GUI. The new language must be added
to [src/app/components/navigation/navigation.component.html]:

In `navigation.component.html` :

  * Locate the div `<div class="lang">`
  * Add the language where `xx` is the language code in lower case, e.g.
    `en` and `Yy` is the same language code with first letter in upper
    case, e.g. `En`:

```
<a lang='xx' (click)="setLanguage('xx')">Yy</a> |
```
  * Add the language a second time where `xx` is the language code in
    lower case, e.g. `sv`, and `Yyyyy` is the name of the same language
    in that language, e.g. `Svenska`:

```
 <option lang='xx' value='xx' [selected]="lang === 'xx'">
  Yyyyy
 </option>
 ```

Preserve the alphabetical order of the language codes.

## Add the language in Type Script code

The new language must be added to the following files:

* [package.json]
* [src/app/app.module.ts]
* [src/app/components/navigation/navigation.component.ts]

### package.json

In `package.json` locate

```
    "i18n:extract": "ngx-translate-extract --input ./src --output ./src/assets/i18n/{da,en,fi,fr,nb,sv}.json --key-as-default-value --clean --sort --format json"
```
and add the two-letter language code of the new language. Preserve
the alphabetical order of the language codes.

### app.module.ts

In `app.module.ts` locate

```
import 'moment/locale/fr';
import 'moment/locale/sv';
```
and add a new line with code of the new language instead of `xx`
```
import 'moment/locale/xx';
```
Preserve the alphabetical order of the language codes.

### navigation.component.ts

In `navigation.component.ts` locate

```
  private isValidLanguage(lang: string) {
    const validLanguages = [ 'da', 'en', 'fi', 'fr', 'nb', 'sv' ];
```
and add the two-letter language code of the new language. Preserve
the alphabetical order of the language codes.

## Add e2e test script for the language

Create a new `FR05-xx.e2e-spec.ts` e2e test script in the [e2e] folder
where `xx` is the language code of the new language. Copy
[FR05-en.e2e-spec.ts] and modify to create a correct test file for
the new language.


## Change default language

Optionally, to change the default language update
[src/app/components/navigation/navigation.component.ts].

In `navigation.component.ts` update the following code
```
  public lang = 'en';
  private lang_default = 'en';
```
by setting another language code instead of `en` in both cases (they
should be the same). Such a change **must not** be submitted to the
Zonemaster repository. Instead it should be done in the local
installation. Also, it will be overwritten next time Zonemaster GUI
is updated.


[ISO 639-1]:                                               https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
[docs/FAQ]:                                                FAQ
[e2e]:                                                     ../e2e
[FR05-en.e2e-spec.ts]:                                     ../e2e/FR05-en.e2e-spec.ts
[package.json]:                                            ../package.json
[src/app/app.module.ts]:                                   ../src/app/app.module.ts
[src/app/components/navigation/navigation.component.html]: ../src/app/components/navigation/navigation.component.html
[src/app/components/navigation/navigation.component.ts]:   ../src/app/components/navigation/navigation.component.ts
[src/assets/i18n]:                                         ../src/assets/i18n
[translators guide for Engine]:                            https://github.com/zonemaster/zonemaster-engine/blob/develop/docs/Translation-translators.md


