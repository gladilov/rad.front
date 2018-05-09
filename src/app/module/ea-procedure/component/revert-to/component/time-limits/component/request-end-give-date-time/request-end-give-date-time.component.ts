import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DateTimeFormcontrolComponent} from '../../../../../../../../form-element-render/component/date-time-formcontrol/date-time-formcontrol.component';

@Component({
  selector: 'app-request-end-give-date-time',
  templateUrl: './request-end-give-date-time.component.html',
  styleUrls: ['./request-end-give-date-time.component.css']
})
export class RequestEndGiveDateTimeComponent implements OnInit {

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
