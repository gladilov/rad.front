import { Component, OnInit, Input } from '@angular/core';
import {FormControl} from '@angular/forms';
import {ObjectFormSelector} from '../../../service/Object';
import {FormControlSelect} from '../../form-control/form-control-select';

@Component({
  selector: 'app-fer-select2',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class Select2Component implements OnInit {
  @Input() mode: string|null = null;
  @Input() formElement = new FormControlSelect('', {});
  @Input() elementClass = '';
  @Input() elementData: ObjectFormSelector;
  @Input() id = '';

  constructor() { }

  ngOnInit() {
  }

  realMode() {
    if (this.mode === null) {
      return this.formElement.elementData.mode;
    }
    return this.mode;
  }
  getValue() {
    for (const item of this.formElement.elementData.options) {
      if (item.key.toString() === this.formElement.value.toString()) {
        return this.formElement.value;
      }
    }
  }
}
