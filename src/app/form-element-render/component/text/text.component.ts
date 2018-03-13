import { Component, OnInit, Input } from '@angular/core';
import {FormControl} from '@angular/forms';
import {BaseObject} from '../../../service/Object';

@Component({
  selector: 'app-fer-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {
  @Input() mode: string|null = null;
  @Input() formElement = new FormControl('', {});
  @Input() elementClass = '';
  @Input() elementData: BaseObject;
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
}
