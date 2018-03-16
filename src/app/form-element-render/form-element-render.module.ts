import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SelectComponent } from './component/select/select.component';
import { TextComponent } from './component/text/text.component';
import { MultiCheckboxComponent } from './component/multi-checkbox/multi-checkbox.component';
import { RadioComponent } from './component/radio/radio.component';
import { TextareaComponent } from './component/textarea/textarea.component';
import { CheckboxComponent } from './component/checkbox/checkbox.component';
import { UploadDocumentsComponent } from './component/upload-documents/upload-documents.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SelectComponent,
    TextComponent,
    MultiCheckboxComponent,
    RadioComponent,
    TextareaComponent,
    CheckboxComponent,
    UploadDocumentsComponent
  ],
  exports: [
    SelectComponent,
    TextComponent,
    TextareaComponent,
    MultiCheckboxComponent,
    RadioComponent,
    CheckboxComponent,
    UploadDocumentsComponent
  ]
})
export class FormElementRenderModule { }
