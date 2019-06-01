import { Authoraties } from './authoraties.model';
import { BaseModel } from './base.model';

export class User extends BaseModel {
    id: number;
    username: string;
    password: string;
    authorities: Authoraties[] = [];

    constructor(userAuth?: any, user?: User) {
        super();
        if (userAuth) {
            this.username = userAuth.sub;
            this.authorities = this.getAuthoraties(userAuth.authorities);
        } else if (user) {
            this.id = user.id;
            this.username = user.username;
            this.password = user.password;
            this.authorities = user.authorities;
        }
    }

    private getAuthoraties(authorities: string): Authoraties[] {
        if (authorities) {
            const roles = authorities.split(',');
            const auths: Authoraties[] = [];
            for (let index = 0; index < roles.length; index++) {
                auths.push(new Authoraties(roles[index]));
            }
            return auths;
        }
        return [];
    }
}
