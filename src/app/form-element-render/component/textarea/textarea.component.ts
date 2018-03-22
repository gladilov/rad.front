import {Component, OnInit, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BaseObject} from '../../../service/Object';

@Component({
  selector: 'app-fer-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css']
})
export class TextareaComponent implements OnInit {
  @Input() mode: string | null = null;
  @Input() formElement = new FormControl('', {});
  @Input() elementClass = '';
  @Input() elementData = new BaseObject();
  @Input() id = '';

  constructor() {
  }

  ngOnInit() {
  }

  realMode() {
    if (this.mode === null) {
      return this.elementData.mode;
    }
    return this.mode;
  }
}
