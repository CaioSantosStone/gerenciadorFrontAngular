import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  users: any = [];
  evaluation: any = {
    aluno: 'Teste',
    peso: 123
  }

  constructor(private userService: UserService) { }

  onSubmit(form) {
    console.log(form.value);
    console.log(this.evaluation);
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

}
