import { Component, OnInit, OnDestroy } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from '../../services/app.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  public msgBanner: string;
  public navHeight: Number;

  constructor(appService: AppService,
              private navigationService: NavigationService) {
     this.msgBanner = appService.getConfig('msgBanner') || '';
  }

}
