import {BaseObject, ObjectFormSelector, ObjectFormMultiSelector, FillDataInterface} from '../../../../service/Object';
import {FormControl} from '@angular/forms';

export class TimeLimits implements FillDataInterface {
  private _requestEndGiveDateTime = new BaseObject();
  private _requestReviewDateTime = new BaseObject();
  private _conditionalHoldingDateTime = new BaseObject();

  fill(data: any): void {
    const fieldsData = data['_fields'];
    // console.log('KOTA TimeLimits fill data', fieldsData);

    for (const key in fieldsData) {
      if (fieldsData.hasOwnProperty(key) === undefined) { continue; }
      if (this[key] instanceof BaseObject === false) { continue; }
      // console.log('KOTA TimeLimits fill data key=', key);
      this[key].fill(fieldsData[key]);
    }
  }

  get requestEndGiveDateTime(): BaseObject {
    return this._requestEndGiveDateTime;
  }

  set requestEndGiveDateTime(value: BaseObject) {
    this._requestEndGiveDateTime = value;
  }

  get requestReviewDateTime(): BaseObject {
    return this._requestReviewDateTime;
  }

  set requestReviewDateTime(value: BaseObject) {
    this._requestReviewDateTime = value;
  }

  get conditionalHoldingDateTime(): BaseObject {
    return this._conditionalHoldingDateTime;
  }

  set conditionalHoldingDateTime(value: BaseObject) {
    this._conditionalHoldingDateTime = value;
  }
}
