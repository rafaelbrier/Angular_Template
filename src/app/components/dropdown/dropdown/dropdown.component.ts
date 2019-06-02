import { Component, Input, forwardRef, HostListener, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { KeyValue } from 'src/app/core/model/keyvalue.model';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DropdownComponent),
            multi: true
        }
    ]
})
export class DropdownComponent implements ControlValueAccessor {

    public isOpen: boolean;
    public focused: boolean;
    public filtered: boolean;
    public filterValue: string;
    public multiSelecteds: number[] = [];
    public multiSelectedsValues: string[] = [];
    public auxFilterOptions: KeyValue[] = [];

    @Input('value')
    val: any;

    @Input()
    options: KeyValue[];

    @Input()
    type = 'select';

    @Input()
    placeholder = 'Selecione...';

    @Input()
    emptyOptionsMessage = 'Nenhuma Opção Encontrada';

    @Input()
    label: string;

    @Input()
    propertyBind: string;

    @Input()
    loading: boolean;

    @Input()
    toggleAll: boolean;

    @Input()
    filter: boolean;

    onChange: any = () => { };
    onTouched: any = () => { };

    constructor(private eRef: ElementRef) { }

    @HostListener('document:click', ['$event'])
    clickout(event) {
        if (!this.eRef.nativeElement.contains(event.target) && this.isOpen) {
            this.toggleOptions();
        }
    }

    public filterOnKeyup(value): void {
        if (this.filterValue && this.filterValue !== '') {
            const filtered = this.options.filter(option => {
               return option.value.toLowerCase().indexOf(this.filterValue.toLowerCase()) > -1;
            });
            this.options = filtered;
            this.filtered = true;
        } else {
            this.options = [];
            this.restoreOptions();
            this.filtered = false;
        }
    }

    private restoreOptions(): void {
        this.auxFilterOptions.forEach(option => this.options.push(option));
    }

    public saveOptionsFocusFilter(): void {
        if(!this.filterValue) {
            this.auxFilterOptions = [];
            this.options.forEach(option => {
                this.auxFilterOptions.push(option);
            });
        }
    }

    public selectAll(): void {
        if (this.isAllSelected()) {
            this.value = null;
        } else {
            this.options.forEach(option => {
                const index = this.options.indexOf(option);
                if (!this.isSelected(index, option.value)) {
                    this.bindMultiSelect(option, index);
                }
            });
        }
    }

    public select(selected: KeyValue, index: number): void {
        if (this.type === 'select') {
            this.bindSelect(selected);
        } else if (this.type === 'multi') {
            this.bindMultiSelect(selected, index);
        }
    }

    private bindSelect(selected: KeyValue): void {
        if (this.propertyBind) {
            this.value = this.createObject(selected.key);
        } else {
            this.value = selected.key;
        }
        this.isOpen = false;
    }

    private bindMultiSelect(selected: KeyValue, index: number): void {
        this.initValue();
        if (this.isSelected(index, selected.value)) {
            if (this.propertyBind) {
                this.removeMultiSelectedObject(selected, index);
            } else {
                this.removeMultiSelectedValue(selected, index);
            }
        } else {
            if (this.propertyBind) {
                this.addMultiSelectedObject(selected, index);
            } else {
                this.addMultiSelectedValue(selected, index);
            }
        }
        if (this.value.length === 0) {
            this.value = null;
        } else {
            this.onChange(this.value);
            this.onTouched(this.value);
        }
    }

    private addMultiSelectedObject(selected: KeyValue, index: number): void {
        const object = this.createObject(selected.key);
        this.value.push(object);
        this.multiSelecteds.push(index);
        this.multiSelectedsValues.push(selected.value);
    }

    private addMultiSelectedValue(selected: KeyValue, index: number): void {
        this.value.push(selected.key);
        this.multiSelecteds.push(index);
        this.multiSelectedsValues.push(selected.value);
    }

    private removeMultiSelectedObject(selected: KeyValue, index: number): void {
        const obj = this.value.filter(o => o[this.propertyBind] === selected.key);
        const indexRemove = this.value.indexOf(obj[0]);
        this.value.splice(indexRemove, 1);
        this.multiSelecteds.splice(this.multiSelecteds.indexOf(index), 1);
        this.multiSelectedsValues.splice(this.multiSelectedsValues.indexOf(selected.value), 1);
    }

    private removeMultiSelectedValue(selected: KeyValue, index: number): void {
        this.value.splice(this.value.indexOf(selected.key), 1);
        this.multiSelecteds.splice(this.multiSelecteds.indexOf(index), 1);
        this.multiSelectedsValues.splice(this.multiSelectedsValues.indexOf(selected.value), 1);
    }

    private createObject(value: any): any {
        return JSON.parse(`{"${this.propertyBind}": ${value}}`);
    }

    private initValue(): void {
        if (this.value == null) {
            this.value = [];
        }
    }

    public isSelected(index: number, optionValue: string, optionKey?: any): boolean {
        if (this.type === 'select') {
            return this.value === optionKey;
        }

        if (!this.filtered) {
            return this.multiSelecteds.filter(i => i === index).length > 0;
        }
        return this.multiSelectedsValues.filter(value => value === optionValue).length > 0;
    }

    public isAllSelected(): boolean {
        if (this.filtered) {
            return this.multiSelectedsValues && this.auxFilterOptions && this.multiSelectedsValues.length === this.auxFilterOptions.length;
        }
        return this.multiSelecteds && this.options && this.multiSelecteds.length === this.options.length;
    }

    public clearSelected(): void {
        this.multiSelecteds = [];
        this.multiSelectedsValues = [];
    }

    public toggleOptions(): void {
        this.isOpen = !this.isOpen;
        if (!this.isOpen && this.auxFilterOptions.length > 0) {
            this.filterValue = null;
            this.filtered = false;
            this.options = [];
            this.restoreOptions();
            this.auxFilterOptions = [];
        }
    }

    get value(): any {
        return this.val;
    }

    set value(val) {
        if (val == null) {
            this.clearSelected();
        }

        this.val = val;
        this.onChange(val);
        this.onTouched();
    }

    get selectedOption(): string {
        if (this.type === 'select') {
            const propertyValue = this.getValuePropertyBind();
            let key: KeyValue[] = [];
            if (this.filtered) {
                key = this.auxFilterOptions.filter(o => o.key === propertyValue);
            } else {
                key = this.options.filter(o => o.key === propertyValue);
            }
            return key.length > 0 ? key[0].value : null;
        }
        return this.multiSelectedsValues.length > 0 ? this.multiSelectedsValues.join(', ') : null;
    }

    private getValuePropertyBind(index?: number): any {
        if (this.propertyBind) {
            if (this.type === 'select') {
                return this.value[this.propertyBind];
            } else if (this.type === 'multi') {
                return this.value[index][this.propertyBind];
            }
        }
        if (this.value instanceof Array) {
            return this.value[index];
        }
        return this.value;
    }

    public writeValue(value: any): void {
        if (value) {
            this.value = value;
        }
    }

    public registerOnChange(fn) {
        this.onChange = fn;
    }

    public registerOnTouched(fn) {
        this.onTouched = fn;
    }

}
