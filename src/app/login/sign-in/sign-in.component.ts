
import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service'
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'ngx-sign-in',
  styleUrls: ['./sign-in.component.scss'],
  templateUrl: './sign-in.component.html',
})

export class SignInComponent {
  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;
  public msgAguard: boolean = false;

  user = {
    email: null,
    password: null
  };

  constructor(
    fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private loginService: LoginService,
    private storageService: StorageService
  ) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public async onSubmit(values: Object) {
    try {
      this.submitted = true;
      if (this.form.invalid) {
        this.toastr.error('Erro', 'Verifique os campos e tente novamente');
        return
      };

      const data: any = await this.loginService.login(this.user);

      this.storageService.set('token', data.token);
      this.storageService.set('user', data.user);
 
      this.toastr.success('Sucesso', 'Login realizado com sucesso');
      this.router.navigateByUrl('/pages/dashboard');
    } catch (err) {
      console.log(err);
      this.toastr.error('Error', 'Não foi possível realizar o login');
    }
  }
}
