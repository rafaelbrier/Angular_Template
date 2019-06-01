import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { ControlSidebar } from 'src/app/core/template/control/control-sidebar.component';
import { SidebarService } from 'src/app/core/template/service/sidebar.service';
import { ViewportEnum } from 'src/app/core/enum/viewport.enum';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent extends ControlSidebar implements OnInit {

  public opened: boolean;
  public isDraggable: boolean;

  constructor(public siderbarService: SidebarService,
              private renderer: Renderer2,
              private eRef: ElementRef) {
    super(siderbarService);
  }

  ngOnInit(): void {
    if (window.screen.width <= ViewportEnum.MOBILE) {
      this.isDraggable = true;
    }
  }

  public toggleBar(): void {
    if (window.screen.width <= ViewportEnum.MOBILE) {
      this.opened = !this.opened;
    }
  }

  public touchMove(event): void {
    const bar = this.eRef.nativeElement.getElementsByClassName('action-bar')[0];
    const touch = event.touches[0];
    this.setPosition(bar, touch.pageX, touch.pageY);
    this.invertWidthGrow(bar, touch.pageX);
  }

  private setPosition(bar, leftTouchMove: number, topTouchMove: number): void {
    const leftPos = this.getCalculatedLeftPosition(leftTouchMove);
    const topPos = this.getCalculatedTopPosition(topTouchMove);
    this.renderer.setAttribute(bar, 'style', `left: ${leftPos} !important; top: ${topPos}`);
  }

  private getCalculatedLeftPosition(leftTouchMove: number): string {
    if (leftTouchMove <= 0) {
      return '10px';
    } else if (leftTouchMove > 0 && (window.screen.width - leftTouchMove) <= 0) {
      return 'auto';
    } else {
      return leftTouchMove.toString().concat('px');
    }
  }

  private getCalculatedTopPosition(topTouchMove: number): string {
    if (topTouchMove <= 0) {
      return '10px';
    } else if (topTouchMove > 0 && (window.screen.height - topTouchMove) <= 0) {
      return 'auto';
    } else {
      return topTouchMove.toString().concat('px');
    }
  }

  private invertWidthGrow(bar, left): void {
    if (left <= (window.screen.width / 2)) {
      this.renderer.addClass(bar, 'invert-width-grow');
    } else {
      this.renderer.removeClass(bar, 'invert-width-grow');
    }
  }

}
