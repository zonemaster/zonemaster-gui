import { Component, OnInit } from '@angular/core';
import { DnsCheckService } from '../../services/dns-check.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'app-domain',
    templateUrl: './domain.component.html',
    styleUrls: ['./domain.component.css'],
})
export class DomainComponent implements OnInit {
    private intervalTime = 5 * 1000;
    public is_advanced_options_enabled = false;
    public domain_check_progression = 0;
    public showResult = false;
    public showProgressBar = false;
    public parentData: any;
    public resultID = '';
    public profiles = [];
    public toggleFinished = false;

    constructor(
        private alertService: AlertService,
        private dnsCheckService: DnsCheckService
    ) {}

    ngOnInit() {
        this.dnsCheckService
            .profileNames()
            .then((res: string[]) => (this.profiles = res));
    }

    public fetchFromParent(domain) {
        this.dnsCheckService.fetchFromParent(domain).then(
            (result) => {
                if (
                    result['ds_list'].length === 0 &&
                    result['ns_list'].length === 0
                ) {
                    this.alertService.warn(
                        'There is no delegation for the zone'
                    );
                } else {
                    this.parentData = result;
                    this.alertService.success(
                        'Parent data fetched with success'
                    );
                }
            },
            (error) => {
                console.log(error);
                this.alertService.error('Error during parent data fetching');
            }
        );
    }

    public openOptions(value) {
        this.is_advanced_options_enabled = value;
    }

    public domainCheck(data: object) {
        let domainCheckId: string;

        const self = this;

        this.dnsCheckService.startDomainTest(data).then(
            (id) => {
                domainCheckId = id as string;
                this.showProgressBar = true;
                const handle = setInterval(() => {
                    self.dnsCheckService
                        .testProgress(domainCheckId)
                        .then((res) => {
                            self.domain_check_progression = parseInt(
                                res as string,
                                10
                            ) as number;

                            if (self.domain_check_progression === 100) {
                                clearInterval(handle);
                                this.alertService.success(
                                    `Domain checked completed`
                                );
                                self.resultID = domainCheckId;
                                self.is_advanced_options_enabled = false;
                                self.showResult = true;
                                self.showProgressBar = false;
                                self.domain_check_progression = 5;
                                self.toggleFinished = !self.toggleFinished;
                            }
                        });
                }, this.intervalTime);
            },
            (error) => {
                this.alertService.error(`Internal server error`);
            }
        );
    }
}
