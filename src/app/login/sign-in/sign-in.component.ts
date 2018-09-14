
import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service'
import { ToastrService } from 'ngx-toastr';

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


  constructor(fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];

    
  }

  public onSubmit(values: Object): void {
    this.submitted = true;
    if (this.form.invalid) {
      
      return
    }
    localStorage.setItem('currentUser', 'teste');
    this.toastr.success('Sucesso', 'Login realizado com sucesso');
    this.router.navigate(['/pages/dashboard']);
    
    //So terminar
    // this.authenticationService.login(this.user.email, this.user.password)
    //   .subscribe(
    //     data => {
    //       this.toastr.success('Sucesso', 'Login realizado com sucesso');
    //       this.router.navigate(['/pages/dashboard']);
    //     },
    //     error => {
    //       this.toastr.error('Error', 'Falha ao realizar Login');
    //       console.log(error)
    //     });

  }



}
