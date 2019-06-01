import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrosComponent } from './erros/erros.component';

const routes: Routes = [
    {
        path: '500/:message',
        component: ErrosComponent,
        data: {
            status: '500',
        }
    },
    {
        path: '403/:message',
        component: ErrosComponent,
        data: {
            status: '403',
        }
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ErrosRoutingModule { }