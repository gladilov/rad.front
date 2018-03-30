import {Component, Injectable, Input, Output, EventEmitter} from '@angular/core';

@Injectable()
export class SharedService {

  @Output() hidden: EventEmitter<any> = new EventEmitter();
  @Output() update: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  change(value: boolean) {
    this.hidden.emit(value);
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

}
