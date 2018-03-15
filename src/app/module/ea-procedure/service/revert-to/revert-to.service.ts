import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AbstractControl, FormControl, FormGroup, FormArray, NgForm, Validators } from '@angular/forms';

import { environment } from '../../../../../environments/environment';

import { FillData } from '../../../../service/FillData';
import { FillDataInterface } from '../../../../service/Object';

import { ProcedureInfo } from './procedure-info';
import { ProcedureChangeOptions } from './procedure-change-options';
import { ProcedureRequests } from './procedure-requests';
import { PriceOffers } from './price-offers';
import { TimeLimits } from './time-limits';
import { ExtraConditions } from './extra-conditions';

import { loadData } from './MocRevertTo';

@Injectable()
export class RevertToService implements FillDataInterface {
  private _procedureInfo = new ProcedureInfo();
  private _procedureChangeOptions = new ProcedureChangeOptions();
  private _procedureRequests = new ProcedureRequests();
  private _priceOffer = new PriceOffers();
  private _timeLimits = new TimeLimits();
  private _extraConditions = new ExtraConditions();

  private apiBaseUrl = environment.apiBaseUrl;

  private headers = new HttpHeaders({
    // 'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Загрузка первоначальных данных путем GET запроса
   * @param {AbstractControl} control
   * @param {number} id идентификатор закупки
   */
  loadData(control: AbstractControl, id: number): Observable<any> {
    // TODO http запрос на бэк за данными
    // FIXME MOC-данные
    const data = loadData;

    // const fieldsData = data['_fields']['data']['_fields'];
    // if (fieldsData['procedureInfo'] !== undefined) {
    //   const procedureInfo = fieldsData['procedureInfo']['_fields'];
    //   if (fieldsData['timeLimits'] === undefined) {
    //     fieldsData['timeLimits'] = {};
    //   }
    //   if (fieldsData['timeLimits']['_fields'] === undefined) {
    //     fieldsData['timeLimits']['_fields'] = {};
    //   }
    //   if (procedureInfo['requestEndGiveDateTime'] !== undefined) {
    //     data['_fields']['timeLimits']['_fields']['requestEndGiveDateTime'] = procedureInfo['requestEndGiveDateTime'];
    //   }
    //   if (procedureInfo['requestReviewDateTime'] !== undefined) {
    //     data['_fields']['timeLimits']['_fields']['requestReviewDateTime'] = procedureInfo['requestReviewDateTime'];
    //   }
    //   if (procedureInfo['conditionalHoldingDateTime'] !== undefined) {
    //     data['_fields']['timeLimits']['_fields']['conditionalHoldingDateTime'] = procedureInfo['conditionalHoldingDateTime'];
    //   }
    // }

    // FillData.fill(control, this, data);

    return new Observable<any>(observer => {
          observer.next(data);
          observer.complete();
    });
  }

  /**
   * Сохранение данных путем POST запроса, обработка ответа внедрение изменений в данные при необходимости
   * @param {AbstractControl} control
   * @param {number} id идентификатор закупки
   * @returns {Observable<any>}
   */
  submitData(control: AbstractControl, id: number): Observable<any> {
    // TODO http POST запрос на бэк с данными, обработка результата
    const url = this.apiBaseUrl + '/EA/procedure/do-action/revertTo/' + id;
    const data = control.value;

    return this.http
      .post<any>(url, data, {headers: this.headers})
      .map(respData => {
        console.log('CREATE RESPONSE = ', respData);
        return respData;
      })
      .catch((err, caught) => {
        const error = {
          _fields: err.error
        };
        // this.loginStatus = err.status;
        return new Observable<any>(observer => {
          observer.error(error);
          observer.complete();
        });
      })
      ;

    // FillData.fill(control, this, data);
  }

  fill(data: any): void {
    const fieldsData = data['_fields'];
    if (fieldsData['data'] !== undefined) {
      this.fillData(fieldsData['data']);
    }
    if (fieldsData['sign'] !== undefined) {
      // TODO не реализовано
    }
  }

  fillData(data: any): void {
    const fieldsData = data['_fields'];
    // console.log('KOTA load data data', fieldsData);

    if (fieldsData['procedureInfo'] !== undefined) {
      this.procedureInfo.fill(fieldsData['procedureInfo']);

      const timeLimitsData = {};
      const procedureInfo = fieldsData['procedureInfo']['_fields'];
      timeLimitsData['requestEndGiveDateTime'] = procedureInfo['requestEndGiveDateTime'];
      timeLimitsData['requestReviewDateTime'] = procedureInfo['requestReviewDateTime'];
      timeLimitsData['conditionalHoldingDateTime'] = procedureInfo['conditionalHoldingDateTime'];
      this.timeLimits.fill({_fields: timeLimitsData});
    }
    if (fieldsData['procedureChangeOptions'] !== undefined) {
      this.procedureChangeOptions.fill(fieldsData['procedureChangeOptions']);
    }
    if (fieldsData['procedureRequests'] !== undefined) {
      this.procedureRequests.fill(fieldsData['procedureRequests']);
    }
    if (fieldsData['priceOffer'] !== undefined) {
      this.priceOffer.fill(fieldsData['priceOffer']);
    }
    if (fieldsData['timeLimits'] !== undefined) {
      this.timeLimits.fill(fieldsData['timeLimits']);
    }
    if (fieldsData['extraConditions'] !== undefined) {
      this.extraConditions.fill(fieldsData['extraConditions']);
    }
  }

  // ============================================

  get procedureInfo(): ProcedureInfo {
    return this._procedureInfo;
  }

  set procedureInfo(value: ProcedureInfo) {
    this._procedureInfo = value;
  }

  get procedureChangeOptions(): ProcedureChangeOptions {
    return this._procedureChangeOptions;
  }

  set procedureChangeOptions(value: ProcedureChangeOptions) {
    this._procedureChangeOptions = value;
  }

  get procedureRequests(): ProcedureRequests {
    return this._procedureRequests;
  }

  set procedureRequests(value: ProcedureRequests) {
    this._procedureRequests = value;
  }

  get priceOffer(): PriceOffers {
    return this._priceOffer;
  }

  set priceOffer(value: PriceOffers) {
    this._priceOffer = value;
  }


  get timeLimits(): TimeLimits {
    return this._timeLimits;
  }

  set timeLimits(value: TimeLimits) {
    this._timeLimits = value;
  }

  get extraConditions(): ExtraConditions {
    return this._extraConditions;
  }

  set extraConditions(value: ExtraConditions) {
    this._extraConditions = value;
  }
}
