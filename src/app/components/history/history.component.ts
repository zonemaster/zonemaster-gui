import { Component, OnInit, Input } from '@angular/core';
import { DnsCheckService } from '../../services/dns-check.service';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
    @Input() history: any[];

    public page = 1;
    public pageSize = 10;

    public historyItems: any[] = [];

    constructor(
        private alertService: AlertService,
        private dnsCheckService: DnsCheckService
    ) {}

    ngOnInit() {
        this.history = this.setColor(this.history);
        this.setItemsByPage(1);
    }

    setColor(data) {
        return data.map((item) => {
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
        this.historyItems = this.history.slice(
            (page - 1) * this.pageSize,
            page * this.pageSize
        );
    }
}
