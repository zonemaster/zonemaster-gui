import { Component, OnInit } from '@angular/core';
import { DnsCheckService } from '../../services/dns-check.service';
import { Router} from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../../services/app.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-domain-check',
  templateUrl: './domain-check.component.html',
  styleUrls: ['./domain-check.component.css']
})
export class DomainCheckComponent implements OnInit {
  private intervalTime: number;
  public is_advanced_options_enabled = false;
  public domain_check_progression = 0;
  public showResult = false;
  public showProgressBar = false;
  public parentData: any;
  public resultID = '';
  public profiles = [];
  public toggleFinished = false;
  public requestError: object;

  constructor(private alertService: AlertService,
    private dnsCheckService: DnsCheckService,
    private translateService: TranslateService,
    private router: Router,
    private appService: AppService,
    private titleService: Title) {
      this.intervalTime = this.appService.getConfig('pollingInterval');
    }

  ngOnInit() {
    this.dnsCheckService.profileNames().then( (res: string[]) => this.profiles = res );
  }

  public fetchFromParent(domain) {
    this.dnsCheckService.fetchFromParent(domain).then(result => {
      if (result['ds_list'].length === 0 && result['ns_list'].length === 0) {
        this.alertService.warn($localize `There is no delegation for the zone`);
      } else {
        this.parentData = result;
        this.alertService.success($localize `Parent data fetched with success`);
      }
    }, error => {
      if (error.error.code === "-32602" && error.error.data.constructor === Array) {
        this.requestError = error.error.data;
      } else {
        console.log(error);
        this.alertService.error($localize `Error during parent data fetching`);
      }
  });
  }

  public openOptions(value) {
    this.is_advanced_options_enabled = value;
  }

  public domainCheck(data: object) {
    let domainCheckId: string;

    const self = this;

    this.dnsCheckService.startDomainTest(data).then(id => {
      domainCheckId = id as string;
      this.showProgressBar = true;

      this.titleService.setTitle(`${data['domain']} · Zonemaster`);

      const handle = setInterval(() => {
        self.dnsCheckService.testProgress(domainCheckId).then(res => {

          self.domain_check_progression = parseInt(res as string, 10) as number;

          if (self.domain_check_progression === 100) {
            clearInterval(handle);
            this.alertService.success($localize `Domain checked completed`);
            self.resultID = domainCheckId;
            self.is_advanced_options_enabled = false;
            self.showResult = true;
            self.showProgressBar = false;
            self.domain_check_progression = 5;
            self.toggleFinished = !self.toggleFinished;
            this.router.navigate(['/result', this.resultID ], { state: { displayForm: true, displayNotification: true }});
          }
        });
      }, this.intervalTime);
    }, error => {
        if (error.error.code === "-32602" && error.error.data.constructor === Array) {
          this.requestError = error.error.data;
        } else {
          this.alertService.error($localize `Internal server error`);
        }
    });
  }
}
