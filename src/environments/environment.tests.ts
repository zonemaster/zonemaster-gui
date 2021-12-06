import { common } from "./common";

export const environment = {
  ...common,
  production: false,
  apiEndpoint: 'https://zonemaster.net/api',
  mock: true,
  // Use a non existent file to always load the config from the environment file
  configUrl: 'assets/app.config.non-existent.json'
};
