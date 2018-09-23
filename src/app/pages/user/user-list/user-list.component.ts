import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Search } from '../../../helpers/search.helper';
@Component({
  selector: 'ngx-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  keyUpName: Search = new Search(() => this.loadUsers());
  keyUpCpf: Search = new Search(() => this.loadUsers());

  settings: any = {};
  filters: any = {};
  users: any = [];
  source: LocalDataSource = new LocalDataSource();

  constructor(private userService: UserService, private router: Router, private toastrService: ToastrService) { }

  ngOnInit() {
    this.settings = this.userService.getGridConfig();
    this.loadUsers();
  }

  async loadUsers() {
    try {
      const query = {};
      Object.keys(this.filters).forEach(key => {
        if (this.filters[key]) {
          query[key] = this.filters[key];
        }
      });
      this.users = (await this.userService.get(this.filters)).users;
      this.formatUsers();
      this.source.load(this.users);
    } catch (err) {
      console.log(err);
    }
  }

  formatUsers() {
    this.users = this.users.map(user => {
      user.age = this.calculateAge(new Date(user.birth));
      return user;
    });
  }

  private calculateAge(birthday) {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  goToUserRegister(selectedItem) {
    if (selectedItem) {
      this.router.navigate(['/pages/user/register'], { queryParams: { id: selectedItem.data._id } });
      return;
    }
    this.router.navigate(['/pages/user/register']);
  }

  async delete(selectedItem) {
    try {
      const name = selectedItem.data.fullName.split(' ')[0];
      Swal({
        title: 'Você tem certeza?',
        text: `Você tem certeza que deseja deletar o usuário ${name}?`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, apagar',
        cancelButtonText: 'Não, cancelar',
        reverseButtons: true,
      }).then(async (result) => {
        if (!result.value) {
          return;
        }
        await this.userService.delete(selectedItem.data._id);
        this.toastrService.success('Usuário deletado com sucesso!');
        this.users = this.users.filter(user => user._id !== selectedItem.data._id);
        this.source.load(this.users);
      });
    } catch (err) {
      this.toastrService.error('Não foi possível deletar o usuário!');
    }
  }
}
