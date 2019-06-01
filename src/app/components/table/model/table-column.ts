export class TableColumn {
    header: string;
    field: string;
    pipe?: any;
    align?: string;
    width?: string;
    functionChangeField?: Function;

    constructor(header?: string, field?: string, pipe?: any, align?: string, width?: string, functionChangeField?: Function) {
        this.header = header ? header : null;
        this.field = field ? field : null;
        this.pipe = pipe ? pipe : null;
        this.align = align ? align : null;
        this.width = width ? width : null;
        this.functionChangeField = functionChangeField ? functionChangeField : null;
        }
}
