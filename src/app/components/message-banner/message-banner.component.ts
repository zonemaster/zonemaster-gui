import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-message-banner',
  templateUrl: './message-banner.component.html',
  styleUrls: ['./message-banner.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MessageBannerComponent {
  public msgBanner: string;

  constructor(appService: AppService) {
     this.msgBanner = appService.getConfig('msgBanner') || '';
  }

}
