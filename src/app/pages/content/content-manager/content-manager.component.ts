import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../../services/content.service';
import { Search } from '../../../helpers/search.helper';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-content-manager',
  templateUrl: './content-manager.component.html',
  styleUrls: ['./content-manager.component.scss']
})
export class ContentManagerComponent implements OnInit {

  keyUpName: Search = new Search(() => this.loadContents());

  settings: any = {};
  filters: any = {};
  contents: any = [];
  source: LocalDataSource = new LocalDataSource();

  constructor(private contentService: ContentService, private router: Router, private toastrService: ToastrService) { }

  ngOnInit() {
    this.settings = this.contentService.getGridConfig();
    this.loadContents();
  }

  async loadContents() {
    try {
      const query = {};
      Object.keys(this.filters).forEach(key => {
        if (this.filters[key]) {
          query[key] = this.filters[key];
        }
      });
      this.contents = (await this.contentService.get(this.filters)).contents;
      this.source.load(this.contents);
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
        await this.contentService.delete(selectedItem.data._id);
        this.toastrService.success('Conteúdo deletado com sucesso!');
        this.contents = this.contents.filter(user => user._id !== selectedItem.data._id);
        this.source.load(this.contents);
      });
    } catch (err) {
      this.toastrService.error('Não foi possível deletar o conteúdo!');
    }
  }

  goToContentRegister(selectedItem) {
    if (selectedItem) {
      this.router.navigate(['/pages/content/register'], { queryParams: { id: selectedItem.data._id } });
      return;
    }
    this.router.navigate(['/pages/content/register']);
  }

}
