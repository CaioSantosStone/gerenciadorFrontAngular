import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { EvaluationService } from '../../../services/evaluation.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-evaluation-list',
  templateUrl: './evaluation-list.component.html',
  styleUrls: ['./evaluation-list.component.scss',]
})
export class EvaluationListComponent implements OnInit {

  users: any = [];
  userSelected: any;
  viewEvaluation: any = false;
  source: LocalDataSource = new LocalDataSource();

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
    private router: Router,
    private toastrService: ToastrService,
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
      this.source.load(this.evaluations);
    } catch (err) {

    }
  }


  async delete(selectedItem) {
    try {
      Swal({
        title: 'Você tem certeza?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, apagar',
        cancelButtonText: 'Não, cancelar',
        reverseButtons: true,
      }).then(async (result) => {
        if (!result.value) {
          return;
        }
        await this.evaluationService.delete(selectedItem.data._id);
        this.toastrService.success('Avaliação deletado com sucesso!');
        this.evaluations = this.evaluations.filter(user => user._id !== selectedItem.data._id);
        this.source.load(this.evaluations);
      });
    } catch (err) {
      this.toastrService.error('Não foi possível deletar a avaliação!');
    }
  }

  goToContentRegister(selectedItem) {
    if (selectedItem) {
      this.router.navigate(['/pages/evaluation/register'], { queryParams: { id: selectedItem.data._id } });
      return;
    }
    this.router.navigate(['/pages/evaluation/register']);
  }

}
