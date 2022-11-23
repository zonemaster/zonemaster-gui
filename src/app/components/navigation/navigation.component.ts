import { Component, OnInit, NgZone, AfterViewInit, ViewChild, ElementRef, LOCALE_ID, Inject} from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { AppService } from '../../services/app.service';
import { NavigationEnd, Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { filter, take } from "rxjs/internal/operators";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit, AfterViewInit {
  public logoUrl: string;
  public isNavbarCollapsed = true;
  public isShrunk = false;
  public activeBackToTop = false;
  public lang: string;
  public enabledLanguages = [];
  public languages = {};
  private baseUrl = '';

  @ViewChild('navView', {static: false}) navView: ElementRef;

  constructor(private navigationService: NavigationService,
              appService: AppService,
              private zone: NgZone,
              private router: Router,
              platformLocation: PlatformLocation,
              @Inject(LOCALE_ID) private language: string) {
    this.enabledLanguages = appService.getConfig('enabledLanguages').sort();
    this.languages = appService.getConfig('languages');
    this.baseUrl = platformLocation.getBaseHrefFromDOM();

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

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(take(1))
      .subscribe((event) => {
        // Wait for navigation to end before setting language
        this.lang = localStorage.getItem('lang');

        if (this.isValidLanguage(this.lang)) {
          this.setLanguage(this.lang);
        } else {
          this.setLanguage(this.language);
        }
      });
  }
  ngAfterViewInit() {
    let observer = new ResizeObserver(_entries => {
      this.zone.run(() => {
        let rect = this.navView.nativeElement.getBoundingClientRect();
        this.navigationService.setHeight(rect.height);
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
    console.log(this.baseUrl, this.router.url);
    this.lang = lang;
    localStorage.setItem('lang', lang);

    if (this.language != lang) {
      // TODO: redirect to stored language if different than current language

      const base = new URL(window.origin + this.baseUrl);
      const target = new URL(`../${lang}${this.router.url}`.replace(/\/+$/, ''), base);
      window.location.href = target.href;
    }
  }

  private isValidLanguage(lang: string) {
    return this.enabledLanguages.includes(lang);
  }
}
