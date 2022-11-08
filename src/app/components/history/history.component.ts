import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import {DnsCheckService} from '../../services/dns-check.service';
import {AlertService} from '../../services/alert.service';
import { Subscription } from 'rxjs';

import { sanitizeDomain } from '../../utils';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, OnDestroy {

  @Input() history: any[];
  @Input() withinModal: boolean;

  public domainName: string;
  public infoMsg: string;
  public isFormHistory = true;
  public showProgressBar = false;
  public historyProgression = 100;
  public page = 1;
  public pageSize = 10;
  public historyItems: any[] = [];
  public filter = 'all';
  public filteredHistory: any[] = [];

  private langChangeSubscription: Subscription;
  private routeParamsSubscription: Subscription;

  constructor(
      private activatedRoute: ActivatedRoute,
      private alertService: AlertService,
      private translateService: TranslateService,
      private titleService: Title,
      private dnsCheckService: DnsCheckService) {

    this.langChangeSubscription = this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.updateTitle();
    });
  }

  ngOnInit() {
    this.routeParamsSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      if ( params['domain'] ) {
        this.domainName = sanitizeDomain(params['domain']);
        console.log(this.domainName);
        this.getHistory();
      }
    });

    this.populateHistory();
  }

  ngOnDestroy() {
    this.langChangeSubscription.unsubscribe();
    if (this.routeParamsSubscription) {
      this.routeParamsSubscription.unsubscribe();
    }
  }

  private populateHistory() {
    if ( this.history ) {
      this.history = this.setColor(this.history);
      this.filterHistory(this.filter);
      this.setItemsByPage(this.page);
    }
  }

  private resetHistory() {
    this.history = [];
    this.filteredHistory = [];
    this.historyItems = [];
    this.showProgressBar = false;
  }

  private updateTitle() {
    this.translateService.get('History').subscribe((historyTitle: string) => {
      if ( this.domainName ) {
        this.titleService.setTitle(`${this.domainName} · ${historyTitle} · Zonemaster`);
      } else {
        this.titleService.setTitle(`${historyTitle} · Zonemaster`);
      }
    });
  }

  public getHistory(domain:string = undefined) {
    if (!this.history || domain) {
      if ( domain ) {
        this.domainName = sanitizeDomain( domain );
      }
      this.infoMsg = 'History information request is in progress';
      this.showProgressBar = true;
      this.dnsCheckService.getTestHistory({'domain': this.domainName})
      .then( data => {
        this.showProgressBar = false;
        this.history = data as any[];
        if (this.history.length === 0) {
          this.infoMsg = 'No history available for this domain';
          this.resetHistory();
        } else {
          this.populateHistory();
        }
      })
      .catch( data => {
        this.showProgressBar = false;
        this.resetHistory();
        if ( data && data.jsonrpc !== undefined ) {
          this.infoMsg = 'No history available for this domain';
        } else {
            this.infoMsg = 'HISTORY_BACKEND_UNAVAILABLE';
        }
      });
    }
  }

  setColor(data) {
    return data.map(item => {
      if (['critical', 'error'].includes(item.overall_result)) {
        item.color = 'danger';
      } else if ('warning' === item.overall_result) {
        item.color = 'warning';
      } else if ('ok' === item.overall_result) {
        item.color = 'success';
      }
      item.local_creation_time = new Date(item.created_at);
      return item;
    });
  }

  public setItemsByPage(page: number) {
    // TODO rename function
    this.historyItems = this.filteredHistory.slice( (page - 1) * this.pageSize, page * this.pageSize );
  }

  public filterHistory(value) {
    this.filter = value;
    this.filteredHistory = this.history.filter(test => {
      return (this.filter == 'all') || (test.undelegated == (this.filter == 'undelegated'));
    });
    this.setItemsByPage(this.page);
  }

}
