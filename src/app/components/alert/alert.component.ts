import { Component, OnInit, NgZone} from '@angular/core';

import { Alert, AlertType } from '../../models/index';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  alerts: Alert[] = [];
  public isShrunk = false;

  constructor(private alertService: AlertService, zone: NgZone) {
    window.onscroll = () => {
      zone.run(() => {
        if (window.pageYOffset > 1) {
          this.isShrunk = true;
        } else {
          this.isShrunk = false;
        }
      });
    };
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
