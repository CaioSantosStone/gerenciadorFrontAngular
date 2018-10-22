import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  url: any = `${environment.API_URL}/content`;

  constructor(private httpClientService: HttpClientService) { }

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
      actions : {
        delete: false,
        columnTitle: 'Ações'
      },
      columns: {
        _id: {
          title: 'Id',
          type: 'string',
        },
        dayAndHors: {
          title: 'Dia',
          type: 'string',
        },
        title: {
          title: 'Titulo',
          type: 'string'
        },
        type: {
          title: 'Tipo',
          type: 'string',
        }
      },
    };
  }

}
