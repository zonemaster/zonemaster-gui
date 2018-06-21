import { Component, OnInit, NgZone} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AppService} from '../../services/app.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  public logoUrl: string;
  public isNavbarCollapsed = false;
  public isShrunk = false;
  public activeBackToTop = false;
  public lang = 'en';

  constructor(private translateService: TranslateService, zone: NgZone) {
    this.translateService.setDefaultLang(this.lang);
    this.lang = this.translateService.getBrowserLang();
    this.translateService.use(this.lang);
    this.logoUrl = AppService.getLogoUrl();
    window.onscroll = () => {
      zone.run(() => {
        if (window.pageYOffset > 0) {
          this.isShrunk = true;
        } else {
          this.isShrunk = false;
        }

        if (window.pageYOffset > 250) {
          this.activeBackToTop = true;
        } else {
          this.activeBackToTop = false;
        }
      });
    };
  }

  ngOnInit() {}

  public backToTop() {
    window.scrollTo(0, 0);
  }

  public setLanguage(lang: string) {
    this.translateService.use(lang);
  }
}
