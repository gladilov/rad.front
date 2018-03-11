import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormArray, NgForm, Validators } from '@angular/forms';

import { FillData } from '../../../../service/FillData';
import { FillDataInterface } from '../../../../service/Object';

import { Info } from './info';
import { ProcedureChangeOptions } from './procedure-change-options';
import { ProcedureRequests } from './procedure-requests';
import { PriceOffers } from './price-offers';
import { Terms } from './terms';
import { ExtraConditions } from './extra-conditions';

import { loadData } from './MocRevertTo';

@Injectable()
export class RevertToService implements FillDataInterface {
  private _info = new Info();
  private _procedureChangeOptions = new ProcedureChangeOptions();
  private _procedureRequests = new ProcedureRequests();
  private _priceOffer = new PriceOffers;
  private _terms = new Terms();
  private _extraConditions = new ExtraConditions();

  constructor() { }

  /**
   * Загрузка первоначальных данных путем GET запроса
   * @param {AbstractControl} control
   * @param {number} id идентификатор закупки
   */
  loadData(control: AbstractControl, id: number) {
    // TODO http запрос на бэк за данными
    // FIXME MOC-данные
    const data = loadData;

    FillData.fill(control, this, data);
  }

  /**
   * Сохранение данных путем POST запроса, обработка ответа внедрение изменений в данные при необходимости
   * @param {AbstractControl} control
   * @param {number} id
   */
  submitData(control: AbstractControl, id: number) {
    // TODO http POST запрос на бэк с данными, обработка результата
    const data = {};
    FillData.fill(control, this, data);
  }

  fill(data: any): void {
    // TODO не реализовано
  }

  // ============================================

  get info(): Info {
    return this._info;
  }

  set info(value: Info) {
    this._info = value;
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

  get terms(): Terms {
    return this._terms;
  }

  set terms(value: Terms) {
    this._terms = value;
  }

  get extraConditions(): ExtraConditions {
    return this._extraConditions;
  }

  set extraConditions(value: ExtraConditions) {
    this._extraConditions = value;
  }
}
