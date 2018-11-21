import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../../services/class.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent implements OnInit {
  //Controle da SmartTable
  classRooms: any = [];
  settings;
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private classService: ClassService
  ) { }

  ngOnInit() {
    this.settings = this.classService.getGridConfig();
    this.loadClass()
  }

  goToClassRoomRegister(selectedItem) {
    if (selectedItem) {
      this.router.navigate(['/pages/class/register'], { queryParams: { id: selectedItem.data._id } });
      return;
    }
    this.router.navigate(['/pages/class/register']);
  }

  async loadClass() {
    try {
      this.classRooms = (await this.classService.get())['classRooms'];
      this.source.load(this.classRooms);
    } catch (err) {
      console.log(err);
    }
  }

  async delete(selectedItem) {
    try {
      Swal({
        title: 'Você tem certeza?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, apagar',
        cancelButtonText: 'Não, cancelar',
        reverseButtons: true,
      }).then(async (result) => {
        if (!result.value) {
          return;
        }
        await this.classService.delete(selectedItem.data._id);
        this.toastrService.success('Conteúdo deletado com sucesso!');
        this.classRooms = this.classRooms.filter(user => user._id !== selectedItem.data._id);
        this.source.load(this.classRooms);
      });
    } catch (err) {
      this.toastrService.error('Não foi possível deletar o conteúdo!');
    }
  }

}
