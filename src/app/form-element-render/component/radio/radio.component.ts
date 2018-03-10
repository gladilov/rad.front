import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ObjectFormSelector } from '../../../service/Object';

@Component({
  selector: 'app-fer-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit {
  @Input() mode: string|null = null;
  @Input() formElement = new FormControl('', {});
  @Input() elementClass = 'custom-control-input';
  @Input() elementData: ObjectFormSelector;
  @Input() id = '';
  @Input() wrapRadioClass = 'custom-control custom-radio';
  @Input() radioLabelClass = 'custom-control-label';

  constructor() { }

  ngOnInit() {
  }

  realMode() {
    if (this.mode === null) {
      return this.elementData.mode;
    }
    return this.mode;
  }
}
