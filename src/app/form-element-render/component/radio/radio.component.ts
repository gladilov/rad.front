import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ObjectFormSelector } from '../../../service/Object';

@Component({
  selector: 'app-fer-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit {
  @Input() formElement = new FormControl('', {});
  @Input() elementClass = '';
  @Input() elementData: ObjectFormSelector;
  @Input() id = '';
  @Input() wrapRadioClass = '';
  @Input() radioLabelClass = '';

  constructor() { }

  ngOnInit() {
  }

}
