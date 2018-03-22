import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular/main';

import { FileUploadModule, FileUploader, FileSelectDirective } from 'ng2-file-upload';

import { SelectComponent } from './component/select/select.component';
import { TextComponent } from './component/text/text.component';
import { MultiCheckboxComponent } from './component/multi-checkbox/multi-checkbox.component';
import { RadioComponent } from './component/radio/radio.component';
import { TextareaComponent } from './component/textarea/textarea.component';
import { CheckboxComponent } from './component/checkbox/checkbox.component';
import { UploadDocumentsComponent } from './component/upload-documents/upload-documents.component';
import { AgGridFormcontrolComponent } from './component/ag-grid-formcontrol/ag-grid-formcontrol.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    FileUploadModule,
    AgGridModule.withComponents([])
  ],
  declarations: [
    SelectComponent,
    TextComponent,
    MultiCheckboxComponent,
    RadioComponent,
    TextareaComponent,
    CheckboxComponent,
    UploadDocumentsComponent,
    CheckboxComponent,
    AgGridFormcontrolComponent
  ],
  exports: [
    SelectComponent,
    TextComponent,
    TextareaComponent,
    MultiCheckboxComponent,
    RadioComponent,
    CheckboxComponent,
    UploadDocumentsComponent,
    CheckboxComponent,
    AgGridFormcontrolComponent
  ]
})
export class FormElementRenderModule { }
