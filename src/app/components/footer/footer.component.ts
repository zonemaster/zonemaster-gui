import { Component, OnInit } from '@angular/core';
import {DnsCheckService} from '../../services/dns-check.service';
import {AppService} from '../../services/app.service';
import {AlertService} from '../../services/alert.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public version: string;
  public versions: any[];
  public contactAddress: string;
  public clientInfo: object;

  constructor(private dnsCheckService: DnsCheckService, private alertService: AlertService, private translateService: TranslateService, appService: AppService) {
    this.contactAddress = appService.getConfig('contactAddress');
    this.clientInfo = appService.getConfig('clientInfo');
  }

  ngOnInit() {
    this.getAppVersion();
  }

  private getAppVersion(): void {
    const self = this;
    this.dnsCheckService.versionInfo().then( res => {
      self.versions = this.setVersionsText(res as any[]);
    }, err => {
      this.translateService.get('Zonemaster Backend is not available').subscribe((res: string) => {
        this.alertService.error(res);
      });
      console.error(err);
    });
  }

  private setVersionsText(data) {
    const res = [];
    for (const item of Object.keys(data)) {
      res.push([item.replace('zonemaster_', ''), data[item].replace('v', '')]);
    }
    res.push(['GUI', this.clientInfo['version']]);
    return res;
  }
}
