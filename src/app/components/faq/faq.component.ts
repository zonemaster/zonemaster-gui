import { Component, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';
import {TranslateService, LangChangeEvent} from '@ngx-translate/core';
import {ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit, OnDestroy, AfterViewChecked {
  private fragment: string;
  public faqTemplate = '';
  public url = '';

  private langChangeSubscription: Subscription;
  private fragmentSubscription: Subscription;

  constructor(private _http: HttpClient,
              private translateService: TranslateService,
              private route: ActivatedRoute,
              private titleService: Title) {

    this.langChangeSubscription = this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.loadFaq(event.lang)
    });
  }

  ngOnInit() {
    this.loadFaq(this.translateService.currentLang);
    this.fragmentSubscription = this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
  }

  ngOnDestroy() {
    this.langChangeSubscription.unsubscribe();
    this.fragmentSubscription.unsubscribe();
  }

  ngAfterViewChecked(): void {
    try {
      document.querySelector('a[name="' + this.fragment + '"]').scrollIntoView();
      this.fragment = '';
    } catch (e) {}
  }

  loadFaq(lang) {
    this.url = `assets/faqs/gui-faq-${lang}.html`;

    this._http.get(this.url, {responseType: 'text'})
      .subscribe(data => {
        this.faqTemplate = data;
      });

    this.titleService.setTitle(`${$localize `:@@zm.faq.title:FAQ`} · Zonemaster`);
  }
}
