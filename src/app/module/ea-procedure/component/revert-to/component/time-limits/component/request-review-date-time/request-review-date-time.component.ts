import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DateTimeFormcontrolComponent} from '../../../../../../../../form-element-render/component/date-time-formcontrol/date-time-formcontrol.component';

@Component({
  selector: 'app-request-review-date-time',
  templateUrl: './request-review-date-time.component.html',
  styleUrls: ['./request-review-date-time.component.css']
})
export class RequestReviewDateTimeComponent implements OnInit {

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
