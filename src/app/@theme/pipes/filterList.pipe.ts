import { Pipe, PipeTransform } from '@angular/core';

String.prototype['removeAccents'] = function () {
    return this
        .replace(/[áàãâä]/gi, 'a')
        .replace(/[éè¨ê]/gi, 'e')
        .replace(/[íìïî]/gi, 'i')
        .replace(/[óòöôõ]/gi, 'o')
        .replace(/[úùüû]/gi, 'u')
        .replace(/[ç]/gi, 'c')
        .replace(/[ñ]/gi, 'n')
        .replace(/[^a-zA-Z0-9]/g, ' ');
};

@Pipe({
    name: 'filterList'
})
export class FilterListPipe implements PipeTransform {

    transform(items: any, search: any, prop: any): any {
        if (!items || !search || !prop) {
            return items;
        }
        if (prop instanceof Array) {
            return items.filter(item => prop.some(p => item[p].toLowerCase().removeAccents().includes(search.toLowerCase().removeAccents())));
        } else {
            return items.filter(item => item[prop].toLowerCase().removeAccents().includes(search.toLowerCase().removeAccents()));
        }
    }
}
