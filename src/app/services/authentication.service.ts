import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
// import {AccountUserService} from '../services/account-user.service'
@Injectable()
export class AuthenticationService {
    constructor(
        private http: Http,
        // private accountUserService : AccountUserService,
    ) { 
    }

    login(email, password) {  
        return this.http.post(`${environment.URL_BASE}/is/login`, { email: email, plainPassword: password, token : ''})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                // if (user.accessToken && user.accessToken.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes user.accessToken.account.guid
               //   user.accessToken.blockPrimaryAcess = user.blockPrimaryAcess
                  localStorage.setItem('currentUser', JSON.stringify(user));
                  return user.unfinishMaster              
                // }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    getLogged() {
        let logged = JSON.parse(localStorage.getItem('currentUser'))
        return logged;
    }
}