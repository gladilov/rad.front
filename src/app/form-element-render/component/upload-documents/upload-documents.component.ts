import {Component, Input, OnInit} from '@angular/core';
import { FileSelectDirective, FileDropDirective, FileUploader, FileItem } from 'ng2-file-upload/ng2-file-upload';
import {ParsedResponseHeaders, Headers} from 'ng2-file-upload/ng2-file-upload';
import {FormControl, FormGroup, FormArray} from '@angular/forms';
import { ExtraFileData } from './extra-file-data';

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
    // additionalParameter: {
    //   param1: 'test1',
    //   param2: 'test2'
    // },
    headers: [{name: 'Accept', value: 'application/json'}]
  });
  // public hasBaseDropZoneOver = false;
  // public hasAnotherDropZoneOver = false;
  @Input()formElement = new FormGroup({
    files: new FormGroup({})
  });

  /**
   * Уникальный сквозной индекс для идентификации файлов и связынных с ними сущностей.
   * @type {number}
   */
  private uniqueIndex = 0;
  private extraFileData: ExtraFileData[] = [];

  // file = new FormControl();

  constructor() {}

  ngOnInit() {
    this.uploader.onBuildItemForm = (fileItem, form) => this.onBuildItemForm(fileItem, form);
    // this.uploader.onCompleteItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) =>
    //   this.onCompleteItem(item, response, status, headers);
    this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) =>
       this.onSuccessItem(item, response, status, headers);

    this.uploader.onAfterAddingFile = (fileItem: FileItem) => this.onAfterAddingFile(fileItem);

  }

  onAfterAddingFile(fileItem: FileItem): any {
    this.getDataByFileItem(fileItem);
    console.log('KOTA onAfterAddingFile fileItem ', fileItem);

    // if (fileItem.formData instanceof FormData === false) {
    //   fileItem.formData = new FormData();
    // }
    // const uniqueIndex = this.uniqueIndex++;
    // fileItem.formData.append('uniqueIndex', uniqueIndex);

    // console.log('KOTA onAfterAddingFile fileItem ', fileItem.formData);
    // console.log('KOTA onAfterAddingFile fileItem fileName = ', fileItem.file.name);
    // console.log('KOTA onAfterAddingFile fileItem index = ', fileItem.formData.get('uniqueIndex'));
  }

  onBuildItemForm(fileItem: FileItem, form: any): void {
    console.log('KOTA onBuildItemForm fileItem index= ', fileItem.index);
    console.log('KOTA onBuildItemForm fileItem fileName = ', fileItem.file.name);
    console.log('KOTA onBuildItemForm form = ', form);
    // console.log('KOTA onBuildItemForm formData = ', fileItem.formData.get('uniqueIndex'));
    const data = this.getDataByFileItem(fileItem);
    form.append('uniqueIndex', data.index);
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

  /**
   * Сохраняем название документа для загрузки файла
   * @param {FileItem} item
   * @param {Event} event
   */
  saveDocumentName(item: FileItem, event: Event) {
    const target = <HTMLInputElement>event.target;
    const data = this.getDataByFileItem(item);
    data.title = target.value;
    // if (item.formData instanceof FormData === false) {
    //   item.formData = new FormData();
    // }
    // const formData = item.formData;
    // if (formData.has('title')) {
    //   formData.delete('title'); // т.к. не все браузеры поддерживают set()
    // }
    // formData.append('title', target.value);

    //
    //
    // const index = item.formData.get('uniqueIndex');
    // // console.log('KOTA saveDocumentName data', index, (event.target));
    // for (let i = 0; i < this.extraFileData.length; ++i) {
    //   if (this.extraFileData[i].index === index) {
    //     this.extraFileData[i].title = target.value;
    //     break;
    //   }
    // }
    // const data = new ExtraFileData();
    // data.index = index;
    // data.title = target.value;
    // this.extraFileData.push(data);
  }

  disabledUpload(item: FileItem): boolean {
    const ret = item.isReady || item.isUploading || item.isSuccess || !this.hasDocName(item);
    console.log('KOTA disabledUpload = ', ret);
    return ret;
  }
  /**
   * проверка что для заданного файла есть название документа
   * @param {FileItem} item
   * @returns {boolean}
   */
  hasDocName(item: FileItem): boolean {
    const data = this.getDataByFileItem(item);
    const ret = (data.title !== '');
     return ret;
    // const ret = (item.formData.get('title') !== '');
    // console.log('KOTA hasDocName ret', ret);
    // return ret;

    // const index = item.formData.get('uniqueIndex');
    // for (let i = 0; i < this.extraFileData.length; ++i) {
    //   if (this.extraFileData[i].index === index) {
    //     console.log('KOTA hasDocName ', (this.extraFileData[i].title !== ''));
    //     return (this.extraFileData[i].title !== '');
    //   }
    // }
    // return false;
  }

  private getDataByFileItem(item: FileItem): ExtraFileData {
    if (item.formData.length === 0) {
      const data = new ExtraFileData(this.uniqueIndex++);
      item.formData.push(data);
      return data;
    }
    return item.formData[0];
  }
}
