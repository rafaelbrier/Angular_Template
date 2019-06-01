import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {

  public hidePassword: boolean;

  @Input('value')
  val: any;

  @Input()
  placeholder: string;

  @Input()
  label: string;

  @Input()
  type = 'text';

  @Input()
  showClearButton = true;

  @Input()
  showSeePasswordButton = false;

  onChange: any = () => { };
  onTouched: any = () => { };

  public toggleSeePassword(): void {
    this.hidePassword = !this.hidePassword;
    if (this.hidePassword) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  get value(): any {
    return this.val;
  }

  set value(val) {
    this.val = val;
    this.onChange(val);
    this.onTouched();
  }

  writeValue(value: any): void {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

}
