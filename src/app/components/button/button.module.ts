import { NgModule } from '@angular/core';

import { ButtonComponent } from './button/button.component';
import { CommonModule } from '@angular/common';
import { TooltipModule } from '../directives/tooltip/tooltip.module';

@NgModule({
    declarations: [
        ButtonComponent
    ],
    imports: [
        CommonModule,
        TooltipModule
    ],
    exports: [
        ButtonComponent
    ]
})
export class ButtonModule { }