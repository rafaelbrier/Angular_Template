import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultarUsuariosComponent } from './consultar-usuarios/consultar-usuarios.component';
import { FindAllResolve } from './resolve/find-all.resolve';
import { CadastrarUsuarioComponent } from './cadastrar-usuario/cadastrar-usuario.component';
import { UserIdResolve } from './resolve/user-id.resolve';
import { FormGuard } from 'src/app/core/guards/form.guard';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'consultar',
                component: ConsultarUsuariosComponent,
                resolve: { users: FindAllResolve },
                data: {
                    menuName: 'Usuários',
                    label: 'Consultar Usuários',
                    hasItemMenu: true,
                }
            },
            {
                path: 'cadastrar',
                children: [
                    {
                        path: '',
                        component: CadastrarUsuarioComponent,
                        resolve: { user: UserIdResolve },
                        canDeactivate: [FormGuard],
                        data: {
                            menuName: 'Usuários',
                            label: 'Cadastrar Usuários',
                            hasItemMenu: true,
                            isEditar: false,
                        }
                    },
                    {
                        path: 'editar/:id',
                        component: CadastrarUsuarioComponent,
                        resolve: { user: UserIdResolve },
                        canDeactivate: [FormGuard],
                        data: {
                            isEditar: true,
                            label: 'Editar Usuários',
                            hasItemMenu: false,
                        }
                    }
                ]
            },
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }