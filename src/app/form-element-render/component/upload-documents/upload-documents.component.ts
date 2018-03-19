import {Component, Input, OnInit} from '@angular/core';
import { FileSelectDirective, FileDropDirective, FileUploader, FileItem } from 'ng2-file-upload/ng2-file-upload';
import {FormControl, FormGroup} from '@angular/forms';
import {ParsedResponseHeaders} from 'ng2-file-upload';

import { environment } from '../../../../environments/environment';

 const URL = environment.apiOptions.uploadFileUrl;
// const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-fer-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.css']
})
export class UploadDocumentsComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({
    url: URL,
    additionalParameter: {
      param1: 'test1',
      param2: 'test2'
    }
  });
  // public hasBaseDropZoneOver = false;
  // public hasAnotherDropZoneOver = false;
  public formElement = new FormGroup({
  });

  // file = new FormControl();

  constructor() { }

  ngOnInit() {
    this.uploader.onBuildItemForm = (fileItem, form) => this.onBuildItemForm(fileItem, form);
    // this.uploader.onCompleteItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) =>
    //   this.onCompleteItem(item, response, status, headers);
    this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) =>
       this.onSuccessItem(item, response, status, headers);
  }

  onBuildItemForm(fileItem: FileItem, form: any) {
    console.log('KOTA fileItem index= ', fileItem.index);
    console.log('KOTA fileItem fileName = ', fileItem.file.name);
    console.log('KOTA form = ', form);
  }

  onCompleteItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    console.log('KOTA onCompleteItem FileItem.index', item.index);
    console.log('KOTA onCompleteItem FileItem filename', item.file.name);
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    console.log('KOTA onSuccessItem FileItem.index', item.index);
    console.log('KOTA onSuccessItem FileItem filename', item.file.name);
    console.log('KOTA onSuccessItem FileItem response', response);
  }

  // public fileOverBase(e: any): void {
  //   this.hasBaseDropZoneOver = e;
  // }
  //
  // public fileOverAnother(e: any): void {
  //   this.hasAnotherDropZoneOver = e;
  // }
}
