import { HttpClient } from '@angular/common/http/http';
import { Subscription, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';
import { ToastrCustomService } from '../../toastr/toastr.service';

export class HttpConnectionBuilder<T> {
    private url: string = '';
    private endPoint: string = '';

    private parameters: any = [];

    private handlerSucess: (value: T) => void;
    private handlerError: (value: any) => void;
    private messageSuccess: string;

    constructor(protected http: HttpClient,
                protected toastrService?: ToastrCustomService) {
    }

    public buildDelete(): Subscription {
        this.constructSuccessMessage('Removido');
        return this.http.delete(this.createURL(), this.parameters)
            .pipe(take(1))
            .subscribe(
                (res: any) => this.doSuccess(res),
                err => this.doError(err)
            );
    }

    public buildPost(): Subscription {
        this.constructSuccessMessage('Cadastrado');
        return this.http.post(this.createURL(), this.parameters)
            .pipe(take(1))
            .subscribe(
                (res: any) => this.doSuccess(res),
                err => this.doError(err)
            );
    }

    public buildPut(): Subscription {
        this.constructSuccessMessage('Alterado');
        return this.http.put(this.createURL(), this.parameters)
            .pipe(take(1))
            .subscribe(
                (res: any) => this.doSuccess(res),
                err => this.doError(err)
            );
    }

    public buildGet(): Subscription {
        return this.http.get(this.createURL() + this.createQueryString())
            .pipe(take(1))
            .subscribe(
                (res: any) => this.doSuccess(res),
                err => this.doError(err)
            );
    }

    public buildGetObservable(): Observable<any> {
        return this.http.get(this.createURL() + this.createQueryString()).pipe(take(1));
    }

    private constructSuccessMessage(action: string): void {
        this.messageSuccess = this.messageSuccess ? this.messageSuccess : `Registro ${action} com sucesso!`;
    }

    private createQueryString(): string {
        const params = new URLSearchParams();

        for (let key in this.parameters) {
            if (this.parameters.hasOwnProperty(key)) {
                if (this.parameters[key]) {
                    params.set(key, this.parameters[key]);
                }
            }
        }

        const queryString = params.toString();

        if (queryString) {
            return '?' + queryString;
        }

        return '';
    }

    private doSuccess(response: T) {
        this.showSuccessMessage();
        if (this.handlerSucess) {
            this.handlerSucess(<T>response);
        }
    }

    private showSuccessMessage(): void {
        if (this.toastrService) {
            this.toastrService.showSuccessMessage(this.messageSuccess)
        }
    }

    private doError(error: any) {
        if (this.handlerError) {
            this.handlerError(error);
        }
    }

    public addMessageSuccess(message: string): HttpConnectionBuilder<T> {
        this.messageSuccess = message;
        return this;
    }

    public addEndPoint(endPoint: string): HttpConnectionBuilder<T> {
        this.endPoint += endPoint;
        return this;
    }

    public addParameter(parameters: any): HttpConnectionBuilder<T> {
        this.parameters = parameters;
        return this;
    }

    public addHandlerSucess(handlerSucess: (value: T) => void): HttpConnectionBuilder<T> {
        this.handlerSucess = handlerSucess;
        return this;
    }

    public addHandlerError(handlerError: (value: any) => void): HttpConnectionBuilder<T> {
        this.handlerError = handlerError;
        return this;
    }

    private createURL(): string {
        if (this.url === '') {
            this.addApplicationServerDomain();
        }

        return this.url + this.endPoint;
    }

    private addApplicationServerDomain() {
        this.url += environment.applicationURL;
    }
}