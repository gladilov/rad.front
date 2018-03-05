import {BaseObject, ObjectFormSelector, ObjectFormMultiSelector} from '../../../../service/Object';

export class ProcedureChangeOptions {
  private _targetStatus = new ObjectFormSelector({
    // TODO забирать с сервера, т.к заранее неизвестны идентификаторы статусов в БД. или прегенерить на стороне бэка
    _options: [
      { value: '',  label: 'Выберите' },
      { value: '1', label: 'Прием заявок' },
      { value: '2', label: 'Рассмотрение заявок' },
      { value: '3', label: 'Ожидание торгов' },
      { value: '4', label: 'Подведение итогов' },
      { value: '5', label: 'Заключение контракта' },
    ],
    _value: '',
  });
  private _documentReason = new ObjectFormSelector();
  private _instructionData = new ObjectFormSelector();
  private _controlNumber = new BaseObject();

  get targetStatus(): ObjectFormSelector {
    return this._targetStatus;
  }

  set targetStatus(value: ObjectFormSelector) {
    this._targetStatus = value;
  }

  get documentReason(): ObjectFormSelector {
    return this._documentReason;
  }

  set documentReason(value: ObjectFormSelector) {
    this._documentReason = value;
  }

  get instructionData(): ObjectFormSelector {
    return this._instructionData;
  }

  set instructionData(value: ObjectFormSelector) {
    this._instructionData = value;
  }

  get controlNumber(): BaseObject {
    return this._controlNumber;
  }

  set controlNumber(value: BaseObject) {
    this._controlNumber = value;
  }
}

