import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClientService } from './http-client.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  url: any = `${environment.API_URL}/classroom`;

  constructor(
    private authenticationService: AuthenticationService,
    private httpClientService: HttpClientService
  ) { }

  create(content): any {
    const user = this.authenticationService.getLogged();
    return this.httpClientService.post(this.url, content);
  }

  get(params = {}): any {
    const url = this.httpClientService.getUrl(`${this.url}`, params);
    return this.httpClientService.get(url);
  }

  getById(id): any {
    const url = `${this.url}/${id}`;
    return this.httpClientService.get(url);
  }

  update(content): any {
    return this.httpClientService.put(`${this.url}/${content._id}`, content);
  }

  delete(contentId): any {
    return this.httpClientService.delete(`${this.url}/${contentId}`);
  }


  getGridConfig() {
    return {
      mode: 'external',
      hideSubHeader: true,
      noDataMessage: 'Nenhuma aula cadastrada',
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      actions: {
        delete: false,
        columnTitle: 'Ações'
      },
      columns: {
        _id: {
          title: 'Id',
          type: 'string',
        },
        dateAndHour: {
          title: 'Data',
          type: 'string',
        },
        title: {
          title: 'Titulo',
          type: 'string'
        },
        type: {
          title: 'Tipo',
          type: 'string',
        },
        teacherName: {
          title: 'Professor',
          type: 'string',
        }
      },
    };
  }

}
