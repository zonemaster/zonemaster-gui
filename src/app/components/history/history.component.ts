import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import {DnsCheckService} from '../../services/dns-check.service';
import {AlertService} from '../../services/alert.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnChanges {

  @Input() history: any[];
  @Output() filterChanged = new EventEmitter<string>();

  public page = 1;
  public pageSize = 10;

  public historyItems: object = {};
  public filter = 'all';

  constructor(private alertService: AlertService, private dnsCheckService: DnsCheckService) { }

  ngOnChanges(changes) {
    if ('history' in changes) {
      this.history = this.setColor(this.history);
      this.setItemsByPage(1);
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
      return item;
    });
  }

  public setItemsByPage(page: number) {
    // TODO rename function
    this.historyItems = this.history.slice( (page - 1) * this.pageSize, page * this.pageSize );
  }

  public filterHistory(value) {
    this.filter = value;
    this.filterChanged.emit(this.filter);
  }

}
