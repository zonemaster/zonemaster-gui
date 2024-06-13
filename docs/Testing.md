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
similar environment than the one the CI runs in is used (Ubuntu 22.04 and UTC
time).

```sh
docker run --rm --network host -v $(pwd):/work/ -w /work/ -it mcr.microsoft.com/playwright:v1.44.1-jammy /bin/bash
npm run e2e:install
npm run e2e:update
exit
```

Note that this method may not always work: it could happen that the generated
snapshots are incorrect and have slight differences (e.g. appears zoomed in/out,
etc). In that case, repeat the above steps but outside of the Docker environment,
and preferably on a machine that uses a similar OS/environment as the CI.

[build environment]: https://github.com/zonemaster/zonemaster/blob/master/docs/internal/distrib-testing/Ubuntu-Node.js-build-environment.md
[playwright]: https://playwright.dev/docs/intro

## Test server

Angular development server does not provide a way to serve multiple locales.
To test the fully localized application it is possible to use the command
`npm run e2e:test-server`. This command builds the application in test mode and
starts a basic web server to serve the generated files.
