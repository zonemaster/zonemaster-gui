import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class NavigationService {
    public height: BehaviorSubject<Number> = new BehaviorSubject(0);

    setHeight(newHeight) {
        this.height.next(newHeight)
    }
}
