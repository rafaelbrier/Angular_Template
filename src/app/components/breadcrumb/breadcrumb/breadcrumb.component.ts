import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlSidebar } from 'src/app/core/template/control/control-sidebar.component';
import { SidebarService } from 'src/app/core/template/service/sidebar.service';
import { Router, ActivatedRoute, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { Breadcrumb } from './model/breadcrumb.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent extends ControlSidebar implements OnInit {

  breadcrumbs: Breadcrumb[] = [];

  @Output()
  hasBreadcrumb = new EventEmitter<boolean>();

  constructor(public sidebarService: SidebarService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private location: Location) {
    super(sidebarService);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const page = this.getPage();
        if (page) {
          this.populateBreadcrumb(page, event.url);
        } else {
          this.breadcrumbs = [];
        }
      }
    });
  }


  public ngOnInit(): void {
    if (this.breadcrumbs.length === 0) {
      const page = this.getPage();
      if (page) {
        this.populateBreadcrumb(page, this.router.routerState.snapshot.url);
      }
    }
  }

  private getPage(): ActivatedRouteSnapshot {
    let route = this.activatedRoute.firstChild;
    let child = route;
    while (child) {
      if (child.firstChild) {
        child = child.firstChild;
        route = child;
      } else {
        child = null;
      }
    }
    return route != null ? route.snapshot : null;
  }

  private populateBreadcrumb(page: ActivatedRouteSnapshot, url: string): void {
    if (this.hasPage(page) && this.hasPageLabel(page) && page.data.hasItemMenu) {
      const bread = new Breadcrumb(page.data.label, url);
      this.breadcrumbs = [];
      let breadFather = null;
      breadFather = this.createBreadFather(page);
      this.createWithPosition(page, bread, breadFather);
    } else if (this.hasPage(page) && this.hasPageLabel(page) && !page.data.hasItemMenu) {
      const bread = new Breadcrumb(page.data.label, url);
      this.breadcrumbs.push(bread);
    } else if (this.hasPage(page) && !this.hasPageLabel(page)) {
      this.breadcrumbs = [];
    }
    this.emitBreadcrumbEvent();
  }

  private emitBreadcrumbEvent(): void {
    if (this.breadcrumbs.length > 0) {
      this.hasBreadcrumb.emit(true);
    } else {
      this.hasBreadcrumb.emit(false);
    }
  }

  private createWithPosition(page: ActivatedRouteSnapshot, bread: Breadcrumb, breadFather: Breadcrumb): void {
    if (!this.isContainLabel(bread)) {
      if (breadFather) {
        this.breadcrumbs.push(breadFather);
      }
      this.breadcrumbs.push(bread);
    } else if (!this.isLast(bread, this.breadcrumbs[this.breadcrumbs.length - 1])) {
      if (page.data.menuName) {
        this.breadcrumbs.splice(this.breadcrumbs.length - 1, 2);
      }
    }
  }

  private createBreadFather(page: ActivatedRouteSnapshot): Breadcrumb {
    if (page.data.menuName) {
      return new Breadcrumb(page.data.menuName, null);
    }
    return null;
  }

  private hasPage(page: ActivatedRouteSnapshot): boolean {
    return page != null && page.data != null;
  }

  private hasPageLabel(page: ActivatedRouteSnapshot): boolean {
    return page.data.label != null && page.data.label !== '';
  }

  private isContainLabel(bread: Breadcrumb): boolean {
    for (let i = 0; i < this.breadcrumbs.length; i++) {
      if (this.breadcrumbs[i].label === bread.label) {
        return true;
      }
    }
    return false;
  }


  private isLast(newBread: Breadcrumb, lastBread: Breadcrumb): boolean {
    return newBread.equal(lastBread);
  }

  public navigate(route: string): void {
    this.router.navigateByUrl(route);
  }

  public back(): void {
    this.location.back();
  }

}
