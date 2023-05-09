import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import {DnsCheckService} from '../../services/dns-check.service';
import {AppService} from '../../services/app.service';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {
  public version: string;
  public versions: any[];
  public contactAddress: string;
  public clientInfo: object;
  private nameMap = {
    'zonemaster_ldns': 'Zonemaster-LDNS',
    'zonemaster_engine': 'Zonemaster-Engine',
    'zonemaster_backend': 'Zonemaster-Backend',
  }

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
      this.alertService.error($localize `Zonemaster Backend is not available.`);
      console.error(err);
    });
  }

  private setVersionsText(data) {
    const res = [];
    for (const item in data) {
      res.push([this.nameMap[item], data[item].replace('v', '')]);
    }
    res.push(['Zonemaster-GUI', this.clientInfo['version']]);
    return res;
  }
}
