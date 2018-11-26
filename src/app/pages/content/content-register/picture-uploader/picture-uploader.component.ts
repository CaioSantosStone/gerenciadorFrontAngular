import {Component, ViewChild, Input, Output, EventEmitter, ElementRef, Renderer} from '@angular/core';
import * as AWS from 'aws-sdk'
import { NgUploaderModule } from 'ngx-uploader';
import { NgUploaderOptions } from 'ngx-uploader';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'ba-picture-uploader',
  styleUrls: ['./picture-uploader.component.scss'],
  templateUrl: './picture-uploader.component.html',
})
export class BaPictureUploader {
  s3: AWS.S3 = new AWS.S3({
    params: {
      Bucket: environment.s3.bucket
    }
  });


  @Input() defaultPicture:string = '';
  @Input() picture:string = '';

  @Input() uploaderOptions:NgUploaderOptions = { url: '' };
  @Input() canDelete:boolean = true;

  @Output() onUpload = new EventEmitter<any>();
  @Output() onUploadCompleted = new EventEmitter<any>();

  @Input() guid 

  @Input() type

  @ViewChild('fileUpload') public _fileUpload:ElementRef;

  public uploadInProgress:boolean;

  constructor(private renderer: Renderer,
  ) {}

  beforeUpload(uploadingFile): void {
    let files = this._fileUpload.nativeElement.files;
    if (files.length == 1) {
      const file = files[0];
      this.uploadAMAZON(file)
      this._changePicture(file);
      if (!this._canUploadOnServer()) {
        uploadingFile.setAbort();
      } else {
        this.uploadInProgress = true;
      }
    }
  }

  uploadAMAZON(file){
    var params = {
      Bucket: environment.s3.bucket,
      Key: this.type + '/' + this.guid,
      ContentType: file.type,
      Body: file,
      ACL: 'public-read'
      
    };
    var that = this
    console.log('sdfdsf')
    this.s3
      .upload(params, function(err, data) {
        if (err) {
          console.log('erro')
          console.log(err)
        }
        if (data){
          var entity = {
            alter : that.type,
            pictureURL : data.Location,
            guid : that.guid
          }
          console.log(data)
          localStorage.setItem('entity', JSON.stringify(entity));

        }
        
      })
  }

  bringFileSelector():boolean {
    this.renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
    return false;
  }

  removePicture():boolean {
    this.picture = '';
    return false;
  }

  _changePicture(file:File):void {
    const reader = new FileReader();
    reader.addEventListener('load', (event:Event) => {
      this.picture = (<any> event.target).result;
    }, false);
    reader.readAsDataURL(file);
  }

  _onUpload(data):void {
    if (data['done'] || data['abort'] || data['error']) {
      this._onUploadCompleted(data);
    } else {
      this.onUpload.emit(data);
    }
  }

  _onUploadCompleted(data):void {
    this.uploadInProgress = false;
    this.onUploadCompleted.emit(data);
  }

  _canUploadOnServer():boolean {
    return !!this.uploaderOptions['url'];
  }

}
