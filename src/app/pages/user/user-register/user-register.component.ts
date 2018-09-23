import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  user: any = { birth: new Date() };
  id: any = ''
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        if (params.id) {
          this.id = params.id
          this.loadUser();
        };
      });
  }

  async loadUser() {
    try {
      this.user = (await this.userService.getById(this.id)).user;
      if (this.user.birth) {
        this.user.birth = new Date(this.user.birth);
      }
    } catch (err) {
    }
  }

  async save() {
    try {
      const result = await this.userService.create(this.user);
      if (!result.success) {
        return;
      }
      this.goToList('Usuário criado com sucesso');
    } catch (err) {
      this.toastr.error('Não foi possível cadastrar o usuário');
    }
  }

  async update() {
    try {
      await this.userService.update(this.user);
      this.goToList('Usuário atualizado com sucesso');
    } catch (err) {
      this.toastr.error('Não foi possível atualizar o usuário');
    }
  }

  goToList(message?) {
    if (message) {
      this.toastr.success(message);
    }
    this.router.navigateByUrl('/pages/user/list');
  }

  get birth() {
    return this.user.birth.toISOString().substring(0, 10);
  }

  set birth(e: any) {
    e = e.split('-');
    let d = new Date(Date.UTC(e[0], e[1] - 1, e[2]));
    this.user.birth.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  }


}
