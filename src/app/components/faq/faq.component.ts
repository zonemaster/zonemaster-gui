Aimport { Component, OnInit, AfterViewChecked, OnDestroy, Inject, LOCALE_ID } from '@angular/core';
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

  private fragmentSubscription: Subscription;

  constructor(private _http: HttpClient,
              private route: ActivatedRoute,
              private titleService: Title,
              @Inject(LOCALE_ID) private language: string) {
  }

  ngOnInit() {
    this.loadFaq(this.language);
    this.fragmentSubscription = this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
  }

  ngOnDestroy() {
    this.fragmentSubscription.unsubscribe();
  }

  ngAfterViewChecked(): void {
    if (!this.fragment) {
      return
    }

    const faqEntry = document.getElementById(this.fragment);
    if (faqEntry !== null) {
      faqEntry.scrollIntoView();
      this.fragment = '';
    }
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
