import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { ActivatedRouteSnapshot } from '@angular/router';
import { User } from 'src/app/core/model/user.model';
import { UserService } from '../service/user.service';

@Injectable()
export class FindAllResolve implements Resolve<User> {

    constructor(private userService: UserService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.userService.findAllObservable();
    }
}