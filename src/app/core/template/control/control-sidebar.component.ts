import { SidebarService } from '../service/sidebar.service';
import { ViewportEnum } from '../../enum/viewport.enum';

export class ControlSidebar {

    isClosed: boolean;
    isMinimized: boolean;
    isMobile: boolean;

    constructor(public sidebarService: SidebarService) {
        this.sidebarService.isClosed.subscribe(isClosed => {
            this.isClosed = isClosed;
        });

        this.sidebarService.isMinimized.subscribe(isMinimized => {
            this.isMinimized = isMinimized;
        });

        this.sidebarService.isMobile.subscribe(isMobile => {
            this.isMobile = isMobile;
        });

        if (window.screen.width <= ViewportEnum.TABLET) {
            this.toggle();
            this.toggleMobile();
        }
    }

    public toggle(): void {
        this.sidebarService.toggle(!this.isClosed);
    }

    public minimizeSidebar(): void {
        this.sidebarService.minimize(!this.isMinimized);
    }

    public toggleMobile(): void {
        this.sidebarService.toggleMobile(!this.isMobile);
    }

}
