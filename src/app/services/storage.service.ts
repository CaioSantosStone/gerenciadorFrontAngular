import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() { }

    set(key, value) {
        const data = value;
        localStorage.setItem(key, value);
    }

    get(key) {
        const data = localStorage.getItem(key);
        return data;
    }
}
