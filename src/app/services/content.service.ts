import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClientService } from './http-client.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  url: any = `${environment.API_URL}/content`;

  constructor(private authenticationService: AuthenticationService, private httpClientService: HttpClientService) { }

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
      noDataMessage: 'Nenhum conteúdo cadastrado',
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      actions: {
        columnTitle: 'Ações'
      },
      columns: {
        _id: {
          title: 'Id',
          type: 'string',
        },
        title: {
          title: 'Título',
          type: 'string',
        },
        subtitle: {
          title: 'Subtítulo',
          type: 'string',
        }
      },
    };
  }

}
