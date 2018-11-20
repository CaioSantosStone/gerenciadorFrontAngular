import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  url: any = `${environment.API_URL}/evaluation`;

  constructor(private httpClientService: HttpClientService) { }

  create(evaluation): any {
    return this.httpClientService.post(this.url, evaluation);
  }

  get(user) {
    return this.httpClientService.get(`${this.url}/${user}`);
  }

  update(evaluation): any {
    return this.httpClientService.put(`${this.url}/${evaluation._id}`, evaluation);
  }

}
