import {Component, Injectable, Input, Output, EventEmitter} from '@angular/core';

@Injectable()
export class SharedService {

  @Output() hidden: EventEmitter<any> = new EventEmitter();
  @Output() requestHidden: EventEmitter<any> = new EventEmitter();
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Output() updateRequest: EventEmitter<any> = new EventEmitter();
  @Output() targetStatus: EventEmitter<any> = new EventEmitter();

  @Output() disableRequestEndGiveDateTime: EventEmitter<any> = new EventEmitter();
  @Output() disableRequestReviewDateTime: EventEmitter<any> = new EventEmitter();
  @Output() disableConditionalHoldingDateTime: EventEmitter<any> = new EventEmitter();
  @Output() disableResultDateTime: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  change(hiddenOffer: boolean, hiddenRequest: boolean, targetStatus: string) {
    this.hidden.emit(hiddenOffer);
    this.requestHidden.emit(hiddenRequest);
    this.targetStatus.emit(targetStatus);
    if (!hiddenOffer) {
      this.update.emit(true);
    }
    if (!hiddenRequest) {
      this.updateRequest.emit(true);
    }

    switch (targetStatus) {
      case 'procedure.published':
        this.disableRequestEndGiveDateTime.emit(false);
        this.disableRequestReviewDateTime.emit(false);
        this.disableConditionalHoldingDateTime.emit(false);
        this.disableResultDateTime.emit(false);
        break;
      case 'procedure.request.review':
        this.disableRequestEndGiveDateTime.emit(true);
        this.disableRequestReviewDateTime.emit(false);
        this.disableConditionalHoldingDateTime.emit(false);
        this.disableResultDateTime.emit(false);
        break;
      case 'procedure.trades.awaiting':
        this.disableRequestEndGiveDateTime.emit(true);
        this.disableRequestReviewDateTime.emit(true);
        this.disableConditionalHoldingDateTime.emit(false);
        this.disableResultDateTime.emit(false);
        break;
      case 'procedure.result':
        this.disableRequestEndGiveDateTime.emit(true);
        this.disableRequestReviewDateTime.emit(true);
        this.disableConditionalHoldingDateTime.emit(true);
        this.disableResultDateTime.emit(false);
        break;
      case 'procedure.contract':
        this.disableRequestEndGiveDateTime.emit(true);
        this.disableRequestReviewDateTime.emit(true);
        this.disableConditionalHoldingDateTime.emit(true);
        this.disableResultDateTime.emit(true);
        break;
    }
  }

  getEmittedValue() {
    return this.hidden;
  }

  getRequestHiddenValue() {
    return this.requestHidden;
  }

  getEmittedUpdate() {
    return this.update;
  }

  getEmittedUpdateRequest() {
    return this.updateRequest;
  }

  getEmittedTargetStatus() {
    return this.targetStatus;
  }

  getEmittedDisableRequestEndGiveDateTime() {
    return this.disableRequestEndGiveDateTime;
  }

  getEmittedDisableRequestReviewDateTime() {
    return this.disableRequestReviewDateTime;
  }

  getEmittedDisableConditionalHoldingDateTime() {
    return this.disableConditionalHoldingDateTime;
  }

  getEmittedDisableResultDateTime() {
    return this.disableResultDateTime;
  }
}
