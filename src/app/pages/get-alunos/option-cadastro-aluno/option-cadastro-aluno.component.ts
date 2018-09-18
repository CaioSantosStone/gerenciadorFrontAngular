import { Component, OnInit } from '@angular/core';
import { AlunoService } from '../../../services/aluno.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'ngx-option-cadastro-aluno',
  templateUrl: './option-cadastro-aluno.component.html',
  styleUrls: ['./option-cadastro-aluno.component.scss']
})
export class OptionCadastroAlunoComponent implements OnInit {

  user: any = {};
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  async save() {
    try {
      await this.userService.create(this.user);
    } catch (err) {

    }
  }

}
