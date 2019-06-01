export class Authoraties {
    id: number;
    name: string;
    description: string;

    constructor(authName?: string, id?: number) {
        if (authName) {
            this.name = authName;
        }

        if (id) {
            this.id = id;
        }
    }
}