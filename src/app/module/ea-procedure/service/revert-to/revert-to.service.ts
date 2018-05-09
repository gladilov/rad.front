import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {AbstractControl, FormControl, FormGroup, FormArray, NgForm, Validators} from '@angular/forms';

import {environment} from '../../../../../environments/environment';

@Injectable()
export class RevertToService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  /**
   * Загрузка первоначальных данных путем GET запроса
   * @param {number} id идентификатор закупки
   */
  loadData(id: number): Observable<any> {
    const url = this.apiBaseUrl + '/EA/procedure/form-change-status/' + id;
    return this.http
      .get<any>(url, {observe: 'response'})
      .map((respData: HttpResponse<any>) => {
        return respData.body;
      })
      .catch((err: HttpErrorResponse, caught) => {
        let error;

        if ((<HttpErrorResponse>err).status >= 400 && err.status < 500) {
          error = err.error;
        } else {
          error = {
            _error: 'Непредвиденная ошибка со стороны сервера'
          };
        }

        return new Observable<any>(observer => {
          observer.error(error);
          observer.complete();
        });
      });
  }

  loadDataGrid(targetStatus: string, id: number): Observable<any> {
    const url = this.apiBaseUrl + '/EA/procedure/request-grid/' + targetStatus + '/' + id;
    return this.http
      .get<any>(url, {observe: 'response'})
      .map((respData: HttpResponse<any>) => {
        return respData.body;
      })
      .catch((err: HttpErrorResponse, caught) => {
        let error;

        if ((<HttpErrorResponse>err).status >= 400 && err.status < 500) {
          error = err.error;
        } else {
          error = {
            _error: 'Непредвиденная ошибка со стороны сервера'
          };
        }

        return new Observable<any>(observer => {
          observer.error(error);
          observer.complete();
        });
      });
  }

  loadProtocolData(id: number, targetStatus: string) {
    const url = this.apiBaseUrl + '/EA/procedure/get-protocol-list/' + targetStatus + '/' + id;
    return this.http
      .get<any>(url, {observe: 'response'})
      .map((respData: HttpResponse<any>) => {
        return respData.body;
      })
      .catch((err: HttpErrorResponse, caught) => {
        let error;

        if ((<HttpErrorResponse>err).status >= 400 && err.status < 500) {
          error = err.error;
        } else {
          error = {
            _error: 'Непредвиденная ошибка со стороны сервера'
          };
        }

        return new Observable<any>(observer => {
          observer.error(error);
          observer.complete();
        });
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
      .post<any>(url, data, {observe: 'response'})
      .map((respData: HttpResponse<any>) => {
        return respData.body;
      })
      .catch((err: HttpErrorResponse, caught) => {
        let error;

        if ((<HttpErrorResponse>err).status >= 400 && err.status < 500) {
          error = err.error;
        } else {
          error = {
            _error: 'Непредвиденная ошибка со стороны сервера'
          };
        }

        return new Observable<any>(observer => {
          observer.error(error);
          observer.complete();
        });
      });
  }
}
