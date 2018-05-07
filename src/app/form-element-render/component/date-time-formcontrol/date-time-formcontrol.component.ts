import {Component, Input, OnInit} from '@angular/core';
import { FlatpickrOptions } from 'ng2-flatpickr';
import Russian from 'flatpickr/dist/l10n/ru.js';

@Component({
  selector: 'app-date-time-formcontrol',
  templateUrl: './date-time-formcontrol.component.html',
  styleUrls: ['./date-time-formcontrol.component.css']
})
export class DateTimeFormcontrolComponent implements OnInit {

  @Input() mode: string|null = null;
  @Input() formElement;
  @Input() elementClass = '';
  @Input() id = 'date-time';
  // @Input() defaultDate = 'today';

  date: string;

  exampleOptions: FlatpickrOptions = {
    parent: this,
    // defaultDate: this.defaultDate,
    dateFormat: 'd.m.Y H:i:S',
    enableTime: true,
    time_24hr: true,
    // dateFormat: 'd.m.Y',
    locale: Russian.ru,
    onChange: function(selectedDates, dateStr, instance) {
      this.config.parent.date = dateStr;
    },
  };

  constructor() { }

  ngOnInit() {
    this.formElement.setValue(this.date);
  }

  showValue() {
    this.formElement.setValue(this.date);
  }
}
