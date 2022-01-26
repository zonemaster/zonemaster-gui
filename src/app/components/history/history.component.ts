import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {DnsCheckService} from '../../services/dns-check.service';
import {AlertService} from '../../services/alert.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  @Input() history: any[];

  public page = 1;
  public pageSize = 10;

  public historyItems: any[] = [];
  public filter = 'all';
  public filteredHistory: any[] = [];

  constructor(private alertService: AlertService, private dnsCheckService: DnsCheckService) { }

  ngOnInit() {
    this.history = this.setColor(this.history);
    this.filterHistory(this.filter);
    this.setItemsByPage(this.page);
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
      item.creation_time = new Date(item.creation_time + 'Z');
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
