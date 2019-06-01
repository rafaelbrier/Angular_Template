import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../infra/service/local-storage.service';
import { User } from '../../model/user.model';
import { SecurityConstants } from '../../model/security-constants.model';
import { SecurityService } from '../../infra/service/security.service';
import { ControlSidebar } from '../control/control-sidebar.component';
import { SidebarService } from '../service/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends ControlSidebar implements OnInit {

  public user: User = new User();

  constructor(private localStorageService: LocalStorageService,
              private securityService: SecurityService,
              public sidebarService: SidebarService) {
                super(sidebarService);
  }

  ngOnInit() {
    this.user = this.localStorageService.pull(SecurityConstants.USER);
  }

  public logout(): void {
    this.securityService.logout();
  }

}
