import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClientService } from './http-client.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  url: any = `${environment.API_URL}/evaluation`;

  constructor(private authenticationService: AuthenticationService, private httpClientService: HttpClientService) { }

  create(evaluation): any {
    const user = this.authenticationService.getLogged();
    evaluation.teacher = user._id;
    return this.httpClientService.post(`${this.url}/${evaluation.student}`, evaluation);
  }

  get(user) {
    return this.httpClientService.get(`${this.url}/${user}`);
  }

  getById(id): any {
    const url = `${this.url}/detail/${id}`;
    return this.httpClientService.get(url);
  }

  update(evaluation): any {
    return this.httpClientService.put(`${this.url}/${evaluation._id}`, evaluation);
  }

  delete(contentId): any {
    return this.httpClientService.delete(`${this.url}/${contentId}`);
  }
}
