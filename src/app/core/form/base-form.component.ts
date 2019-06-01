import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { ConfirmationModal } from 'src/app/components/modals/confirmation-modal/model/confirmation-modal.model';
import { ConfirmationModalService } from 'src/app/components/modals/confirmation-modal/service/confirmation-modal.service';

export class BaseFormComponent {

    public registerForm: FormGroup;
    public submitted = false;
    public isEditar: boolean;

    constructor(public confirmationModalService?: ConfirmationModalService) { }

    public canDeactivateMessage(): boolean | Observable<boolean> {
        if (this.confirmationModalService) {
            const config = new ConfirmationModal();
            config.header = 'Confirmação de Alterações';
            config.message = 'Você perderá suas alterações ao sair! Deseja realmente sair?';
            return this.confirmationModalService.confirm(config).asObservable();
        }
        return true;
    }

    public bindFields(model: object, group: FormGroup): void {
        const keys: string[] = Object.keys(model);
        keys.forEach(prop => {
            const control = group.get(prop);
            if (control) {
                model[prop] = control.value;
            }
        });
    }

    get form() {
        return this.registerForm.controls;
    }
}
