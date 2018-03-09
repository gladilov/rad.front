import { Component, OnInit, Input } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-fer-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {
  @Input() formElement = new FormControl('', {});
  @Input() id = '';

  constructor() { }

  ngOnInit() {
  }

}
