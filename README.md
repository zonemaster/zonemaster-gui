# Zonemaster Web GUI [![CI status](https://github.com/zonemaster/zonemaster-gui/actions/workflows/ci.yml/badge.svg)](https://github.com/zonemaster/zonemaster-gui/actions/workflows/ci.yml)


### Purpose

This module is the Web Interface part of the Zonemaster project. For an
overview of the Zonemaster software, please see the [Zonemaster repository].

### Prerequisites

Before you install the Zonemaster Web GUI module, you need the Zonemaster
Engine test framework installed. Please see the [Zonemaster-Engine
installation] document.

You also need a running Zonemaster-Backend component. Please see the
[Zonemaster-Backend installation] document.

### Installation

Follow the detailed [installation instructions].

### Configuration

The configuration instructions for the Backend can be found in the [Backend
configuration] document.

The configuration instructions for the GUI can be found in the [GUI
configuration] document.

### Documentation

There is a [public documentation]. Some more specific documents can be found in
the [docs directory](docs/).

### Contribution

This project was generated with Angular-CLI 1.6.8.
It uses the Angular 2+ framework with all its tools.

The source code of the application is available in `./src/app` folder.

The `components` folder is composed of subfolders that represent the main
components. Each folder of component contain three files:

  * `*.component.css`: the component's style configuration;
  * `*.component.html`: the component's HTML code;
  * `*.component.ts`: the component's TypeScript code.

All assets are available in the `src/assets` folder. It is split by concern;
the style configurations are in the `css`, images are in the `images` folder, etc.

All translation files are in the `src/locale` folder.

The environment defaults of the application are in the `src/environments`
folder. `environment.ts` is used for development purposes, the
`environment.prod.ts` for production, and the `environment.test.ts` for testing.

In order to contribute:

* Install [Nodejs](https://nodejs.org)
* Fork the Zonemaster GUI repository on Github into your own user on Github.
* Clone your fork to your working environment.
* Go to the folder and install project dependencies with `npm install`
* Update configuration files in `src/assets/app.config.json` to add a Backend
  API endpoint (or leave the default)
* Make your changes, test them and push them to your fork on Github
* From your fork, make a Pull Request against the zonemaster/zonemaster-gui
  repository. Please always make the Pull Request against the develop branch.
* Thank you for your contribution!

#### Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/en`.
The app will automatically reload if you change any of the source files.

#### Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

#### Test

See [Testing](docs/Testing.md).

## License

This is free software under a 2-clause BSD license. The full text of the license can
be found in the [LICENSE](LICENSE) file included in this respository.

Images `src/assets/images/person_looking_at_computer.svg` and `src/assets/images/world_connected.svg`
are taken from <https://undraw.co>, [full license](https://undraw.co/license).


[Backend Configuration]:            https://github.com/zonemaster/zonemaster/blob/master/docs/public/configuration/backend.md
[GUI Configuration]:                https://github.com/zonemaster/zonemaster/blob/master/docs/public/configuration/gui.md
[Installation instructions]:        https://github.com/zonemaster/zonemaster/blob/master/docs/public/installation/zonemaster-gui.md
[Public documentation]:             https://github.com/zonemaster/zonemaster/blob/master/docs/public/README.md
[Zonemaster-Engine installation]:   https://github.com/zonemaster/zonemaster/blob/master/docs/public/installation/zonemaster-engine.md
[Zonemaster-Backend installation]:  https://github.com/zonemaster/zonemaster/blob/master/docs/public/installation/zonemaster-backend.md
[Zonemaster repository]:            https://github.com/zonemaster/zonemaster
