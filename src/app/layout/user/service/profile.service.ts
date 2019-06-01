import { Injectable } from '@angular/core';
import { HttpConnectionBuilder } from 'src/app/core/infra/http/http-connection.builder';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeyValue } from 'src/app/core/model/keyvalue.model';

@Injectable()
export class AuthoritieService {

    private controller = 'authorities';

    constructor(private http: HttpClient) { }

    public findAllCombo(): Observable<KeyValue[]> {
        return new HttpConnectionBuilder<KeyValue[]>(this.http)
            .addEndPoint(this.controller + '/key-values')
            .buildGetObservable();
    }
}