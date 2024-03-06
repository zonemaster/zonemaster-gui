// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import { common } from "./common";
import { HttpMockRequestInterceptor } from "../app/interceptors/mock.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

export const environment = {
  ...common,
  production: false,
  apiEndpoint: '/api',
  mock: true,
  extraProvider: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpMockRequestInterceptor,
      multi: true
    }
  ]
};
