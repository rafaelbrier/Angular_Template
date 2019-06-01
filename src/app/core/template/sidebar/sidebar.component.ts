import { Component, ViewChildren, OnInit, AfterViewInit } from '@angular/core';
import { ControlSidebar } from '../control/control-sidebar.component';
import { SidebarService } from '../service/sidebar.service';
import { ItemMenu } from './model/item-menu';
import { KeyItem } from './model/key-item';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent extends ControlSidebar implements OnInit, AfterViewInit {

  @ViewChildren('submenu')
  submenus: any;

  public itemsMenu: ItemMenu[] = [];
  private keyItems: KeyItem[] = [];
  public indexOpenedSubMenu: number;

  constructor(public sidebarService: SidebarService) {
    super(sidebarService);
  }

  ngOnInit(): void {
    this.criateItemsMenu();
  }

  ngAfterViewInit(): void {
    this.submenus = this.submenus.toArray();
    const itemsWithSubMenu = this.itemsMenu.filter(item => item.submenus !== null);
    this.submenus.forEach((submenu, index) => {
      this.keyItems.push({ key: itemsWithSubMenu[index].title, item: submenu });
    });
  }

  private criateItemsMenu(): void {
    this.populateMenus(new ItemMenu('Dashboard', 'mdi mdi-monitor-dashboard', '/home'));
    this.createMenuUsers();
  }

  private createMenuUsers(): void {
    const userMenu = new ItemMenu('Usuários', 'mdi mdi-account-group', '', [new ItemMenu('Consultar', null, '/user/consultar'),
                                                                            new ItemMenu('Cadastrar', null, '/user/cadastrar')]);
    this.populateMenus(userMenu);
  }

  private populateMenus(menu: ItemMenu): void {
    this.itemsMenu.push(menu);
  }

  public toggleSubmenu(title: string, index: number): void {
    const keyItem = this.keyItems.find(item => item.key === title);
    if (keyItem) {
      keyItem.item.isOpen = !keyItem.item.isOpen;
      this.indexOpenedSubMenu = this.indexOpenedSubMenu === index ? null : index;
      this.keyItems.filter(item => item.item.isOpen && item.key !== title).forEach(item => { item.item.isOpen = false; });
    }
  }

  public reorganizeMenu(): void {
    this.closeMenuMobile();
    this.indexOpenedSubMenu = null;
    this.keyItems.forEach(keyItem => keyItem.item.isOpen = false);
  }

  public closeMenuMobile(): void {
    if (this.isMobile) {
      this.toggle();
    }
  }

  public getHeight(index: number, length: number): string {
    if (length !== null && this.indexOpenedSubMenu === index) {
      return (45 + (30 * length)).toString().concat('px');
    }
  }

}
