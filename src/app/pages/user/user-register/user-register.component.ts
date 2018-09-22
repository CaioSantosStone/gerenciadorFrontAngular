import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'ngx-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

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
