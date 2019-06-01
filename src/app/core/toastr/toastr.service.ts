import { Injectable } from '@angular/core';
import { ToastrService, ToastrConfig, Toast } from 'ngx-toastr';

@Injectable()
export class ToastrCustomService {

    constructor(private toastrService: ToastrService) {
        this.toastrService.toastrConfig.iconClasses = {
            error: 'custom-error',
            info: 'custom-info',
            success: 'custom-success',
            warning: 'custom-warning',
        };
    }

    public showErrorMessages(mensagens: string[]): void {
        for (let i = mensagens.length - 1; i >= 0; i--) {
            this.toastrService.error(mensagens[i], '');
        }
    }

    public showErrorMessage(message: string): void {
        this.toastrService.error(message, '');
    }

    public showAllErrorMessage(message: string): void {
        this.toastrService.error(message, '');
    }

    public showWarningMessage(message: string): void {
        this.toastrService.warning(message, '');
    }

    public showSuccessesMessage(mensagens: string[]): void {
        for (let i = mensagens.length - 1; i >= 0; i--) {
            this.toastrService.success(mensagens[i], '');
        }
    }

    public showSuccessMessage(message: string): void {
        this.toastrService.success(message, '');
    }

    public showInfoMessage(message: string): void {
        this.toastrService.info(message, '');
    }

    public showInfoMessages(mensagens: string[]): void {
        for (let i = mensagens.length - 1; i >= 0; i--) {
            this.toastrService.info(mensagens[i], '');
        }
    }

    public showCustomErrorMessage(message: string, erroCode: string): void {
        this.toastrService.error(message, erroCode);
    }

}
