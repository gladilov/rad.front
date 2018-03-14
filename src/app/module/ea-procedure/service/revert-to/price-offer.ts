import {BaseObject, ObjectFormSelector, FillDataInterface} from '../../../../service/Object';

export class PriceOffer {
  /**
   *  'Идентификатор предложения'
   * @type {BaseObject}
   * @private
   */
  private _id = new BaseObject();
  /**
   * 'Номер заявки участника'
   * @type {BaseObject}
   * @private
   */
  private _requestId = new BaseObject();
  /**
   *  'Наименование участника'
   * @type {BaseObject}
   * @private
   */
  private _organization = new BaseObject();
  /**
   * 'Предложенная цена (руб)',
   * @type {BaseObject}
   * @private
   */
  private _price = new BaseObject();
  /**
   *  'Тип ценового предложения',
   * @type {BaseObject}
   * @private
   */
  private _offerType = new BaseObject();
  /**
   * 'Дата и время подачи предложения',
   * @type {BaseObject}
   * @private
   */
  private _createDateTime = new BaseObject();
  /**
   * действует - удалено
   * @type {BaseObject}
   * @private
   */
  private _active = new BaseObject();


  get id(): BaseObject {
    return this._id;
  }

  set id(value: BaseObject) {
    this._id = value;
  }

  get requestId(): BaseObject {
    return this._requestId;
  }

  set requestId(value: BaseObject) {
    this._requestId = value;
  }

  get organization(): BaseObject {
    return this._organization;
  }

  set organization(value: BaseObject) {
    this._organization = value;
  }

  get price(): BaseObject {
    return this._price;
  }

  set price(value: BaseObject) {
    this._price = value;
  }

  get offerType(): BaseObject {
    return this._offerType;
  }

  set offerType(value: BaseObject) {
    this._offerType = value;
  }

  get createDateTime(): BaseObject {
    return this._createDateTime;
  }

  set createDateTime(value: BaseObject) {
    this._createDateTime = value;
  }

  get active(): BaseObject {
    return this._active;
  }

  set active(value: BaseObject) {
    this._active = value;
  }
}
