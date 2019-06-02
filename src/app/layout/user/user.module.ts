import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ConsultarUsuariosComponent } from './consultar-usuarios/consultar-usuarios.component';
import { UserRoutingModule } from './user.routing.module';
import { UserService } from './service/user.service';
import { FindAllResolve } from './resolve/find-all.resolve';
import { ButtonModule } from 'src/app/components/button/button.module';
import { ActionBarModule } from 'src/app/components/action-bar/action-bar.module';
import { CadastrarUsuarioComponent } from './cadastrar-usuario/cadastrar-usuario.component';
import { UserIdResolve } from './resolve/user-id.resolve';
import { InputModule } from 'src/app/components/input/input.module';
import { TitleModule } from 'src/app/components/title/title.module';
import { ConfirmationModalModule } from 'src/app/components/modals/confirmation-modal/confirmation-modal.module';
import { TableModule } from 'src/app/components/table/table.module';
import { AuthoritieService } from './service/profile.service';
import { DropdownModule } from 'src/app/components/dropdown/dropdown.module';
import { InvalidFeedbackModule } from 'src/app/components/invalid-feedback/invalid-feedback.module';

@NgModule({
    declarations: [
        ConsultarUsuariosComponent,
        CadastrarUsuarioComponent
    ],
    imports: [
        UserRoutingModule,
        CommonModule,
        ButtonModule,
        InputModule,
        InvalidFeedbackModule,
        DropdownModule,
        FormsModule,
        ActionBarModule,
        ReactiveFormsModule,
        TitleModule,
        ConfirmationModalModule,
        TableModule
    ],
    providers: [
        UserService,
        FindAllResolve,
        UserIdResolve,
        AuthoritieService
    ]
})
export class UserModule { }
