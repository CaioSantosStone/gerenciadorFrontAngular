import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { environment } from '../../environments/environment';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: any = `${environment.API_URL}/users`;

  constructor(private http: HttpClient, private httpClientService: HttpClientService, private storageService: StorageService) { }

  create(user): any {
    return this.http.post(this.url, user).toPromise();
  }

  get(params = {}): any {
    const url = this.httpClientService.getUrl(`${this.url}`, params);
    return this.httpClientService.get(url);
  }

  getById(id): any {
    const url = `${this.url}/${id}`;
    return this.httpClientService.get(url);
  }

  update(user): any {
    return this.httpClientService.put(this.url, user);
  }

  delete(userId): any {
    return this.httpClientService.delete(`${this.url}/${userId}`);
  }

  getGridConfig() {
    return {
      mode: 'external',
      noDataMessage: 'Nenhum usuário cadastrado',
      hideSubHeader: true,
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      columns: {
        _id: {
          title: 'Id',
          type: 'string',
        },
        fullName: {
          title: 'Nome',
          type: 'string',
        },
        profileType: {
          title: 'Tipo de usuário',
          type: 'string',
        },
        email: {
          title: 'E-mail',
          type: 'string',
        },
        cpf: {
          title: 'CPF',
          type: 'string',
        },
        age: {
          title: 'Idade',
          type: 'number',
        },
      },
    };
  }

}
