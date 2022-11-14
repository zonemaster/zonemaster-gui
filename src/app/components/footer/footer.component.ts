import { Component, OnInit } from '@angular/core';
import {DnsCheckService} from '../../services/dns-check.service';
import {AppService} from '../../services/app.service';
import {AlertService} from '../../services/alert.service';

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

  constructor(private dnsCheckService: DnsCheckService, private alertService: AlertService, appService: AppService) {
    this.contactAddress = appService.getConfig('contactAddress');
    this.clientInfo = appService.getClientInfo();
  }

  ngOnInit() {
    this.getAppVersion();
  }

  private getAppVersion(): void {
    const self = this;
    this.dnsCheckService.versionInfo().then( res => {
      self.versions = this.setVersionsText(res as any[]);
    }, err => {
      this.alertService.error($localize `Zonemaster Backend is not available`);
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
