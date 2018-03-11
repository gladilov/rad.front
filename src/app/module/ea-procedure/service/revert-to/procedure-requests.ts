import { Injectable } from '@angular/core';
import { ProcedureRequest } from './procedure-request';

@Injectable()
export class ProcedureRequests {
  private _data: ProcedureRequest[];

  get data(): ProcedureRequest[] {
    return this._data;
  }

  set data(value: ProcedureRequest[]) {
    this._data = value;
  }
}
