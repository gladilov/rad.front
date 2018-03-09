import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SelectComponent } from './component/select/select.component';
import { TextComponent } from './component/text/text.component';
import { MultiCheckboxComponent } from './component/multi-checkbox/multi-checkbox.component';
import { RadioComponent } from './component/radio/radio.component';

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
    RadioComponent
  ],
  exports: [
    SelectComponent,
    TextComponent,
    MultiCheckboxComponent,
    RadioComponent
  ]
})
export class FormElementRenderModule { }
