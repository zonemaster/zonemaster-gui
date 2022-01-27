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
docker run --rm --network host -v $(pwd):/work/ -w /work/ -it mcr.microsoft.com/playwright:v1.12.3-focal /bin/bash
npm run e2e:install
npm run e2e:update
exit
```

[build environment]: https://github.com/zonemaster/zonemaster/blob/master/docs/internal-documentation/distrib-testing/Ubuntu-Node.js-build-environment.md
[playwright]: https://playwright.dev/docs/intro
