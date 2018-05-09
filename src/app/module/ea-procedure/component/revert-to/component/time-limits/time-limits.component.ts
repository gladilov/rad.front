import {Component, OnInit, Input, OnDestroy, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {SharedService} from '../../../../service/revert-to/shared.service';
import {RequestEndGiveDateTimeComponent} from './component/request-end-give-date-time/request-end-give-date-time.component';
import {RequestReviewDateTimeComponent} from './component/request-review-date-time/request-review-date-time.component';
import {ConditionalHoldingDateTimeComponent} from './component/conditional-holding-date-time/conditional-holding-date-time.component';
import {ResultDateTimeComponent} from './component/result-date-time/result-date-time.component';

@Component({
  selector: 'app-revert-to-time-limits',
  templateUrl: './time-limits.component.html',
  styleUrls: ['./time-limits.component.css']
})
export class TimeLimitsComponent implements OnInit, OnDestroy {
  @Input() formElement: FormGroup;
  @ViewChild(RequestEndGiveDateTimeComponent) requestEndGiveDateTime: RequestEndGiveDateTimeComponent;
  @ViewChild(RequestReviewDateTimeComponent) requestReviewDateTime: RequestReviewDateTimeComponent;
  @ViewChild(ConditionalHoldingDateTimeComponent) conditionalHoldingDateTime: ConditionalHoldingDateTimeComponent;
  @ViewChild(ResultDateTimeComponent) resultDateTime: ResultDateTimeComponent;
  subscription = new Subscription;

  constructor(public ss: SharedService) {
  }

  ngOnInit() {
    this.subscription.add(this.ss.getEmittedDisableRequestEndGiveDateTime().subscribe((item) => {
      if (item) {
        this.requestEndGiveDateTime.disable();
      } else {
        this.requestEndGiveDateTime.enable();
      }
    }));

    this.subscription.add(this.ss.getEmittedDisableRequestReviewDateTime().subscribe((item) => {
      if (item) {
        this.requestReviewDateTime.disable();
      } else {
        this.requestReviewDateTime.enable();
      }
    }));

    this.subscription.add(this.ss.getEmittedDisableConditionalHoldingDateTime().subscribe((item) => {
      if (item) {
        this.conditionalHoldingDateTime.disable();
      } else {
        this.conditionalHoldingDateTime.enable();
      }
    }));

    this.subscription.add(this.ss.getEmittedDisableResultDateTime().subscribe((item) => {
      if (item) {
        this.resultDateTime.disable();
      } else {
        this.resultDateTime.enable();
      }
    }));
  }

  ngOnDestroy() {
    for (const sub in this.subscription) {
      if (this.subscription.hasOwnProperty(sub)) {
        this.subscription[sub].unsubscribe();
      }
    }
  }
}
