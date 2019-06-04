import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { SecurityService } from 'src/app/core/infra/service/security.service';
import { BaseFormComponent } from 'src/app/core/form/base-form.component';
import { ViewportEnum } from 'src/app/core/enum/viewport.enum';
import { LoaderService } from 'src/app/core/infra/service/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseFormComponent implements OnInit {

  public isPhoneVersion: boolean;

  constructor(private securityService: SecurityService,
    private formBuilder: FormBuilder,
    private loaderService: LoaderService) {
    super();
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });

    if (window.screen.width <= ViewportEnum.MOBILE) {
      this.isPhoneVersion = true;
    }
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    this.login();
  }

  public login(): void {
    this.loaderService.show();
    const user = { username: this.registerForm.value.username, password: this.registerForm.value.password };
    this.securityService.clearAll();
    this.securityService.autenticar(user, () => this.loaderService.hide());
  }
}
