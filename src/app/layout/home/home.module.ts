import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeRoutingModule } from './home.rounting.module';
import { TitleModule } from 'src/app/components/title/title.module';

@NgModule({
    declarations: [
        DashboardComponent,
    ],
    imports: [
        HomeRoutingModule,
        TitleModule,
        CommonModule
    ],
    providers: [
    ]
})
export class HomeModule { }
