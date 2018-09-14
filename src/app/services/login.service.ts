import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  public login(data = {}) {
    return this.http.post(`${environment.API_URL}/users/login`, data).toPromise()
  }
}
