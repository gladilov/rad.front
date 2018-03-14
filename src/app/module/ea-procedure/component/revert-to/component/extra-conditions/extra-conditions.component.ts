import { Component, OnInit, Input } from '@angular/core';
import {FormGroup} from '@angular/forms';

import { ExtraConditions } from '../../../../service/revert-to/extra-conditions';

@Component({
  selector: 'app-revert-to-extra-conditions',
  templateUrl: './extra-conditions.component.html',
  styleUrls: ['./extra-conditions.component.css']
})
export class ExtraConditionsComponent implements OnInit {
  @Input()formElement: FormGroup;
  @Input()elementData: ExtraConditions;

  constructor() { }

  ngOnInit() {
  }

}
