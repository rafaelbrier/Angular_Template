import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class LoaderService {

    private loaderSubject = new Subject<boolean>();
    loaderState = this.loaderSubject.asObservable();

    constructor() { }

    show() {
        this.loaderSubject.next(true);
    }
    hide() {
        this.loaderSubject.next(false);
    }
}