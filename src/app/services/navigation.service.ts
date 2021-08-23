import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class NavigationService {
    public heightChanged: EventEmitter<Number> = new EventEmitter();
    private _height: Number;

    set height(newHeight) {
        this._height = newHeight;
        this.heightChanged.emit(newHeight)
    }

    get height() {
        return this._height;
    }
}
