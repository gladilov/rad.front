import { Component, OnInit, Input } from '@angular/core';
import {FormControl} from '@angular/forms';
import {BaseObject, ObjectFormSelector } from '../../../service/Object';

@Component({
  selector: 'app-fer-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
  @Input() mode: string|null = null;
  @Input() formElement = new FormControl(false, {});
  @Input() elementClass = 'custom-control-input';
  @Input() labelClass = 'custom-control-label';
  @Input() elementData: BaseObject;
  @Input() id = '';
  @Input() label = '';


  constructor() { }

  ngOnInit() {
  }

}
