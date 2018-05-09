import {Component, Input, OnInit} from '@angular/core';
import {FileSelectDirective, FileDropDirective, FileUploader, FileItem} from 'ng2-file-upload/ng2-file-upload';
import {ParsedResponseHeaders, Headers} from 'ng2-file-upload/ng2-file-upload';
import {FormControl, FormGroup, FormArray} from '@angular/forms';
import {ExtraFileData} from './extra-file-data';

import {environment} from '../../../../environments/environment';

const URL = environment.apiOptions.uploadFileUrl;

@Component({
  selector: 'app-fer-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.css']
})
export class UploadDocumentsComponent implements OnInit {
  @Input() formElement = new FormGroup({});
  @Input() options = {};
  @Input() minFiles = 0;
  @Input() maxFiles = Number.MAX_SAFE_INTEGER;

  public uploader: FileUploader = new FileUploader({});
  public files = [];
  private uploads = [];
  private hrefs = [];

  /**
   * Уникальный сквозной индекс для идентификации файлов и связынных с ними сущностей.
   * @type {number}
   */
  private uniqueIndex = 1;
  public datas = [];
  public formControls = [];

  constructor() {
  }

  ngOnInit() {
    // options are getting from parent components
    this.uploader.setOptions(this.options);

    this.uploader.onBuildItemForm = (fileItem, form) => this.onBuildItemForm(fileItem, form);

    this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) =>
      this.onSuccessItem(item, response, status, headers);

    this.uploader.onAfterAddingFile = (fileItem: FileItem) => this.onAfterAddingFile(fileItem);
    this.files[0] = this.uploader.queue[0];
  }

  onAfterAddingFile(fileItem: FileItem): any {
    this.getDataByFileItem(fileItem);
    const index = this.uploader.getIndexOfItem(fileItem);
    this.files[index] = this.uploader.queue[index];
  }

  onBuildItemForm(fileItem: FileItem, form: any): void {
    const data = this.getDataByFileItem(fileItem);
    form.append('uniqueIndex', data.index);
    form.append('title', data.title);
  }

  onCompleteItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    const result = JSON.parse(response);
    const key = <string> result['key'];
    const index = this.uploader.getIndexOfItem(item);
    const controlFiles = this.formElement;
    const data = this.getData(index);
    data.key = result['key'];
    const formControl = this.getFormControl(index);
    formControl.value.key = data.key;
    controlFiles.addControl(key, formControl);
    this.setUpload(index, true);
    this.setHref(index, '/etp_back/File/default/download/' + result['key']);
  }

  removeItem(item: FileItem) {
    const index = this.uploader.getIndexOfItem(item);
    const data = this.getDataByFileItem(item);
    item.remove();
    if (data['key'] !== '') {
      const controlFiles = this.formElement;
      controlFiles.removeControl(<string>data['key']);
    }
    this.setFile(index, this.uploader.queue[index]);
    this.setUpload(index, false);
  }

  /**
   * Сохраняем название документа для загрузки файла
   */
  saveDocumentName(item: FileItem, event: Event) {
    let index = this.files.length - 1;
    if (item !== undefined) {
      index = this.uploader.getIndexOfItem(item);
    }
    const target = <HTMLInputElement>event.target;
    const data = this.getData(index);
    const formControl = this.getFormControl(index);
    data.title = target.value;
    formControl.value.title = data.title;
  }

  protected getData(index: number) {
    if (this.datas[index] === undefined) {
      this.datas[index] = new ExtraFileData(this.uniqueIndex++);
    }
    return this.datas[index];
  }

  protected getFormControl(index: number) {
    const data = this.getData(index);
    if (this.formControls[index] === undefined) {
      this.formControls[index] = new FormControl({key: data.key, title: data.title}, []);
    }
    return this.formControls[index];
  }

  protected getFile(index: number) {
    if (this.files[index] === undefined) {
      this.files[index] = this.uploader.queue[index];
    }
    return this.files[index];
  }

  protected setFile(index: number, file) {
    this.files[index] = file;
  }

  protected getUpload(index: number) {
    if (this.uploads[index] === undefined) {
      this.uploads[index] = false;
    }
    return this.uploads[index];
  }

  protected setUpload(index: number, value: boolean) {
    this.uploads[index] = value;
  }

  protected getHref(index: number) {
    if (this.hrefs[index] === undefined) {
      this.hrefs[index] = '';
    }
    return this.hrefs[index];
  }

  protected setHref(index: number, value: string) {
    this.hrefs[index] = value;
  }

  private getDataByFileItem(item: FileItem): ExtraFileData {
    if (item.formData.length === 0) {
      const index = this.uploader.getIndexOfItem(item);
      const data = this.getData(index);
      item.formData.push(data);
    }
    return item.formData[0];
  }

  removeFile(index: number, item) {
    if (item !== undefined) {
      this.removeItem(item);
    }
    this.files.splice(index, 1);
    this.uploads.splice(index, 1);
    this.hrefs.splice(index, 1);
    this.datas.splice(index, 1);
  }

  addFile() {
    if ((this.uploader.queue.length + 1) !== this.files.length && this.files.length < this.maxFiles) {
      this.files.push(undefined);
    }
  }
}
