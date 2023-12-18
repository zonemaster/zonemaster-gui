import { common } from "./common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpMockRequestInterceptor } from "../app/interceptors/mock.interceptor";

export const environment = {
  ...common,
  production: false,
  apiEndpoint: 'https://zonemaster.net/api',
  mock: true,
  // Use a non existent file to always load the config from the environment file
  configUrl: 'assets/app.config.non-existent.json',
  pollingInterval: 0.1 * 1000,
  extraProvider: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpMockRequestInterceptor,
      multi: true
    }
  ]
};
