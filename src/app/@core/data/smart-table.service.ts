import { Injectable } from '@angular/core';

@Injectable()
export class SmartTableService {

  data = [{
    id: 1,
    fullName: 'Danrley Morais',
    email: 'danrley@morais.com',
    profileType: 'Administrador',
    age: '28',
  }]


  getData() {
    return this.data;
  }
}
