import {FormControl} from '@angular/forms';
import { BaseObject, ObjectFormSelector } from '../../service/Object';
import {AsyncValidatorFn, ValidatorFn} from '@angular/forms/src/directives/validators';
import {AbstractControlOptions} from '@angular/forms/src/model';

export class FormControlSelect extends FormControl {
  elementData = new ObjectFormSelector();

  constructor(
    formState?: any,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {

    super(formState, validatorOrOpts, asyncValidator);
  }
}
