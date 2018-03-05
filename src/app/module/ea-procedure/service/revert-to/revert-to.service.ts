import { Injectable } from '@angular/core';

import { Info } from './info';
import { ProcedureChangeOptions } from './procedure-change-options';
import { ProcedureRequests } from './procedure-requests';
import { PriceOffers } from './price-offers';
import { Terms } from './terms';
import { ExtraConditions } from './extra-conditions';

@Injectable()
export class RevertToService {
  private _info = new Info();
  private _procedureChangeOptions = new ProcedureChangeOptions();
  private _procedureRequests = new ProcedureRequests();
  private _priceOffer = new PriceOffers;
  private _terms = new Terms();
  private _extraConditions = new ExtraConditions();

  constructor() { }

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
