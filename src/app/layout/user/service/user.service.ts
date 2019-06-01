import { Injectable } from '@angular/core';
import { HttpConnectionBuilder } from 'src/app/core/infra/http/http-connection.builder';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/core/model/user.model';
import { Subscription } from 'rxjs';
import { ToastrCustomService } from 'src/app/core/toastr/toastr.service';

@Injectable()
export class UserService {

    private controller = 'users';

    constructor(private http: HttpClient,
                private toastrService: ToastrCustomService) { }

    public findAll(handlerSuccess: (values: User[]) => void): Subscription {
        return new HttpConnectionBuilder<any>(this.http, this.toastrService)
            .addEndPoint(this.controller)
            .addHandlerSucess(handlerSuccess)
            .addHandlerError(error => { })
            .buildGet();
    }

    public save(user: User, handlerSuccess: (value: any) => void, handlerError: (value: any) => void, successMessage?: string) {
        return new HttpConnectionBuilder<any>(this.http, this.toastrService)
            .addEndPoint(this.controller)
            .addParameter(user)
            .addHandlerSucess(handlerSuccess)
            .addHandlerError(handlerError)
            .addMessageSuccess(successMessage)
            .buildPost();
    }

    public update(user: User, handlerSuccess: (value: any) => void, handlerError: (value: any) => void, successMessage?: string) {
        return new HttpConnectionBuilder<any>(this.http, this.toastrService)
            .addEndPoint(this.controller)
            .addParameter(user)
            .addHandlerSucess(handlerSuccess)
            .addHandlerError(handlerError)
            .addMessageSuccess(successMessage)
            .buildPut();
    }

    public delete(id: number, handlerSuccess: (value: any) => void, handlerError?: (value: any) => void, successMessage?: string) {
        return new HttpConnectionBuilder<any>(this.http, this.toastrService)
            .addEndPoint(this.controller.concat('/') + id)
            .addHandlerSucess(handlerSuccess)
            .addHandlerError(handlerError)
            .addMessageSuccess(successMessage)
            .buildDelete();
    }


    public findAllObservable() {
        return new HttpConnectionBuilder<any>(this.http, this.toastrService)
            .addEndPoint(this.controller)
            .buildGetObservable();
    }

    public findByIdObservable(id: number) {
        return new HttpConnectionBuilder<any>(this.http, this.toastrService)
            .addEndPoint(this.controller.concat('/') + id)
            .buildGetObservable();
    }

}