import { Component, OnDestroy } from '@angular/core';
import { SecurityService } from './core/infra/service/security.service';
import { ExpirationDateService } from './core/infra/service/expiration-date.service';
import { Router, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { LoaderService } from './core/infra/service/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  timer: any;
  loading: boolean;
  routeLoading: boolean;
  loadingSub: Subscription;

  constructor(private securityService: SecurityService,
    private expirationDateService: ExpirationDateService,
    private router: Router,
    private loaderService: LoaderService) {

    this.expirationDateService.expirationDate.subscribe((date: Date) => {
      clearInterval(this.timer);
      if (date) {
        this.timer = setInterval(() => {
          if (date != null && date < new Date()) {
            date = null;
            this.securityService.logoutExpiratedSession();
          } else if (date == null) {
            clearInterval(this.timer);
          }
        });
      }
    });

    if (this.securityService.isTokenExpired()) {
      this.securityService.logout();
    }

    this.loadingSub = this.loaderService.loaderState.subscribe((loading) => {
      this.loading = loading;
    })
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
    this.securityService.clearAll();
    this.loadingSub.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.routeLoading = true;
        }
        else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel
        ) {
          this.routeLoading = false;
        }
      });
  }
}
