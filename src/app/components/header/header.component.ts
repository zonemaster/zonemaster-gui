import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public navHeight: Number;
  private navHeightSubscription: Subscription;

  constructor(private navigationService: NavigationService) { }

  ngOnInit() {
    this.navHeightSubscription = this.navigationService.height.subscribe((newHeight: Number) => {
      this.navHeight = newHeight;
    });
  }

  ngOnDestroy() {
    this.navHeightSubscription.unsubscribe();
  }
}
