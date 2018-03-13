import { Component, OnInit, Input } from '@angular/core';
import {FormControl} from '@angular/forms';
import {ObjectFormSelector} from '../../../service/Object';

@Component({
  selector: 'app-fer-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  @Input() mode: string|null = null;
  @Input() formElement = new FormControl('', {});
  @Input() elementClass = '';
  @Input() elementData: ObjectFormSelector;
  @Input() id = '';

  constructor() { }

  ngOnInit() {
  }

  realMode() {
    if (this.mode === null) {
      return this.elementData.mode;
    }
    return this.mode;
  }
  getValue() {
    for (const item of this.elementData.options) {
      if (item.key.toString() === this.formElement.value.toString()) {
        return this.formElement.value;
      }
    }
  }
}
