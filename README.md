# Zonemaster Web GUI [![CI status](https://github.com/zonemaster/zonemaster-gui/actions/workflows/ci.yml/badge.svg)](https://github.com/zonemaster/zonemaster-gui/actions/workflows/ci.yml)

## Overview

Zonemaster GUI is the web interface component of the Zonemaster project, a tool
designed for DNS validation and testing. For a comprehensive overview of the
Zonemaster software go to the [Zonemaster documentation].


## Prerequisites

Before installing the Zonemaster GUI, ensure you have the Zonemaster Engine and
Zonemaster-Backend setup. Refer to the [Zonemaster-Engine installation] and
[Zonemaster-Backend installation] guides.


## Installation

There are two ways to install the Zonemaster GUI:

### Quick Install (5 minute)
Follow the [Zonemaster-GUI installation] guide for a standard installation.

### Full Customization (30 minutes)
Clone the repository, build, and deploy.

Follow the [custom Zonemaster-GUI installation] guide.


## Development

To set up your development environment follow the instructions in
[custom Zonemaster-GUI installation].


## Documentation

Refer to the [GUI Configuration guides] for detailed information on:
- Installation and configuration
- Theming and customization
- Translation guide
- Testing
- UI documentation

For contribution guidelines, see [CONTRIBUTE.md](CONTRIBUTE.md).


## CI artifact

A zip (`zonemaster_web_gui_<version>.zip`) is built and uploaded as a GitHub
Actions artifact on every push and pull request. This artifact can be useful for
release testing and PR review. To download it:
1. Go to the [Actions tab](https://github.com/zonemaster/zonemaster-gui/actions)
   of the repository.
2. Select a workflow run (e.g. for a specific PR or branch).
3. Scroll to the bottom of the run summary to the **Artifacts** section.
4. Download the artifact named `zonemaster_web_gui_<version>-<short_sha>`.
   The artifact name includes the module version and the first 7 characters of
   the commit SHA.

The artifact is a `zip`. Unzip that, and you will find the file
`zonemaster_web_gui_<version>.zip` where `<version>` is the current
Zonemaster-GUI version. That `zip` file can replace the file downloaded in the
[Zonemaster-GUI installation] guide.

## License

For license see the [LICENSE](LICENSE) file included in this repository.

Images `src/assets/images/person_looking_at_computer.svg` and
`src/assets/images/world_connected.svg` are taken from <https://undraw.co>.
See [full license](https://undraw.co/license) of those.


[Custom Zonemaster-GUI installation]:       https://doc.zonemaster.net/latest/configuration/gui/building-custom-gui.html
[GUI Configuration guides]:                 https://doc.zonemaster.net/latest/configuration/gui/README.html
[Zonemaster documentation]:                 https://doc.zonemaster.net/latest/
[Zonemaster-Backend installation]:          https://doc.zonemaster.net/latest/installation/zonemaster-backend.html
[Zonemaster-Engine installation]:           https://doc.zonemaster.net/latest/installation/zonemaster-engine.html
[Zonemaster-GUI installation]:              https://doc.zonemaster.net/latest/installation/zonemaster-gui.html
