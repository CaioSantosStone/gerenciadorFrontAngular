import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';
// import {AccountUserService} from '../services/account-user.service'
@Injectable()
export class AuthenticationService {
    constructor(
        private http: Http,
        private storageService: StorageService
        // private accountUserService : AccountUserService,
    ) {
    }

    logout() {
        this.storageService.set('user', null);
        this.storageService.set('token', null);
    }

    public login(data = {}) {
        return this.http.post(`${environment.API_URL}/users/login`, data).map(res => res.json()).toPromise()
    }

    getLogged() {
        const user = this.storageService.get('user');
        return user;
    }
}