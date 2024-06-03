import { Component, OnInit, ViewChild } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { DnsCheckService } from '../../services/dns-check.service';
import { Router} from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { AppService } from '../../services/app.service';
import { Title } from '@angular/platform-browser';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-run-test',
  templateUrl: './run-test.component.html',
  styleUrls: ['./run-test.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RunTestComponent implements OnInit {
  private intervalTime: number;
  public runTestProgression = 0;
  public showResult = false;
  public showProgressBar = false;
  public parentDataDS: any;
  public parentDataNS: any;
  public testId = '';
  public profiles = [];
  public toggleFinished = false;
  public requestError: object;

  @ViewChild(FormComponent) form: FormComponent;

  constructor(private alertService: AlertService,
    private dnsCheckService: DnsCheckService,
    private router: Router,
    private appService: AppService,
    private titleService: Title) {
      this.intervalTime = this.appService.getConfig('pollingInterval');
    }

  ngOnInit() {
    this.dnsCheckService.profileNames().then( (res: string[]) => this.profiles = res );
  }

  public fetchFromParent([type, domain]) {
    this.dnsCheckService.fetchFromParent(domain).then(result => {
      if (type == 'DS') {
        this.parentDataDS = result['ds_list'];
      } else if(type = 'NS') {
        this.parentDataNS = result['ns_list'];
      }
    }, error => {
      if (error.error.code === "-32602" && error.error.data.constructor === Array) {
        this.requestError = error.error.data;
      } else {
        console.log(error);
        this.alertService.error($localize `Error during parent data fetching.`);
        this.form.disableForm(false);
      }
  });
  }

  public runTest(data: object) {
    let testId: string;

    const self = this;

    this.dnsCheckService.startDomainTest(data).then(id => {
      testId = id as string;
      this.showProgressBar = true;

      this.titleService.setTitle(`${data['domain']} · Zonemaster`);

      const handle = setInterval(() => {
        self.dnsCheckService.testProgress(testId).then(res => {

          self.runTestProgression = parseInt(res as string, 10) as number;

          if (self.runTestProgression === 100) {
            clearInterval(handle);
            this.alertService.success($localize `Test completed!`, true);
            self.testId = testId;
            self.showResult = true;
            self.showProgressBar = false;
            self.runTestProgression = 5;
            self.toggleFinished = !self.toggleFinished;
            this.router.navigate(['/result', this.testId ], { state: { displayForm: true, displayNotification: true }});
          }
        });
      }, this.intervalTime);
    }, error => {
        if (error.error.code === "-32602" && error.error.data.constructor === Array) {
          this.requestError = error.error.data;
        } else {
          this.alertService.error($localize `An unexpected server error happened.`);
        }
    });
  }
}
