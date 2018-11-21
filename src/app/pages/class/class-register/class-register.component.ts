import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ClassService } from '../../../services/class.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-class-register',
  templateUrl: './class-register.component.html',
  styleUrls: ['./class-register.component.scss']
})
export class ClassRegisterComponent implements OnInit {

  classSelected: any = { student: '' };
  students: any = [];
  teachers: any = [];
  hours: any = [
    '08h00 - 09h00',
    '09h00 - 10h00',
    '10h00 - 11h00',
    '11h00 - 12h00',
    '13h00 - 14h00',
    '14h00 - 15h00',
    '15h00 - 16h00',
    '17h00 - 18h00',
  ];

  id: any = '';

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private classService: ClassService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        if (params.id) {
          this.id = params.id
          this.loadClass();
        };
      });
    this.loadStudents();
    this.loadTeachers();
  }

  async loadStudents() {
    try {
      this.students = (await this.userService.get({ profileType: 'STUDENT' })).users;
    } catch (err) {
    }
  }

  async loadTeachers() {
    try {
      this.teachers = (await this.userService.get({ profileType: 'ADMIN' })).users;
    } catch (err) {
    }
  }

  async loadClass() {
    try {
      this.classSelected = (await this.classService.getById(this.id)).classRoom;
      if (!this.classSelected.student) {
        this.classSelected.student = '';
      }
    } catch (err) {
    }
  }

  async save() {
    try {
      if (!this.classSelected.title) {
        return this.toastr.error('Título inválido!');
      }
      if (!this.classSelected.teacher) {
        return this.toastr.error('Professor inválido!');
      }
      if (!this.classSelected.hour) {
        return this.toastr.error('Horário inválido!');
      }
      if (!this.classSelected.type) {
        return this.toastr.error('Tipo inválido!');
      }
      if (!this.classSelected.date) {
        return this.toastr.error('Data inválida!');
      }
      if (!this.classSelected.student) {
        delete this.classSelected.student;
      }
      await this.classService.create(this.classSelected);
      this.goToList('Aula criada com sucesso');
    } catch (errReponse) {
      if (errReponse && errReponse.error && errReponse.error.error) {
        return this.toastr.error(errReponse.error.error);
      }
      this.toastr.error('Não foi possível cadastrar a aula');
    }
  }

  async update() {
    try {
      if (!this.classSelected.student) {
        delete this.classSelected.student;
      }
      await this.classService.update(this.classSelected);
      this.goToList('Aula atualizado com sucesso');
    } catch (err) {
      this.toastr.error('Não foi possível atualizar a aula');
    }
  }

  goToList(message?) {
    if (message) {
      this.toastr.success(message);
    }
    this.router.navigateByUrl('/pages/class/list');
  }


}
