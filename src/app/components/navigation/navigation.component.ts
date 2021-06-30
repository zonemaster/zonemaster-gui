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
  private lang_default = 'en';

  constructor(private translateService: TranslateService, zone: NgZone) {
    this.translateService.setDefaultLang(this.lang_default);
    this.lang = localStorage.getItem('lang') || this.translateService.getBrowserLang();
    if (this.isValidLanguage(this.lang)) {
      this.setLanguage(this.lang);
    } else {
      this.setLanguage(this.lang_default);
    }
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
    this.translateService.use(lang).subscribe(() => {
      this.lang = lang;
      localStorage.setItem('lang', this.lang);
    });
  }

  private isValidLanguage(lang: string) {
    const validLanguages = [ 'da', 'en', 'fi', 'fr', 'nb', 'sv' ];
    return validLanguages.includes(lang);
  }
}
