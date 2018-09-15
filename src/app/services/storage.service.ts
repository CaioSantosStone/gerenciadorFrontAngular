import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() { }

    set(key, value) {
        localStorage.setItem(key, this.convertJSONToStr(value));
    }

    get(key) {
        const data = localStorage.getItem(key);
        return this.convertStrToJSON(data);
    }

    private convertJSONToStr(obj) {
        return typeof obj === 'object' ? JSON.stringify(obj) : obj;
    };

    private convertStrToJSON(obj) {
        try {
            const converted = JSON.parse(obj);
            return converted;
        } catch (err) {
            return obj;
        }
    }
}
