// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiEndpoint: 'https://zonemaster.fr/api',
  contactAddress: 'contact@zonemaster.net',
  logoUrl: 'assets/images/zonemaster_logo.svg',
  clientInfo: {version: '3.0.1', id: 'Zonemaster GUI'}
};
