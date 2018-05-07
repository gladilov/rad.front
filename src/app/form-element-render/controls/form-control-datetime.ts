import {AsyncValidatorFn, FormControl, ValidatorFn} from '@angular/forms';
import {AbstractControlOptions} from '@angular/forms/src/model';

import {NgxFormControlInterface} from 'ngx-form-controls';
import {DatetimeObject} from '../objects/datetime-object';

export class FormControlDatetime extends FormControl implements NgxFormControlInterface {
  private _elementData = new DatetimeObject();

  constructor(
    formState?: any,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {

    super(formState, validatorOrOpts, asyncValidator);
  }

  get elementData() {
    return this._elementData;
  }

  set elementData(value) {
    this._elementData = value;
  }

}
