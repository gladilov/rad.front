export class ProcedureRequest {
  // headerName: 'Номер',
  private _requestNumber: string;
  // headerName: 'Дата и время регистрации заявки',
  private _sendDateTime: string;
  // headerName: 'Наименование участника',
  private _organization: string;
  // headerName: 'Текущий статус',
  private _status: string;
  // headerName: 'Заблокированные средства (руб)',
  private _blockMoney: string;
  // headerName: 'Свободные средства (руб)',
  private _freeFinance: string;
  // headerName: 'Новый статус',
  private _targetStatus;

  get requestNumber(): string {
    return this._requestNumber;
  }

  set requestNumber(value: string) {
    this._requestNumber = value;
  }

  get sendDateTime(): string {
    return this._sendDateTime;
  }

  set sendDateTime(value: string) {
    this._sendDateTime = value;
  }

  get organization(): string {
    return this._organization;
  }

  set organization(value: string) {
    this._organization = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  get blockMoney(): string {
    return this._blockMoney;
  }

  set blockMoney(value: string) {
    this._blockMoney = value;
  }

  get freeFinance(): string {
    return this._freeFinance;
  }

  set freeFinance(value: string) {
    this._freeFinance = value;
  }

  get targetStatus() {
    return this._targetStatus;
  }

  set targetStatus(value) {
    this._targetStatus = value;
  }
}
