import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SidebarService {

    public isClosed: Subject<boolean> = new Subject<boolean>();
    public isMinimized: Subject<boolean> = new Subject<boolean>();
    public isMobile: Subject<boolean> = new Subject<boolean>();

    public toggle(toggle): void {
        this.isClosed.next(toggle);
    }

    public minimize(minimize): void {
        this.isMinimized.next(minimize);
    }

    public toggleMobile(toggle): void {
        this.isMobile.next(toggle);
    }
}
