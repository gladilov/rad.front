import {BaseObject, ObjectFormSelector, FillDataInterface} from '../../../../service/Object';

export class ProcedureInfo implements FillDataInterface {
  private _registrationNumber = new BaseObject();
  private _name = new BaseObject();
  private _status = new ObjectFormSelector(); // FIXME заменить на селекто
  private _requestEndGiveDateTime = new BaseObject();
  private _requestReviewDateTime = new BaseObject();
  private _conditionalHoldingDateTime = new BaseObject();

  /**
   * TODO добавить элементы
   * Дата и время окончания срока подачи заявок
   * Дата окончания срока рассмотрения заявок
   * Дата и время проведения электронного аукциона
   */

  fill(data: any): void {
    const fieldsData = data['_fields'];
    for (const key in fieldsData) {
      if (fieldsData.hasOwnProperty(key) === undefined) { continue; }
      if (this[key] instanceof BaseObject === false) { continue; }
      this[key].fill(fieldsData[key]);
    }
  }

  get registrationNumber(): BaseObject {
    return this._registrationNumber;
  }

  set registrationNumber(value: BaseObject) {
    this._registrationNumber = value;
  }

  get name(): BaseObject {
    return this._name;
  }

  set name(value: BaseObject) {
    this._name = value;
  }

  get status(): ObjectFormSelector {
    return this._status;
  }

  set status(value: ObjectFormSelector) {
    this._status = value;
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
