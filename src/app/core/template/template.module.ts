import { NgModule } from '@angular/core';

import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { SidebarService } from './service/sidebar.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SubmenuComponent } from './sidebar/sub-menu/submenu.component';
import { TooltipModule } from 'src/app/components/directives/tooltip/tooltip.module';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    SubmenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    SubmenuComponent
  ],
  providers: [SidebarService],
})
export class TemplateModule { }
