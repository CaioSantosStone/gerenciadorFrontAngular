import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from '../../../services/content.service';

@Component({
  selector: 'ngx-content-register',
  templateUrl: './content-register.component.html',
  styleUrls: ['./content-register.component.scss']
})
export class ContentRegisterComponent implements OnInit {

  content: any = {};
  id: any = ''
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contentService: ContentService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        if (params.id) {
          this.id = params.id
          this.loadContent();
        };
      });
  }

  async loadContent() {
    try {
      this.content = (await this.contentService.getById(this.id)).content;
    } catch (err) {
    }
  }

  async save() {
    try {
      await this.contentService.create(this.content);
      this.goToList('Conteúdo criado com sucesso');
    } catch (err) {
      this.toastr.error('Não foi possível cadastrar o usuário');
    }
  }

  async update() {
    try {
      await this.contentService.update(this.content);
      this.goToList('Conteúdo atualizado com sucesso');
    } catch (err) {
      this.toastr.error('Não foi possível atualizar o usuário');
    }
  }

  goToList(message?) {
    if (message) {
      this.toastr.success(message);
    }
    this.router.navigateByUrl('/pages/content/manager');
  }

}
