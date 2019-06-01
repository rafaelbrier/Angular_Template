import { Component, OnDestroy } from '@angular/core';
import { SecurityService } from './core/infra/service/security.service';
import { ExpirationDateService } from './core/infra/service/expiration-date.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  timer: any;

  constructor(private securityService: SecurityService,
              private expirationDateService: ExpirationDateService) {

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
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
    this.securityService.clearAll();
  }

}
