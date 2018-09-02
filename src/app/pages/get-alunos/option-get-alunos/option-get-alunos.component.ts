import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'ngx-option-get-alunos',
  styleUrls: ['./option-get-alunos.component.scss'],
  templateUrl: './option-get-alunos.component.html',
})
export class OptionGetAlunosComponent implements OnInit {

  constructor(
    private toastr: ToastrService
  ) {

  }


  ngOnInit() {

  }


}
