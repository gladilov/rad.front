import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DateTimeFormcontrolComponent} from '../../../../../../../../form-element-render/component/date-time-formcontrol/date-time-formcontrol.component';

@Component({
  selector: 'app-conditional-holding-date-time',
  templateUrl: './conditional-holding-date-time.component.html',
  styleUrls: ['./conditional-holding-date-time.component.css']
})
export class ConditionalHoldingDateTimeComponent implements OnInit {

  @Input() formElement;
  @ViewChild(DateTimeFormcontrolComponent) dateTime: DateTimeFormcontrolComponent;

  constructor() { }

  ngOnInit() {
  }

  disable() {
    this.dateTime.disablePopup();
  }

  enable() {
    this.dateTime.enablePopup();
  }
}
