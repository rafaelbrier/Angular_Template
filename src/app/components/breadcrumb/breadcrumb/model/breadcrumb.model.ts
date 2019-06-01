import { BaseModel } from 'src/app/core/model/base.model';

export class Breadcrumb extends BaseModel {
    label: string;
    route: string;

    constructor(label: string, route: string) {
        super();
        this.label = label;
        this.route = route;
    }

    public equal(object: any): boolean {
       return this.equalObjects(this, object);
    }
}
