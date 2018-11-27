import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from '../../../services/content.service';
import { NgUploaderOptions } from 'ngx-uploader';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'ngx-content-register',
  templateUrl: './content-register.component.html',
  styleUrls: ['./content-register.component.scss']
})
export class ContentRegisterComponent implements OnInit {

  users: any = [];
  content: any = {};
  id: any = ''
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contentService: ContentService,
    private toastr: ToastrService,
    private userService: UserService
  ) { }

  arrayImg = []

  defaultPicture = "https://blog.adias.com.br/wp-content/uploads/2017/01/59382-academia-com-arcondicionado-afinal-pode-ou-nao-pode.jpg"

  ngOnInit() {
    this.loadUsers();
    this.route.queryParams
      .subscribe(params => {
        if (params.id) {
          this.id = params.id
          this.loadContent();
        };
      });
  }

  public uploaderOptions: NgUploaderOptions = {
    url: '',
  };


  async loadUsers() {
    try {
      this.users = (await this.userService.get({ profileType: 'STUDENT' })).users;
    } catch (err) {
    }
  }

  async loadContent() {
    try {
      this.content = (await this.contentService.getById(this.id)).content;
      
      if(this.content.images.length > 0){
        for(let i = 0; i < this.content.images.length; i++){
          this.arrayImg.push({
            id: i,
            url: this.content.images[i]
          })
        }
        this.content.img = true
      }
    } catch (err) {
    }
  }

  async save() {
    try {
      let arrayEntityLocal = JSON.parse(localStorage.getItem('entity'))
      if(arrayEntityLocal){
        if(!this.content.mainImg){
          this.content.mainImg = arrayEntityLocal[0] 
        }else{
          this.content.images = arrayEntityLocal
        }
      }
      await this.contentService.create(this.content);
      this.goToList('Conteúdo criado com sucesso');
    } catch (err) {
      this.toastr.error('Não foi possível cadastrar o usuário');
    }
  }

  async update() {
    try {
      let arrayEntityLocal = JSON.parse(localStorage.getItem('entity'))
      if(arrayEntityLocal){
        if(!this.content.mainImg){
          this.content.mainImg = arrayEntityLocal[0] 
        }else{
          this.content.images = arrayEntityLocal
        }
      }
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

  newImg() {
    this.arrayImg.push({
      id : new Date().toString(),
      url: ''
    })
    this.content.img = true
  }

}
