import { FillDataInterface } from './Object';
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';

/**
 * пробегает по переданным данным и рекурсивно заполняет объект полученными данными
 * и структуру контрольных элементов.
 *
 * @param {AbstractControl} control
 * @param {} dataObj
 * @param data
 */
export class FillData {
  private static DISABLED_MODE = 'view';

  public static fill(control: AbstractControl, dataObj: FillDataInterface, data) {
    dataObj.fill(data);
    FillData.fillControls(control, data);
  }

  public static fillControls(control: AbstractControl, data: object) {
    if (control instanceof FormGroup) {
      FillData.fillFormGroup(control, data);
    } else if (control instanceof FormArray) {
      FillData.fillFormArray(control, data);
    } else if (control instanceof FormControl) {
      FillData.fillFormControl(control, data);
    }

  }

  public static fillFormGroup(control: FormGroup, data) {
    FillData.setControlMode(control, data);
    if (data['_fields'] !== undefined) {
      const dataFields = data['_fields'];
      for (const key in dataFields) {
        if (dataFields.hasOwnProperty(key) === false) { continue; }

        const fldCtrl = control.get(key);
        if (fldCtrl === null) { continue; }

        FillData.fillControls(fldCtrl, dataFields[key]);
      }
    }
  }

  /**
   * Заполняет данными массив элементов формы FormArray
   * @param {FormArray} control
   * @param data
   */
  public static fillFormArray(control: FormArray, data) {
    FillData.setControlMode(control, data);

    if (data['_items'] !== undefined) {
      let itemCtrl: AbstractControl;
      const dataItems: Array<any> = data['_items'];

      let i = 0;
      for (; i < dataItems.length; ++i) {
        const itemData = dataItems[i];
        if (control.length < i) { // добавляем новые
          itemCtrl = new FormGroup({});
          control.push(itemCtrl);
        } else {
          itemCtrl = control.controls[i];
        }
        FillData.fillControls(itemCtrl, itemData);
      }

      for (; i < control.length;) {
        // есть лишние элементы формы, которые удаляем
        control.removeAt(i);
      }
    }
  }

  /**
   * заполняет данными FormControl объект
   * @param {FormControl} control
   * @param data
   */
  public static fillFormControl(control: FormControl, data): void {
    FillData.setControlMode(control, data);

    if (data['_default'] !== undefined) {
      control.setValue(data['_default']);
    }
    if (data['_value'] !== undefined) {
      control.setValue(data['_value']);
    }
    // TODO можно заполнять еще и валидаторы
  }

  /**
   * выставляе DISABLE|ENABLE элемента, если выставлена mode в данных
   * @param {AbstractControl} control
   * @param data
   */
  public static setControlMode(control: AbstractControl, data) {
    if (data['_mode'] !== undefined) { // NB!!! мода указана явно - меняем disable у элемента
      if (data['_mode'] === this.DISABLED_MODE) {
        control.disable();
      } else {
        control.enable();
      }
    }
  }
}
