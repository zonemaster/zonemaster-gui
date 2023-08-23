import { Component, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FaqComponent implements OnInit, OnDestroy, AfterViewChecked {
  private fragment: string;
  public faqTemplate = '';
  public url = '';

  private fragmentSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private titleService: Title) {
  }

  ngOnInit() {
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

  loadFaq() {
    this.titleService.setTitle(`${$localize `:@@zm.faq.title:FAQ`} · Zonemaster`);
  }
}
