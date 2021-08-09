# Configuration

The GUI can be configured by changing the editing the file `assets/app.config.json`.

The supported configuration items are the following.

* `"apiEndpoint"`: The URL to use to contact the API, default `"/api"`.
* `"defaultLanguage"`: The default language of the GUI, defined as a two letters
  code, default `"en"`. The value must be one of the languages listed in `"enabledLanguages"`.
* `"enabledLanguages"`: An array of the languages enabled in the GUI, default
  `[ "da", "en", "fi", "fr", "nb", "sv" ]`.
* `"contactAddress"`: The contact email address displayed in the footer, default
  `"contact@zonemaster.net"`.
* `"logo`": The URL to the image displayed in the navigation bar, default
  `"assets/images/zonemaster_logo_2021_color.png"`.
