import { Component, OnInit, OnDestroy} from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { Subscription } from 'rxjs';

import { Alert, AlertType } from '../../models/index';
import { AlertService } from '../../services/alert.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AlertComponent implements OnInit, OnDestroy {

  alerts: Alert[] = [];
  public navHeight: number;
  private navHeightSubscription: Subscription;

  constructor(
    private alertService: AlertService,
    private navigationService: NavigationService
  ) {

  }

  ngOnInit() {
    this.alertService.getAlert().subscribe((alert: Alert) => {
      if (!alert) {
        this.alerts = [];
        return;
      }

      this.alerts.push(alert);

      setTimeout(() => this.removeAlert(alert), 5000);
    });

    this.navHeightSubscription = this.navigationService.height.subscribe((newHeight: number) => {
      this.navHeight = newHeight;
    });
  }

  ngOnDestroy() {
    this.navHeightSubscription.unsubscribe();
  }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
  }

  cssClass(alert: Alert) {
    if (!alert) {
      return;
    }
    switch (alert.type) {
      case AlertType.Success:
        return 'alert alert-success';
      case AlertType.Error:
        return 'alert alert-danger';
      case AlertType.Info:
        return 'alert alert-info';
      case AlertType.Warning:
        return 'alert alert-warning';
    }
  }
}
