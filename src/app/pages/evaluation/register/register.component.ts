import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { EvaluationService } from '../../../services/evaluation.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  id: any = '';
  users: any = [];
  evaluation: any = {
    aluno: 'Teste',
    peso: 123
  }

  months: any = [
    { key: 'Janeiro', value: '1' },
    { key: 'Fevereiro', value: '2' },
    { key: 'Março', value: '3' },
    { key: 'Abril', value: '4' },
    { key: 'Maio', value: '5' },
    { key: 'Junho', value: '6' },
    { key: 'Julho', value: '7' },
    { key: 'Agosto', value: '8' },
    { key: 'Setembro', value: '9' },
    { key: 'Outubro', value: '10' },
    { key: 'Novembro', value: '11' },
    { key: 'Dezembro', value: '12' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService,
    private evaluationService: EvaluationService
  ) { }

  onSubmit(form) {
    console.log(form.value);
    console.log(this.evaluation);
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        if (params.id) {
          this.id = params.id
          this.loadEvaluation();
        };
      });
    this.loadUsers();
  }

  async loadEvaluation() {
    try {
      this.evaluation = (await this.evaluationService.getById(this.id)).evaluation;
    } catch (err) {
    }
  }

  async loadUsers() {
    try {
      this.users = (await this.userService.get({ profileType: 'STUDENT' })).users;
    } catch (err) {
    }
  }

  async save() {
    try {
      await this.evaluationService.create(this.evaluation);
      this.goToList('Avaliação criada com sucesso');
    } catch (err) {
      this.toastr.error('Não foi possível cadastrar a avaliação');
    }
  }

  async update() {
    try {
      await this.evaluationService.update(this.evaluation);
      this.goToList('Avaliação atualizada com sucesso');
    } catch (err) {
      this.toastr.error('Não foi possível atualizar a avaliação');
    }
  }

  goToList(message?) {
    if (message) {
      this.toastr.success(message);
    }
    this.router.navigateByUrl('/pages/evaluation/evaluation-list');
  }

}
