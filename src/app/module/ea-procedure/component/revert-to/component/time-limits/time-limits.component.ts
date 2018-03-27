import { Component, OnInit, Input } from '@angular/core';
import {FormGroup} from '@angular/forms';

// import { TimeLimits } from '../../../../service/revert-to/time-limits';

@Component({
  selector: 'app-revert-to-time-limits',
  templateUrl: './time-limits.component.html',
  styleUrls: ['./time-limits.component.css']
})
export class TimeLimitsComponent implements OnInit {
  @Input()formElement: FormGroup;
  // @Input()elementData: TimeLimits;

  constructor() { }

  ngOnInit() {
  }

}
