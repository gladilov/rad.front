import {BaseObject, ObjectFormSelector, ObjectFormMultiSelector, FillDataInterface} from '../../../../service/Object';

export class ExtraConditions implements FillDataInterface {
  private _publishEvent = new BaseObject();
  private _notifyMembers = new BaseObject();

  fill(data: any): void {
    const fieldsData = data['_fields'];
    for (const key in fieldsData) {
      if (fieldsData.hasOwnProperty(key) === undefined) { continue; }
      if (this[key] instanceof BaseObject === false) { continue; }
      this[key].fill(fieldsData[key]);
    }
  }

  get publishEvent() {
    return this._publishEvent;
  }

  set publishEvent(value) {
    this._publishEvent = value;
  }

  get notifyMembers() {
    return this._notifyMembers;
  }

  set notifyMembers(value) {
    this._notifyMembers = value;
  }
}
