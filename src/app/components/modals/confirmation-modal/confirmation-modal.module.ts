import { NgModule } from '@angular/core';

import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { ButtonModule } from '../../button/button.module';
import { ConfirmationModalService } from './service/confirmation-modal.service';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        ConfirmationModalComponent
    ],
    imports: [
        ButtonModule,
        CommonModule
    ],
    exports: [
        ConfirmationModalComponent
    ],
    providers: [
        ConfirmationModalService
    ]
})
export class ConfirmationModalModule { }
