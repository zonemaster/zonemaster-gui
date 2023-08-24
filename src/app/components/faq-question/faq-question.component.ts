import { AfterViewChecked, Component, Input, OnChanges, ViewChild } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq-question',
  templateUrl: './faq-question.component.html',
  styleUrls: ['./faq-question.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FaqQuestionComponent implements OnChanges, AfterViewChecked {
  @Input('questionId') questionId;
  @ViewChild('entry') entryElement;
  public isOpen: boolean = false;
  private fragment: string = null;

  constructor(private router: Router) {
    this.fragment = this.router.getCurrentNavigation().extractedUrl.fragment;
  }

  ngOnChanges() {
    if (!this.isOpen && this.fragment !== null) {
      this.isOpen = this.fragment === this.questionId;
    }
  }

  ngAfterViewChecked() {
    if (this.isOpen && this.fragment === this.questionId) {
      this.entryElement.nativeElement.scrollIntoView();
    }

    this.fragment = null;
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
