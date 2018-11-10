import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'ngx-reset-password-confirm',
  templateUrl: './reset-password-confirm.component.html',
  styleUrls: ['./reset-password-confirm.component.scss']
})
export class ResetPasswordConfirmComponent implements OnInit {

  user: any = {};

  constructor(
    private toastr: ToastrService,
    private loginService: LoginService
  ) { }

  ngOnInit() { }

  async confirmReset() {
    try {
      if (!this.user.password || !this.user.confirmPassword) {
        this.toastr.error('Verifique os campos e tente novamente', 'Oooops');
        return;
      }
    } catch (err) {

    }
  }
}
