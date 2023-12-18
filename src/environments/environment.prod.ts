import { common } from "./common";

export const environment = {
  ...common,
  production: true,
  apiEndpoint: '/api',
  mock: false,
  extraProvider: [],
};
