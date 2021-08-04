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
  private langDefault = 'en';
  public enabledLanguages = [];
  public languages = {};

  constructor(private translateService: TranslateService, appService: AppService, zone: NgZone) {
    this.enabledLanguages = appService.getConfig('enabledLanguages').sort();
    this.languages = appService.getConfig('languages');
    this.langDefault = appService.getConfig('defaultLanguage');

    this.translateService.setDefaultLang(this.langDefault);
    this.lang = localStorage.getItem('lang') || this.translateService.getBrowserLang();

    if (this.isValidLanguage(this.lang)) {
      this.setLanguage(this.lang);
    } else {
      this.setLanguage(this.langDefault);
    }

    this.logoUrl = appService.getConfig('logoUrl');

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
    this.translateService.use(lang).subscribe(() => {
      this.lang = lang;
      localStorage.setItem('lang', this.lang);
    });
  }

  private isValidLanguage(lang: string) {
    return this.enabledLanguages.includes(lang);
  }
}
