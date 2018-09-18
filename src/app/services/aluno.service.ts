import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(private httpClientService: HttpClientService) { }

  create(body) {
    return this.httpClientService.post('', body);
  }

}
