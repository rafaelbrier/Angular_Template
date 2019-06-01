import { Component } from '@angular/core';

import { ControlSidebar } from '../core/template/control/control-sidebar.component';
import { SidebarService } from '../core/template/service/sidebar.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent extends ControlSidebar {

  public hasBreadcrumb: boolean;

  constructor(public sidebarService: SidebarService) {
    super(sidebarService);
  }

  public changeRouterContainerTop(hasBreadcrumb: boolean): void {
    this.hasBreadcrumb = hasBreadcrumb;
  }

}
