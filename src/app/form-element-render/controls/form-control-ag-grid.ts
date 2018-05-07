import {AsyncValidatorFn, FormArray, FormControl, ValidatorFn} from '@angular/forms';
import {AbstractControlOptions} from '@angular/forms/src/model';

import {NgxFormControlInterface, NpxBaseObject as BaseObject} from 'ngx-form-controls';
import {AgGridObject} from '../objects/ag-grid-object';

export class FormControlAgGrid extends FormControl implements NgxFormControlInterface {
  public static cnt = 1;
  private _elementData = new AgGridObject();
  private myNumber: number;

  constructor(
    formState?: any,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {

    super(formState, validatorOrOpts, asyncValidator);
    FormControlAgGrid.cnt++;
    this.myNumber = FormControlAgGrid.cnt;
  }

  get elementData(): AgGridObject {
    return this._elementData;
  }

  set elementData(value: AgGridObject) {
    this._elementData = value;
  }

}
