import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        canActivateChild: [AuthGuard],
        loadChildren: './home/home.module#HomeModule'
      },
      {
        path: 'user',
        canActivateChild: [AuthGuard],
        loadChildren: './user/user.module#UserModule'
      },
      {
        path: 'erro',
        canActivateChild: [AuthGuard],
        loadChildren: './erros/erros.module#ErrosModule'
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }