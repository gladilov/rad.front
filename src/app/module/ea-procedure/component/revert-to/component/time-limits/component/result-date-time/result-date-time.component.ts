import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DateTimeFormcontrolComponent} from '../../../../../../../../form-element-render/component/date-time-formcontrol/date-time-formcontrol.component';

@Component({
  selector: 'app-result-date-time',
  templateUrl: './result-date-time.component.html',
  styleUrls: ['./result-date-time.component.css']
})
export class ResultDateTimeComponent implements OnInit {

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
