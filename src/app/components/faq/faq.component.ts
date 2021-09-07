import { Component, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';
import {TranslateService, LangChangeEvent} from '@ngx-translate/core';
import {ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

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
              private route: ActivatedRoute) {
    this.langChangeSubscription = this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.url = `/assets/faqs/gui-faq-${event.lang}.html`;
      this._http.get(this.url, {responseType: 'text'})
        .subscribe(data => {
          this.faqTemplate = data;
        });
    });
  }

  ngOnInit() {
    this.url = `/assets/faqs/gui-faq-${this.translateService.currentLang}.html`;
    this._http.get(this.url, {responseType: 'text'})
      .subscribe(data => {
        this.faqTemplate = data;
      });

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
}
