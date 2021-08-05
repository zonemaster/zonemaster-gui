# Configuration

The GUI can be configured by changing the editing the file `assets/app.config.json`.

The supported configuration items are the following.

* `"apiEndpoint"`: The URL to use to contact the API, default `"/api"`.
* `"defaultLanguage"`: The default language of the GUI, defined as a two letters
  code, default `"en"`. Accepted values: `"da"`, `"en"`, `"fi"`, `"fr"`,
  "`nb"`, `"sv"`.
* `"enabledLanguages"`: An array of the languages enabled in the GUI, default
  `[ "da", "en", "fi", "fr", "nb", "sv" ]`.
* `"contactAddress"`: The contact email address displayed in the footer, default
  `"contact@zonemaster.net"`.
* `"logo`": The URL to the image displayed in the navigation bar, default
  `"assets/images/zonemaster_logo_2021_color.png"`.
* `"clientInfo"`: An object containing the client information reported to the
    API. The object must have the following properties:
    * `"version"`: The GUI version, default to the current Zonemaster GUI
      version. The value is also displayed along the other components version
      on the *program versions* tooltip.
    * `"id"`: The name of the client, default to `"Zonemaster GUI"`.
