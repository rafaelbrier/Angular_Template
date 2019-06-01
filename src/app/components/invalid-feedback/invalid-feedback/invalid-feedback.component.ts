import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-invalid-feedback',
    templateUrl: './invalid-feedback.component.html',
    //styleUrls: ['./invalid-feedback.scss']
  })
  export class InvalidFeedbackComponent {
  
    @Input()
    formItem: AbstractControl;

    @Input()
    validation: string;

    @Input()
    message: string;

    @Input()
    submitted: boolean = false;
  }