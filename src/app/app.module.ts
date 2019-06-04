import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { SecurityService } from './core/infra/service/security.service';
import { JwtInterceptor } from './core/infra/interceptors/jwt.interceptor';
import { LocalStorageService } from './core/infra/service/local-storage.service';
import { ErrorInterceptor } from './core/infra/interceptors/error.interceptor';
import { ExpirationDateService } from './core/infra/service/expiration-date.service';
import { ToastrCustomModule } from './core/toastr/toastr.module';
import { LoaderService } from './core/infra/service/loader.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    ToastrCustomModule
  ],
  providers: [
    SecurityService, ExpirationDateService, LocalStorageService, LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
