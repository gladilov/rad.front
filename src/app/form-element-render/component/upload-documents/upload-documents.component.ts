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
  @Input()formElement = new FormGroup({});
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

  /**
   * Уникальный сквозной индекс для идентификации файлов и связынных с ними сущностей.
   * @type {number}
   */
  private uniqueIndex = 1;

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
//    console.log('KOTA onAfterAddingFile fileItem ', fileItem);
  }

  onBuildItemForm(fileItem: FileItem, form: any): void {
    const data = this.getDataByFileItem(fileItem);
    form.append('uniqueIndex', data.index);
    form.append('title', data.title);
    // console.log('KOTA onBuildItemForm form = ', form);
  }

  onCompleteItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    // console.log('KOTA onCompleteItem FileItem.index', item.index);
    // console.log('KOTA onCompleteItem FileItem filename', item.file.name);
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    // console.log('KOTA onSuccessItem FileItem.index', item.index);
    // console.log('KOTA onSuccessItem FileItem filename', item.file.name);
    console.log('KOTA onSuccessItem FileItem response', response);
    const result = JSON.parse(response);
    const key = <string> result['key'];
    const controlFiles = this.formElement;
    controlFiles.addControl(key, new FormControl({ key: key}, []));
    console.log('KOTA onSuccessItem FileItem KEY=', result['key']);
  }

  /**
   * Сохраняем название документа для загрузки файла
   * @param {FileItem} item
   * @param {Event} event
   */
  saveDocumentName(item: FileItem, event: Event) {
    const target = <HTMLInputElement>event.target;
    const data = this.getDataByFileItem(item);
    data.title = target.value;
  }

  disabledUpload(item: FileItem): boolean {
    return (item.isReady || item.isUploading || item.isSuccess || !this.hasDocName(item));
  }
  /**
   * проверка что для заданного файла есть название документа
   * @param {FileItem} item
   * @returns {boolean}
   */
  hasDocName(item: FileItem): boolean {
    const data = this.getDataByFileItem(item);
    return (data.title !== '');
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
