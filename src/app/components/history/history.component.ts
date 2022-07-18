import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {DnsCheckService} from '../../services/dns-check.service';
import {AlertService} from '../../services/alert.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, OnDestroy {

  @Input() history: any[];

  public domainName: string;

  public page = 1;
  public pageSize = 10;

  public historyItems: any[] = [];
  public filter = 'all';
  public filteredHistory: any[] = [];

  private routeParamsSubscription: Subscription;

  constructor(
      private activatedRoute: ActivatedRoute,
      private alertService: AlertService,
      private dnsCheckService: DnsCheckService) { }

  ngOnInit() {
    this.routeParamsSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      this.domainName = params['domain'];
      console.log(this.domainName);

      // TODO fetch history for this.domainName in this.history
    });

    this.populateHistory();
  }

  ngOnDestroy() {
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
