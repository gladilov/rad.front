export class ProcedureRequest {
  // headerName: 'Номер',
  private _requestNumber: string;
  // headerName: 'Дата и время регистрации заявки',
  private _sendDateTime: string;
  // headerName: 'Наименование участника',
  private _customerName: string;
  // headerName: 'Текущий статус',
  private _requestStatusOld: string;
  // headerName: 'Заблокированные средства (руб)',
  private _blockedFinance: string;
  // headerName: 'Свободные средства (руб)',
  private _freeFinance: string;
  // headerName: 'Новый статус',
  private _requestStatus;

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

  get customerName(): string {
    return this._customerName;
  }

  set customerName(value: string) {
    this._customerName = value;
  }

  get requestStatusOld(): string {
    return this._requestStatusOld;
  }

  set requestStatusOld(value: string) {
    this._requestStatusOld = value;
  }

  get blockedFinance(): string {
    return this._blockedFinance;
  }

  set blockedFinance(value: string) {
    this._blockedFinance = value;
  }

  get freeFinance(): string {
    return this._freeFinance;
  }

  set freeFinance(value: string) {
    this._freeFinance = value;
  }

  get requestStatus() {
    return this._requestStatus;
  }

  set requestStatus(value) {
    this._requestStatus = value;
  }
}
