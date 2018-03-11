import {FormArray, FormGroup, FormControl, AbstractControl} from '@angular/forms';

export interface FillDataInterface {
  fill(data: any): void;
}

class ValuePair {
  public constructor(
    public key: string,
    public value: any
  ) {}
}

class ValuePairMultiSelect {
  public constructor(
    public key: string,
    public value: any,
    private _default: boolean
  ) {}


  get default(): boolean {
    return this._default;
  }

  set default(value: boolean) {
    this._default = value;
  }
}

// export class ValuePairExt extends ValuePair {
//   unit: any;
// }

export class BaseObject implements FillDataInterface {
  buildingType: string;
  private _mode: string;
  private _key: string;
  private _value: string;
  private _default: any;

  public constructor(data: object = {}) {
    this.fill(data);
  }

  public fill(data: object = {}): void {
    this.key = data['_key'] || '';
    this.value = data['_value'] || '';
    this.default = data['_default'] || null;
    this._mode = data['_mode'] || null;
  }

  get key(): string {
    return this._key;
  }

  set key(value: string) {
    this._key = value;
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }

  get default(): any {
    return this._default;
  }

  set default(value: any) {
    this._default = value;
  }

  get mode(): string {
    return this._mode;
  }

  set mode(value: string) {
    this._mode = value;
  }
}

/**
 * для описания селекторов (селект, радио)
 */
export class ObjectFormSelector extends BaseObject {
  private _options = Array<ValuePair>();

  public constructor(data: object = {}) {
    super(data);
    this.initOptions(data);
  }

  protected initOptions(data) {
    if (data['_options'] instanceof Array) {
      for (let i=0; i < data['_options'].length; ++i) {
        let vp = new ValuePair(
          data['_options'][i]['value'],
          data['_options'][i]['label']
        );
        this.options.push(vp);
      }
    }
  }

  get options(): ValuePair[] {
    return this._options;
  }

  set options(value: ValuePair[]) {
    this._options = value;
  }
}

export class ObjectFormMultiSelector extends BaseObject {
  private _options = Array<ValuePairMultiSelect>();

  constructor(data: object = {}) {
    super(data);
    this.initOptions(data);
  }

  protected initOptions(data) {
    if (data['_options'] instanceof Array) {
      for (let i = 0; i < data['_options'].length; ++i) {
        let vp = new ValuePairMultiSelect(
          data['_options'][i]['value'],
          data['_options'][i]['label'],
          data['_options'][i]['default'] || false,
        );
        this.options.push(vp);
      }
    }
  }

  get options(): ValuePairMultiSelect[] {
    return this._options;
  }

  set options(value: ValuePairMultiSelect[]) {
    this._options = value;
  }
}

/**
 * Marks all controls in a form group as touched
 * @param formGroup - The group to caress..hah
 */
export function markFormGroupTouched(formGroup: FormGroup|FormArray) {
  if (formGroup instanceof FormArray) {
    for (let i = 0; i < formGroup.length; ++i) {
      const control = <FormArray> formGroup.controls[i];
      control.markAsTouched();
      if ( control.controls) {
        markFormGroupTouched(control);
      }
    }
  }
  if (formGroup instanceof FormGroup) {
    for (const name in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(name) === false) { continue; }
      const control = <FormGroup> formGroup.controls[name];
      control.markAsTouched();
      if ( control.controls) {
        markFormGroupTouched(control);
      }
    }
  }
}

/**
 * обработчик мультиселектов, вешать на (change)
 * по изменению чекбокса устанавливает или убирает значение из hidden элемента мультеселекта
 *
 * @param event
 * @param {FormControl} control
 */
export function changeMulti(event, control: FormControl) {
  const currentData = control.value;
  const position: number = currentData.indexOf(event.target.value);
  if (event.target.checked === false) {
    if (~position) {
      currentData.splice(position, 1);
    }
  } else {
    if (position === -1) {
      currentData.push(event.target.value);
    }
  }
  control.setValue(currentData);
}

