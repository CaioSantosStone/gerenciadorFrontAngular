import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-reset-password-confirm',
  templateUrl: './reset-password-confirm.component.html',
  styleUrls: ['./reset-password-confirm.component.scss']
})
export class ResetPasswordConfirmComponent implements OnInit {

  user: any = {};

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private loginService: LoginService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((query) => {
      if (query.code) {
        this.user.code = query.code;
      }
    });
  }

  async confirmReset() {
    try {
      if (!this.user.password || !this.user.confirmPassword) {
        this.toastr.error('Verifique os campos e tente novamente', 'Oooops');
        return;
      }
      await this.loginService.resetPasswordConfirm(this.user);
      this.toastr.success('Senha atualizada com sucesso');
      this.router.navigate(['/login/sign-in']);
    } catch (err) {

    }
  }
}
