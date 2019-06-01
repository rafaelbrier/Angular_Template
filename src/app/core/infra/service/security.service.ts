import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpConnectionBuilder } from '../http/http-connection.builder';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Router } from '@angular/router';
import { User } from '../../model/user.model';
import { LocalStorageService } from './local-storage.service';
import { SecurityConstants } from '../../model/security-constants.model';
import { ExpirationDateService } from './expiration-date.service';
import { ToastrCustomService } from '../../toastr/toastr.service';

@Injectable()
export class SecurityService {

    private jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(private http: HttpClient,
                private router: Router,
                private localStorageService: LocalStorageService,
                private expirationDateService: ExpirationDateService,
                private toastrService: ToastrCustomService) { }

    public autenticar(user: any) {
        return new HttpConnectionBuilder<any>(this.http)
            .addEndPoint('login')
            .addHandlerSucess((response: HttpResponse<any>) => {
                this.router.navigate(['home']);
            })
            .addHandlerError(error => {
                this.toastrService.showWarningMessage('Login ou Senha Incorretas');
            })
            .addParameter(user)
            .buildPost();
    }

    public refreshToken(response: HttpResponse<any>): void {
        this.localStorageService.push(SecurityConstants.TOKEN_KEY, response.headers.get(SecurityConstants.AUTH_HEADER));
        this.localStorageService.push(SecurityConstants.USER, this.decodeToken());
        this.updateExpirationDate();
    }

    public updateExpirationDate(): void {
        this.expirationDateService.updateDate(this.getExpirationDate());
    }

    public getExpirationDate(): Date {
        const token = this.tokenKey;
        return this.jwtHelper.getTokenExpirationDate(token);
    }

    public logoutExpiratedSession(): void {
        this.toastrService.showInfoMessage('Sua Sessão Expirou!');
        this.logout();
    }

    public logout(): void {
        this.expirationDateService.updateDate(null);
        this.localStorageService.clearAll();
        this.router.navigate(['']);
    }

    public hasPermission(permission: string): boolean {
        const user = this.decodeToken();
        const permissions = user.authorities.filter(a => a.name === permission);
        return permissions.length > 0;
    }

    public decodeToken(): User {
        const userAuth = this.jwtHelper.decodeToken(this.tokenKey);
        const user = new User(userAuth);
        return user;
    }

    public isTokenExpired(): boolean {
        if (this.tokenKey) {
            return this.jwtHelper.isTokenExpired(this.tokenKey);
        }
        return true;
    }

    public clearAll(): void {
        this.localStorageService.clearAll();
    }

    get tokenKey(): string {
        return this.localStorageService.pull(SecurityConstants.TOKEN_KEY);
    }
}
