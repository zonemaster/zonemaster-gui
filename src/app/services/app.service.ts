import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { clientInfo } from '../../environments/version';

@Injectable()
export class AppService {

  private static config;

  constructor(private http: HttpClient) { }

  public loadConfig(): Promise<void> {
    return this.http.get('assets/app.config.json')
      .toPromise()
      .then(res => {
          AppService.config = res;
      })
      .catch(reason => {
          console.warn('Failed to load configuration, using default settings.', reason.message);
          AppService.config = {};
      })
  }

  public getConfig(key) {
    return AppService.config[key] || environment[key];
  }

  public getClientInfo() {
    return clientInfo;
  }
}
