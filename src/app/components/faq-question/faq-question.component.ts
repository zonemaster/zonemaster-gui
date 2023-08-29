import { Component, Input, AfterViewInit, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-faq-question',
  templateUrl: './faq-question.component.html',
  styleUrls: ['./faq-question.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FaqQuestionComponent implements AfterViewInit, OnInit, OnDestroy {
  @Input('questionId') questionId;
  @ViewChild('entry') entryElement;
  public isOpen: boolean = false;
  private fragment: string = null;
  private fragmentSub: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.fragment = this.router.getCurrentNavigation().extractedUrl.fragment;
    this.fragmentSub = route.fragment.subscribe(this.checkQuestionState.bind(this));
  }

  ngOnInit() {
    this.checkQuestionState(this.fragment);
  }

  ngOnDestroy() {
    this.fragmentSub.unsubscribe();
  }

  ngAfterViewInit(){
    if (this.isOpen) {
      this.entryElement.nativeElement.scrollIntoView();
    }
  }

  private checkQuestionState(newFragment) {
    if (newFragment === this.questionId) {
      this.isOpen = true;
      if (this.entryElement) {
        this.entryElement.nativeElement.scrollIntoView();
      }
    }
  }

  public toggleOpenEntry() {
    if (!this.isOpen) {
      this.router.navigate(['faq'], { fragment: this.questionId,  state: { scroll: false } });
    } else {
      this.router.navigate(['faq']);
    }

    this.isOpen = !this.isOpen;
  }

}
