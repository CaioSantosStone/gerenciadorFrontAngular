import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../../services/class.service';
import { LocalDataSource } from 'ng2-smart-table';


@Component({
  selector: 'ngx-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent implements OnInit {
  //Controle da SmartTable
  settings
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private classService: ClassService
  ) { }



  ngOnInit() {
    this.settings = this.classService.getGridConfig();
    this.loadContents()
  }
  async loadContents() {
    try {
      let teste = [{
        _id: "dsfsfsdfsdfdsfdsfdsf",
        dayAndHors: "27/10/2018",
        title: "BodyJump",
        type: "Fechada",
      }]
      this.source.load(teste);
    } catch (err) {
      console.log(err);
    }
  }


}
