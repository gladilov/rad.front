import {NpxBaseObject} from 'ngx-form-controls';

export class DatetimeObject extends NpxBaseObject {

  constructor(data: object = {}) {
    super(data);
    this.value = [];
  }

  setData(data?: any): void {
    this.value = '';
    console.log('Попытка установки значения в дату время');
  }
}
