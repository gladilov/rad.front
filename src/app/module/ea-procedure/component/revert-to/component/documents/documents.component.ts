import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';

import { environment } from '../../../../../../../environments/environment';

const URL = environment.apiOptions.uploadFileUrl;

@Component({
  selector: 'app-revert-to-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  @Input()formElement = new FormGroup({}, []);
  form = new FormGroup({}, []);
  fileLoaderOptions = {
    url: URL,
    headers: [{name: 'Accept', value: 'application/json'}]
  };
  @Input()minFiles = 0;
  @Input()maxFiles = 10; // Number.MAX_SAFE_INTEGER;

  constructor() { }

  ngOnInit() {
    // TODO необходимо валидировать количество файлов
    // const minValidator = Validators.min(this.minFiles);
    // const maxValidator = Validators.min(this.maxFiles);
    // this.formElement.setValidators([
    //   minValidator,
    //   maxValidator
    // ]);
  }

}
