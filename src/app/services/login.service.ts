import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(data = {}) {
    return this.http.post(`${environment.API_URL}/users/login`, data).toPromise()
  }

  resetPassword(user = {}) {
    return this.http.post(`${environment.API_URL}/users/reset-password`, user).toPromise();
  }

  resetPasswordConfirm(user = {}) {
    return this.http.post(`${environment.API_URL}/users/reset-password-confirm`, user).toPromise();
  }

}
