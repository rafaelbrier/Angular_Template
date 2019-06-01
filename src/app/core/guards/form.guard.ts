import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BaseFormComponent } from '../form/base-form.component';
import { Observable } from 'rxjs';
import { SecurityConstants } from '../model/security-constants.model';

export class FormGuard implements CanDeactivate<any> {

    canDeactivate(component: BaseFormComponent, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        const token = localStorage.getItem(SecurityConstants.TOKEN_KEY);
        if (token && component.registerForm.touched && !component.submitted) {
            return component.canDeactivateMessage();
        }
        return true;
    }

}
