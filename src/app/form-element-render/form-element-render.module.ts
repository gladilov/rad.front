import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SelectComponent } from './component/select/select.component';
import { TextComponent } from './component/text/text.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SelectComponent,
    TextComponent
  ],
  exports: [
    SelectComponent,
    TextComponent
  ]
})
export class FormElementRenderModule { }
