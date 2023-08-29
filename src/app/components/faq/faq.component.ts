import { Component, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FaqComponent implements OnInit {

  constructor(private titleService: Title, private route: ActivatedRoute ) {

  }

  ngOnInit() {
    this.titleService.setTitle(`${$localize `:@@zm.faq.title:FAQ`} · Zonemaster`);
  }
}
