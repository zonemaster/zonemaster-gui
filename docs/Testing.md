# Testing

## Setup

This part assumed that you have a working NodeJS environment on Ubuntu. See
the [build environment] document for further instructions.

The tests for Zonemaster GUI are implemented using [playwright], to install the
tests dependencies run the following.

```sh
npm run e2e:install-deps
npm run e2e:install
```

This will install system dependencies as well as the browsers used to tests the
GUI.

## Running the tests

To run the tests run the following command.

```sh
npm run e2e
```

If the appearance of the GUI changes some tests might fail as the baseline for
visual comparison is no longer up to date. In this case it is required to update
the snapshots. The following commands updates the snapshots while ensuring a
similar environment than the one the CI runs in is used (ubuntu focal and UTC
time).

```sh
docker run --rm --network host -v $(pwd):/work/ -w /work/ -it mcr.microsoft.com/playwright:v1.28.0-jammy /bin/bash
npm run e2e:install
npm run e2e:update
exit
```

[build environment]: https://github.com/zonemaster/zonemaster/blob/master/docs/internal/distrib-testing/Ubuntu-Node.js-build-environment.md
[playwright]: https://playwright.dev/docs/intro

## Test server

Angular development server does not provide a way to serve multiple locales.
To test the fully localized application it is possible to use the command
`npm run e2e:test-server`. This command builds the application in test mode and
starts a basic web server to serve the generated files.
