#To translate the Zonemaster frontend interface 2 files must be added.

* The JSON structure holding all the messages of the Web Interface
* The file holding the FAQ

1. Adding the JSON structure holding all the messages of the Web Interface

The file is located in the following folder:
```
ZONEMASTER_DISTRIBUTION/zonemaster-gui/src/assets/i18n
```
This folder contains the language files.

Each language file contains a hash structure with English/Default messages as keys and the translated messges as values.
The file should be named with the [official language code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) and must have .json extension.

2. Adding the file holding the FAQ
The file is located in the following folder:
```
ZONEMASTER_DISTRIBUTION/zonemaster/docs/FAQ
```
The filename must be of the format: qui-faq-LANGUAGE_CODE.md
Where LANGUAGE_CODE is the standard 2 letter language code from: [official language code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)

3. Ading the language link to the web interface
The file that needs to be modified is locaded in the following folder:
```
ZONEMASTER_DISTRIBUTION/zonemaster-gui/src/app/components/navigation.component.html
```

In `navigation.component.html` :

 - Locate the div `<div class="lang">`
 - Add your language using the language tag: `<a lang='xx' (click)="setLanguage('xx')">XX</a> |`
with xx, the language code in lower case and XX, the displayed language code.
 - Finally, for small (mobile) screen, add in the next select element:
 ``` 
 <option lang='xx' value='xx' [selected]="lang === 'xx'">
  Xxxxx
 </option>
 ```
 with Xxxxx, the full language name (En => English).
 
 
4. Optionally, to change the default language update the following file: 
```
ZONEMASTER_DISTRIBUTION/zonemaster-gui/src/app/components/navigation.component.ts
```
and replace `public lang = 'en'` by `public lang = 'xx';` with xx the language code of your language.
