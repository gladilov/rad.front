import {BaseObject, ObjectFormSelector, ObjectFormMultiSelector, FillDataInterface} from '../../../../service/Object';

export class ProcedureChangeOptions implements FillDataInterface {
  private _targetStatus = new ObjectFormSelector({
    _value: '',
  });
  private _authorityType = new ObjectFormSelector({
    _value: '',
  });
  private _protocols = new ObjectFormMultiSelector({
    // _mode: 'view',
    _value: [],
  });
  private _documentReason = new ObjectFormSelector({});
  private _instructionData = new ObjectFormSelector({});
  private _controlNumber = new BaseObject();

  fill(data: any): void {
    const fieldsData = data['_fields'];
    if (fieldsData['targetStatus'] !== undefined) {
      this.targetStatus.fill(fieldsData['targetStatus']);
    }
    if (fieldsData['authorityType'] !== undefined) {
      this.authorityType.fill(fieldsData['authorityType']);
    }
    if (fieldsData['protocols'] !== undefined) {
      this.protocols.fill(fieldsData['protocols']);
    }
    if (fieldsData['documentReason'] !== undefined) {
      this.documentReason.fill(fieldsData['documentReason']);
    }
    if (fieldsData['instructionData'] !== undefined) {
      this.instructionData.fill(fieldsData['instructionData']);
    }
  }

  // =============================================
  get targetStatus(): ObjectFormSelector {
    return this._targetStatus;
  }

  set targetStatus(value: ObjectFormSelector) {
    this._targetStatus = value;
  }

  get authorityType(): ObjectFormSelector {
    return this._authorityType;
  }

  set authorityType(value: ObjectFormSelector) {
    this._authorityType = value;
  }

  get protocols(): ObjectFormMultiSelector {
    return this._protocols;
  }

  set protocols(value: ObjectFormMultiSelector) {
    this._protocols = value;
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

