import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table/table.component';
import { TooltipModule } from '../directives/tooltip/tooltip.module';

@NgModule({
    declarations: [
        TableComponent
    ],
    imports: [
        CommonModule,
        TooltipModule
    ],
    exports: [
        TableComponent
    ]
})
export class TableModule { }
