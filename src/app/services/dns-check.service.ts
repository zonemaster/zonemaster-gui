import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppService} from './app.service';


@Injectable()
export class DnsCheckService {
  private backendUrl: string;
  private clientInfo: object;
  private _profiles: string[];

  constructor(@Inject(LOCALE_ID) private locale: string, private http: HttpClient,
    appService: AppService) {

    this.backendUrl = appService.getConfig('apiEndpoint');
    this.clientInfo = appService.getClientInfo();

    if (!this.backendUrl) {
      console.error($localize `Please set the api endpoint`);
    }
  }

  private RPCRequest(method, params = {}, guiInfo = true) {
    const id = Date.now();

    if (guiInfo) {
      params['client_version'] = this.clientInfo['version'];
      params['client_id'] = this.clientInfo['id'];
    }

    const data = {
      'jsonrpc': '2.0',
      id,
      method,
      params
    };

    return new Promise((resolve, reject) => {
      this.http.post(this.backendUrl, data)
        .subscribe(res => {
          if ('result' in res) {
            resolve(res['result']);
          } else {
            console.error(res);
            reject(res);
          }
        }, (err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  // API Implementation from https://github.com/zonemaster/zonemaster-backend/blob/master/docs/API.md
  public versionInfo() {
    return this.RPCRequest('system_versions', {}, false);
  }

  public profileNames() {
    return this.RPCRequest('conf_profiles', {}, false);
  }

  public startDomainTest(data) {
    return this.RPCRequest('job_create', {
      language: this.locale,
      ...data
    });
  }

  public testProgress(testId) {
    return this.RPCRequest('job_status', {'test_id': testId}, false);
  }

  public getTestResults(testId: string) {
    return this.RPCRequest('job_results', { id: testId, language: this.locale }, false);
  }

  public getTestHistory(data, offset = 0, limit = 100, filter = 'all') {
    const domain = data["domain"];
    return this.RPCRequest('domain_history', {
      offset,
      limit,
      filter,
      frontend_params: { domain },
    }, false);
  }

  public fetchFromParent(domain) {
    return this.RPCRequest('lookup_delegation_data', {
      language: this.locale,
      domain: domain
    }, false);
  }

  public getProfileNames(): string[] {
    console.log('getProfiles')
    return this._profiles;
  }

  public setProfileNames(profiles: string[]): void {
    console.log('setProfil')
    this._profiles = profiles;
  }
}
