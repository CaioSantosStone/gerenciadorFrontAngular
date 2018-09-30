import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  evaluation: any = {
    aluno: 'Teste',
    peso: 123
  }

  OnSubmit(form){
    console.log(form.value);
    console.log(this.evaluation);
  }
  constructor() { }

  ngOnInit() { }

}
