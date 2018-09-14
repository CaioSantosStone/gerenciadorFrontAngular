import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/finally';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  public getRequestOptions(customHeader?) {
    const token = this.storageService.get('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      })
    };
  }

  public getUrl(url: string, object?: any): string {
    if (!object) {
      return url;
    }
    const arr = [];
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        arr.push(`${key}=${object[key]}`);
      }
    }
    return arr.reduce((item, n) => item + '&' + n, url + '?').replace('&', '');
  }

  getSimple(url) {
    return this.http.get(url)
      .catch((error: any) => {
        if (error.status === 401) {
          return Observable.throw('Acesso  Expirou!');
        }

        return Observable.throw(error);
      });
  }

  async get(url, paramsRequest: any = {}, customHeader?) {
    let params = new HttpParams();

    Object.keys(paramsRequest).forEach(param => {
      params = params.append(param, paramsRequest[param]);
    });

    const requestOptions = this.getRequestOptions(customHeader);
    return this.http.get(url, { ...requestOptions, params })
      .toPromise()
      .catch((err: HttpErrorResponse) => Promise.reject(err));
  }

  post(url, data = {}, customHeader?) {
    return this.http.post(url, data, this.getRequestOptions(customHeader))
      .toPromise()
      .catch((err: HttpErrorResponse) => Promise.reject(err));
  }

  put(url, data = {}) {
    return this.http.put(url, data, this.getRequestOptions())
      .toPromise()
      .catch((err: HttpErrorResponse) => Promise.reject(err));
  }


  patch(url, data = {}) {
    return this.http.patch(url, data, this.getRequestOptions())
      .toPromise()
      .catch((err: HttpErrorResponse) => Promise.reject(err));
  }

  delete(url) {
    return this.http.delete(url, this.getRequestOptions())
      .toPromise()
      .catch((err: HttpErrorResponse) => Promise.reject(err));
  }
}
