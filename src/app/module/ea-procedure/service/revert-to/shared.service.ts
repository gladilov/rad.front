import {Component, Injectable, Input, Output, EventEmitter} from '@angular/core';

@Injectable()
export class SharedService {

  @Output() hidden: EventEmitter<any> = new EventEmitter();
  @Output() update: EventEmitter<any> = new EventEmitter();
  // @Output() targetStatus: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  change(value: boolean, targetStatus: string) {
    this.hidden.emit(value);
    // this.targetStatus.emit(targetStatus);
    if (!value) {
      this.update.emit(true);
    }
  }

  getEmittedValue() {
    return this.hidden;
  }

  getEmittedUpdate() {
    return this.update;
  }

  // getEmittedTargetStatus() {
  //   return this.targetStatus;
  // }
  //
}
