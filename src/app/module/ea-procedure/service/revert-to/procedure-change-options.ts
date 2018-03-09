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
  // public proto = new ObjectFormMultiSelector({
  //   // _mode: 'view',
  //   _options: [
  //     { value: '1', label: 'Протокол рассмотрения заявок' },
  //     { value: '2', label: 'Протокол проведения электронного аукциона' },
  //     { value: '3', label: 'Протокол подведения итогов' },
  //     { value: '4', label: 'Протокол о признании электронного аукциона несостоявшимся' },
  //     { value: '5', label: 'Протокол рассмотрения единственной заявки' },
  //     { value: '6', label: 'Протокол рассмотрения единственной заявки' },
  //     { value: '7', label: 'Протокол рассмотрения заявки единственного участника' },
  //     { value: '8', label: 'Протокол об отказе от заключения контракта' },
  //     { value: '9', label: 'Протокол признания участника уклонившимся от заключения контракта' },
  //   ],
  //   _value: [],
  // });
  // public proto1 = new ObjectFormMultiSelector({
  //   _options: [
  //     { value: '1', label: 'Протокол рассмотрения заявок' },
  //     { value: '2', label: 'Протокол проведения электронного аукциона' },
  //     { value: '3', label: 'Протокол подведения итогов' },
  //     { value: '4', label: 'Протокол о признании электронного аукциона несостоявшимся' },
  //     { value: '5', label: 'Протокол рассмотрения единственной заявки' },
  //     { value: '6', label: 'Протокол рассмотрения единственной заявки' },
  //     { value: '7', label: 'Протокол рассмотрения заявки единственного участника' },
  //     { value: '8', label: 'Протокол об отказе от заключения контракта' },
  //     { value: '9', label: 'Протокол признания участника уклонившимся от заключения контракта' },
  //   ],
  //   _value: [],
  // });
  private _documentReason = new ObjectFormSelector({
    _options: [
      { value: '1', label: 'Предписание контролирующего органа' },
      { value: '2', label: 'Решение судебного органа' },
    ],
    _value: '1',
  });
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

