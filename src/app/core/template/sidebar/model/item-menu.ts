import { BaseModel } from 'src/app/core/model/base.model';

export class ItemMenu extends BaseModel {

    title: string;
    icon: string;
    route: string;
    submenus?: ItemMenu[];

    constructor(title?: string, icon?: string, route?: string, submenus?: ItemMenu[]) {
        super();
        this.title = title ? title : null;
        this.icon = icon ? icon : null;
        this.route = route ? route : null;
        this.submenus = submenus ? submenus : null;
    }

    public equals(item: ItemMenu): boolean {
        return this.equalObjects(this, item);
    }
}
