import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: any = `${environment.API_URL}/users}`;
  
  constructor(private http: HttpClient, private storageService: StorageService) { }

  create(user) {
    return this.http.post(this.url, user).toPromise();
  }

}
