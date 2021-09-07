import { common } from "./common";

export const environment = {
  ...common,
  production: false,
  apiEndpoint: 'https://zonemaster.net/api',
  mock: true,
  configUrl: 'assets/app.config.tests.json'
};
