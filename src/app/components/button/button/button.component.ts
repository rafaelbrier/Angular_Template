import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input()
  label: string;

  @Input()
  icon: string;

  @Input()
  type: string;

  @Input()
  appTooltip: string;

  @Input()
  tooltipPosition = 'top';

}
