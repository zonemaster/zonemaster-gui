import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from '../../services/app.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public msgBanner: string;
  public navHeight: Number;
  private navHeightSubscription: Subscription;

  constructor(appService: AppService,
              private navigationService: NavigationService) {
     this.msgBanner = appService.getConfig('msgBanner') || '';
  }

  ngOnInit() {
    this.navHeightSubscription = this.navigationService.height.subscribe((newHeight: Number) => {
      this.navHeight = newHeight;
    });
  }

  ngOnDestroy() {
    this.navHeightSubscription.unsubscribe();
  }
}
