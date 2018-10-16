import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-evaluation-list',
  templateUrl: './evaluation-list.component.html',
  styleUrls: ['./evaluation-list.component.scss', ]
})
export class EvaluationListComponent implements OnInit {

  settings = {
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
      dataAvaliacao: {
        title: 'Data da avaliação',
        type: 'string',
      },
      avaliador: {
        title: 'Avaliador',
        type: 'string',
      },
      peso: {
        title: 'Peso',
        type: 'string',
      },
      imc: {
        title: 'IMC',
        type: 'string',
      },
    },
  };

  public source;

  constructor() { 
  }

  public aluno;

  public visualizarDataAvaliacao;

  ngOnInit() {
    this.aluno = [ "Jinki winki",  "Jipsi", "Lala", "Po"];
  }

  onOpen(aluno){
    this.carregarDados();
  }
  
  async carregarDados(){
    this.visualizarDataAvaliacao = true;
    this.source = [{
      "dataAvaliacao": "2018-10-02",
      "avaliador": "Solzinho",
      "peso": "192kg",
      "imc": "199.9"
    }];
  }

}
