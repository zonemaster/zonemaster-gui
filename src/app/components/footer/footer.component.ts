import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import {DnsCheckService} from '../../services/dns-check.service';
import {AppService} from '../../services/app.service';
import {AlertService} from '../../services/alert.service';
import { TranslateService } from '@ngx-translate/core';
=======
import { DnsCheckService } from '../../services/dns-check.service';
import { AppService } from '../../services/app.service';
import { AlertService } from '../../services/alert.service';
>>>>>>> 8affa5bbcc1f2dffd9ecdbe77f247d20dfa99e53

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
    public version: string;
    public versions: any[];
    public contactAddress: string;
    public clientInfo: object;

<<<<<<< HEAD
  constructor(private dnsCheckService: DnsCheckService, private alertService: AlertService, private translateService: TranslateService) {
    this.contactAddress = AppService.getContactAddress();
    this.clientInfo = AppService.getClientInfo();
  }
=======
    constructor(
        private dnsCheckService: DnsCheckService,
        private alertService: AlertService
    ) {
        this.contactAddress = AppService.getContactAddress();
        this.clientInfo = AppService.getClientInfo();
    }
>>>>>>> 8affa5bbcc1f2dffd9ecdbe77f247d20dfa99e53

    ngOnInit() {
        this.getAppVersion();
    }

<<<<<<< HEAD
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
=======
    private getAppVersion(): void {
        const self = this;
        this.dnsCheckService.versionInfo().then(
            (res) => {
                self.versions = this.setVersionsText(res as any[]);
            },
            (err) => {
                this.alertService.error('Zonemaster Backend is not available');
                console.error(err);
            }
        );
    }
>>>>>>> 8affa5bbcc1f2dffd9ecdbe77f247d20dfa99e53

    private setVersionsText(data) {
        const res = [];
        for (const item of Object.keys(data)) {
            res.push([
                item.replace('zonemaster_', ''),
                data[item].replace('v', ''),
            ]);
        }
        res.push(['GUI', this.clientInfo['version']]);
        return res;
    }
}
