import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AppService {

  private static config;

  constructor(private http: HttpClient) { }

  public loadConfig(): Promise<void> {
    return this.http.get('/assets/app.config.json')
      .toPromise()
      .then((res) => {
          AppService.config = res
      });
  }

  public getConfig(key) {
    return AppService.config[key] || environment[key];
  }

}
