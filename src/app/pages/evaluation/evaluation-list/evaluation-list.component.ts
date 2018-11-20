import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { EvaluationService } from '../../../services/evaluation.service';

@Component({
  selector: 'ngx-evaluation-list',
  templateUrl: './evaluation-list.component.html',
  styleUrls: ['./evaluation-list.component.scss',]
})
export class EvaluationListComponent implements OnInit {

  users: any = [];
  userSelected: any;
  viewEvaluation: any = false;

  settings = {
    mode: 'external',
    noDataMessage: 'Nenhuma avaliação encontrada',
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
      createdAt: {
        title: 'Data da avaliação',
        type: 'string',
      },
      appraiser: {
        title: 'Avaliador',
        type: 'string',
      },
      weight: {
        title: 'Peso',
        type: 'string',
      },
      height: {
        title: 'Altura',
        type: 'string',
      },
    },
  };

  evaluations = [];

  constructor(
    private userService: UserService,
    private evaluationService: EvaluationService) {
  }


  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {
    try {
      this.users = (await this.userService.get({ profileType: 'STUDENT' })).users;
    } catch (err) {
    }
  }

  onOpen(user) {
    this.userSelected = user;
    this.loadEvaluationByUser();
  }

  async loadEvaluationByUser() {
    try {
      this.viewEvaluation = true;
      this.evaluations = (await this.evaluationService.get(this.userSelected._id))['evaluations'];
    } catch (err) {

    }
  }

}
