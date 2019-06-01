import { NgModule } from '@angular/core';
import { ActionBarComponent } from './action-bar/action-bar.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        ActionBarComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ActionBarComponent
    ]
})
export class ActionBarModule { }