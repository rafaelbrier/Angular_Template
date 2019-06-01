import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { User } from 'src/app/core/model/user.model';
import { TableColumn } from 'src/app/components/table/model/table-column';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-consultar-usuarios',
  templateUrl: './consultar-usuarios.component.html',
  styleUrls: ['./consultar-usuarios.component.scss']
})
export class ConsultarUsuariosComponent {

  public users: User[] = [];
  public cols: TableColumn[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private userService: UserService) {
      this.users = this.route.snapshot.data.users;
      this.constructCols();
  }

  private constructCols(): void {
    this.cols = [
      new TableColumn('Username', 'username', null, null, '50%'),
      new TableColumn('Authorities', 'authorities', null, null, '30%', this.getAuthorities)
    ];
  }

  public getAuthorities(user: User): string {
    if (user) {
      const auths = user.authorities.map(auth => auth.description);
      return auths.join(',');
    }
    return '';
  }

  public delete(id: number, index: number): void {
    this.userService.delete(id, success => {
      this.users.splice(index, 1);
    });
  }

  public editar(id: number): void {
    this.router.navigate(['user/cadastrar/editar/', id ]);
  }

  public novo(): void {
    this.router.navigate(['user/cadastrar']);
  }

  public back(): void {
    this.location.back();
  }

}
