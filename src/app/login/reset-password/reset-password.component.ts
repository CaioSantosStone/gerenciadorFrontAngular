import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  confirmPassword: Boolean = false;
  user: any = {};

  constructor(
    private toastr: ToastrService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
  }

  async reset() {
    try {
      if (!this.user.email) {
        this.toastr.error('Verifique seu e-mail e tente novamente', 'Ooops');
        return;
      }
      await this.loginService.resetPassword(this.user);
      this.confirmPassword = !this.confirmPassword;
    } catch (err) {
      let msg = 'Verifique os campos e tente novamente';
      if (err && err.error && err.error.error.message) {
        msg = err.error.error.message;
      }
      this.toastr.error(msg, 'Ooops');
    }
  }
}
