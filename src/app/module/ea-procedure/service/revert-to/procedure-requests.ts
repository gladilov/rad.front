import { Injectable } from '@angular/core';
import { ProcedureRequest } from './procedure-request';
import {FillDataInterface} from '../../../../service/Object';

@Injectable()
export class ProcedureRequests implements FillDataInterface {
  private _data: ProcedureRequest[];

  fill(data: any): void {
  }

  // ==========================================
  get data(): ProcedureRequest[] {
    return this._data;
  }

  set data(value: ProcedureRequest[]) {
    this._data = value;
  }
}
