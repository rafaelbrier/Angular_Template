import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

import { User } from 'src/app/core/model/user.model';
import { UserService } from '../service/user.service';
import { BaseFormComponent } from 'src/app/core/form/base-form.component';
import { ConfirmationModalService } from 'src/app/components/modals/confirmation-modal/service/confirmation-modal.service';
import { ToastrCustomService } from 'src/app/core/toastr/toastr.service';
import { AuthoritieService } from '../service/profile.service';
import { KeyValue } from 'src/app/core/model/keyvalue.model';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.scss']
})
export class CadastrarUsuarioComponent extends BaseFormComponent implements OnInit {

  user: User = new User();
  authorities: Observable<KeyValue[]> = new Observable<KeyValue[]>();

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private authoritieService: AuthoritieService,
              private location: Location,
              public formBuilder: FormBuilder,
              public confirmationModalService: ConfirmationModalService,
              private toastrService: ToastrCustomService) {
    super(confirmationModalService);
  }

  ngOnInit() {
    this.user = new User(null, this.route.snapshot.data['user']);
    this.isEditar = this.route.snapshot.data['isEditar'];
    this.authorities = this.authoritieService.findAllCombo();
    this.constructValidations();
    this.populateFormFields();
  }

  private populateFormFields(): void {
    if (this.isEditar) {
      this.registerForm.setValue({ username: this.user.username, authorities: this.user.authorities, password: this.user.password });
    }
  }

  private constructValidations(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      authorities: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  public onSubmit(): void {
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      return;
    }
    
    this.bindFields(this.user, this.registerForm);
    this.save();
  }

  public save(): void {
    if (this.isEditar) {
      this.updateUser();
    } else {
      this.saveUser();
    }
  }

  private saveUser(): void {
    this.userService.save(this.user, success => {
      this.back();
    }, error => {
      this.toastrService.showErrorMessage(error.message);
    });
  }

  private updateUser(): void {
    this.userService.update(this.user, success => {
      this.back();
    }, error => {
      this.toastrService.showErrorMessage(error.message);
    });
  }

  public back(): void {
    this.location.back();
  }

}
