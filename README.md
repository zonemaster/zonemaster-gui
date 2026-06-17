# Zonemaster Web GUI [![CI status](https://github.com/zonemaster/zonemaster-gui/actions/workflows/ci.yml/badge.svg)](https://github.com/zonemaster/zonemaster-gui/actions/workflows/ci.yml)

## Overview

Zonemaster GUI is the web interface component of the Zonemaster project, a tool designed for DNS validation and testing. For a comprehensive overview of the Zonemaster software, please see the [Zonemaster repository].

## Prerequisites

Before installing the Zonemaster GUI, ensure you have the Zonemaster Engine and Zonemaster-Backend setup. Refer to the [Zonemaster-Engine installation] and [Zonemaster-Backend installation] documents.

## Installation

There are two ways to install the Zonemaster GUI:

### Quick Install (1 minute)
Download the release zip file, upload to your web server, and configure. 

### Full Customization (5 minutes)
Clone the repository, build, and deploy.

For detailed instructions, see [INSTALL.md](docs/INSTALL.md).

## Development

To set up your development environment:

1. Clone the repository
2. Run `npm install`
3. Run `cp .env.example .env`
4. Set the URL to your Zonemaster backend in the `.env` file
5. Run `npm run dev`

## Documentation

Refer to the [docs](/docs) directory for detailed information on:
- Installation and configuration
- Theming and customization
- Translation guide
- Testing
- UI documentation

For contribution guidelines, see [CONTRIBUTE.md](CONTRIBUTE.md).

## CI artifact

A zip (`zonemaster_web_gui_<version>.zip`) is built and uploaded as a GitHub Actions artifact on every push and pull request. This artifact can be useful for release testing and PR review.
To download it:
1. Go to the [Actions tab](https://github.com/zonemaster/zonemaster-gui/actions) of the repository.
2. Select a workflow run (e.g. for a specific PR or branch).
3. Scroll to the bottom of the run summary to the **Artifacts** section.
4. Download the artifact named `zonemaster_web_gui_<version>-<short_sha>`.
The artifact name includes the module version and the first 7 characters of the commit SHA.

## License

This is free software under a 2-clause BSD license. The full text of the license can be found in the [LICENSE](LICENSE) file included in this repository.

Images `src/assets/images/person_looking_at_computer.svg` and `src/assets/images/world_connected.svg` are taken from <https://undraw.co>, [full license](https://undraw.co/license).

Images `src/assets/images/person_looking_at_computer.svg` and `src/assets/images/world_connected.svg` are taken from <https://undraw.co>, [full license](https://undraw.co/license).

[Backend Configuration]:            https://github.com/zonemaster/zonemaster/blob/master/docs/public/configuration/backend.md
[GUI Configuration]:                https://github.com/zonemaster/zonemaster/blob/master/docs/public/configuration/gui.md
[Installation instructions]:        https://github.com/zonemaster/zonemaster/blob/master/docs/public/installation/zonemaster-gui.md
[Public documentation]:             https://github.com/zonemaster/zonemaster/blob/master/docs/public/README.md
[Zonemaster-Engine installation]:   https://github.com/zonemaster/zonemaster/blob/master/docs/public/installation/zonemaster-engine.md
[Zonemaster-Backend installation]:  https://github.com/zonemaster/zonemaster/blob/master/docs/public/installation/zonemaster-backend.md
[Zonemaster repository]:            https://github.com/zonemaster/zonemaster
