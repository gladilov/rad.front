import { Component, OnInit, Input } from '@angular/core';
import {FormControl} from '@angular/forms';
import {ObjectFormSelector} from '../../../service/Object';

@Component({
  selector: 'app-fer-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  @Input() formElement = new FormControl('', {});
  @Input() elementClass = '';
  @Input() elementData: ObjectFormSelector;
  @Input() id = '';

  constructor() { }

  ngOnInit() {
  }

}
