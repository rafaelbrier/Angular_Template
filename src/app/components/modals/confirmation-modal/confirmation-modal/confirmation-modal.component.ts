import { Component } from '@angular/core';

import { ConfirmationModalService } from '../service/confirmation-modal.service';

@Component({
    selector: 'app-confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
    styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {

    constructor(public confirmationModalService: ConfirmationModalService) { }

}
