import { Component, OnInit, NgZone, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavigationService } from '../../services/navigation.service';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit, AfterViewInit {
  public logoUrl: string;
  public isNavbarCollapsed = false;
  public isShrunk = false;
  public activeBackToTop = false;
  public lang = 'en';
  private langDefault = 'en';
  public enabledLanguages = [];
  public languages = {};

  @ViewChild('navView', {static: false}) navView: ElementRef;

  constructor(private translateService: TranslateService, private navigationService: NavigationService, appService: AppService, private zone: NgZone ) {
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

    window.addEventListener('scroll', () => {
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
    });
  }
  ngAfterViewInit() {
    let observer = new ResizeObserver(_entries => {
      this.zone.run(() => {
        let rect = this.navView.nativeElement.getBoundingClientRect();
        this.navigationService.height = rect.height;
      })
    });
    observer.observe(this.navView.nativeElement);
  }

  ngOnInit() {
  }

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
