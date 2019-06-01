import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login.routing.module';
import { InputModule } from 'src/app/components/input/input.module';
import { ButtonModule } from 'src/app/components/button/button.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InvalidFeedbackModule } from 'src/app/components/invalid-feedback/invalid-feedback.module';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        LoginRoutingModule,
        InputModule,
        InvalidFeedbackModule,
        ButtonModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
    ],
    providers: [
    ]
})
export class LoginModule { }
