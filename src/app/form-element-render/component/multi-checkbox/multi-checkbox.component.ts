import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ObjectFormMultiSelector } from '../../../service/Object';
import { changeMulti as changeMultiFunction } from '../../../service/Object';

@Component({
  selector: 'app-fer-multi-checkbox',
  templateUrl: './multi-checkbox.component.html',
  styleUrls: ['./multi-checkbox.component.css']
})
export class MultiCheckboxComponent implements OnInit {
  @Input() mode: string|null = null;
  @Input() formElement = new FormControl('', {});
  @Input() elementClass = '';
  @Input() elementData: ObjectFormMultiSelector;
  @Input() id = '';
  @Input() wrapCheckboxClass = '';
  @Input() checkboxClass = '';
  @Input() checkboxLabelClass = '';

  public changeMulti = changeMultiFunction;

  constructor() { }

  ngOnInit() {
    console.log('KOTA elementData');
  }

  realMode() {
    if (this.mode === null) {
      return this.elementData.mode;
    }
    return this.mode;
  }
}
