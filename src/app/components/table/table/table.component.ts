import {
  Component, Input, ElementRef, AfterViewInit, Renderer2,
  ContentChild, TemplateRef, ViewChildren, Output, EventEmitter
} from '@angular/core';

import { TableColumn } from '../model/table-column';
import { TableClassEnum } from '../enum/table-class.enum';
import { ViewportEnum } from 'src/app/core/enum/viewport.enum';
declare var $: any;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {

  public widthHead = '100%';

  @ContentChild(TemplateRef)
  @Input() layoutTemplate: TemplateRef<any>;

  @Input()
  values: any[] = [];

  @Input()
  cols: TableColumn[] = [];

  @Input()
  hasActions: boolean;

  @Input()
  showTooltipLongText = true;

  @Input()
  emptyMessage = 'Nenhum Registro Adicionado';

  @Input()
  actionsWidth = '10em';

  @Input()
  bodyMaxHeight = '';

  @ViewChildren('radio')
  radios: any;

  @Output()
  selectRadio: EventEmitter<any> = new EventEmitter<any>();

  constructor(private eRef: ElementRef,
              private renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
    if (window.screen.width <= ViewportEnum.TABLET) {
      this.addClickLines();
    }
  }

  public callFunction(col: TableColumn, rowData: any): void {
    return col.functionChangeField.call(null, rowData);
  }

  private addClickLines(): void {
    const lines: HTMLCollection = this.eRef.nativeElement.getElementsByTagName('tr');
    for (let index = 0; index < lines.length; index++) {
      this.createButtonsWithActions(lines[index].children[0]);
      const actions = this.getAction(lines[index]);
      this.renderer.removeChild(lines[index], actions);
      this.renderer.appendChild(lines[index].children[0], actions);
      this.setPositionTextAbsolut(lines[index].children[0]);
    }
  }

  private setPositionTextAbsolut(line): void {
    const widthMobileHeader = line.children[0].offsetWidth;
    const text = line.children[1];
    const left = widthMobileHeader + 30;
    this.renderer.setAttribute(text, 'style', `position:absolute;left: ${left}px; width: calc(50% - ${left}px)`);
  }

  private getAction(element): any {
    for (let index = 0; index < element.children.length; index++) {
      const names: string = element.children[index].className;
      if (names.indexOf('actions') > -1) {
        return element.children[index];
      }
    }
  }

  private createButtonsWithActions(element): void {
    if (this.cols.length > 1) {
      const buttonExpand = this.createButton(element, [TableClassEnum.EXPAND_BUTTON, 'mdi', 'mdi-chevron-down']);
      this.listenClick(buttonExpand);
    }
    if (this.hasActions) {
      const buttonSwipe = this.createButton(element, [TableClassEnum.SWIPE_BUTTON, 'mdi', 'mdi-chevron-left-circle-outline']);
      this.listenClick(buttonSwipe);
    }
  }

  private createButton(parent: any, classes: string[]): any {
    const i = this.renderer.createElement('i');
    for (let index = 0; index < classes.length; index++) {
      this.renderer.addClass(i, classes[index]);
    }
    if (this.cols.length <= 1) {
      this.renderer.setStyle(i, 'margin-left', 'auto');
    }
    this.renderer.appendChild(parent, i);
    return i;
  }

  private listenClick(item: any): void {
    this.renderer.listen(item, 'click', (event) => {
      const classAdd = this.getClassAdd(event);
      this.closeAll(event, classAdd);
      const stringClass: string = event.target.parentElement.parentElement.className;
      if (stringClass.indexOf(classAdd) > -1) {
        this.renderer.removeClass(event.target.parentElement.parentElement, classAdd);
        this.setSwipeWidth(classAdd, event, false);
      } else {
        this.renderer.addClass(event.target.parentElement.parentElement, classAdd);
        this.setSwipeWidth(classAdd, event, true);
      }
    });
  }

  private setSwipeWidth(classAdd: string, event, isAdd: boolean): void {
    if (classAdd === TableClassEnum.SWIPE) {
      const actions = event.target.parentElement.children[event.target.parentElement.children.length - 1];
      this.setWidthActionColumn(actions, isAdd);
    }
  }

  private setWidthActionColumn(actionColumn, isAdd: boolean): void {
    if (isAdd) {
      const width = (actionColumn.children.length * 35).toString().concat('px');
      const att = `width: ${width} !important`;
      this.renderer.setAttribute(actionColumn, 'style', att);
    } else {
      this.renderer.setAttribute(actionColumn, 'style', 'width: 0 !important');
    }
  }

  private getClassAdd(event): string {
    if (event.target.classList[0] === TableClassEnum.EXPAND_BUTTON) {
      return TableClassEnum.EXPAND;
    } else if (event.target.classList[0] === TableClassEnum.SWIPE_BUTTON) {
      return TableClassEnum.SWIPE;
    }
    return '';
  }

  private closeAll(event, classAdd: string): void {
    const lines: HTMLCollection = this.eRef.nativeElement.getElementsByTagName('tr');
    const clickedLine = event.target.parentElement.parentElement;
    for (let index = 0; index < lines.length; index++) {
      if (lines[index] !== clickedLine) {
        this.renderer.removeClass(lines[index], TableClassEnum.EXPAND);
        this.renderer.removeClass(lines[index], TableClassEnum.SWIPE);
        this.closeSwipedLines(lines, index);
      } else {
        if (classAdd === TableClassEnum.EXPAND) {
          this.renderer.removeClass(lines[index], TableClassEnum.SWIPE);
          this.closeSwipedLines(lines, index);
        } else {
          this.renderer.removeClass(lines[index], TableClassEnum.EXPAND);
        }
      }
    }
  }

  private closeSwipedLines(lines, index): void {
    const actions = lines[index].children[0].children[lines[index].children[0].children.length - 1];
    this.renderer.setAttribute(actions, 'style', 'width: 0 !important');
  }

  public createTooltip(td, textHeader, value): string {
    if (td && td.clientWidth < textHeader.scrollWidth && this.showTooltipLongText) {
      return value;
    }
    return '';
  }

}
