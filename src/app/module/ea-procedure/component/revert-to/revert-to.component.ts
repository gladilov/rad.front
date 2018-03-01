import { Component, OnInit, Input } from '@angular/core';
import { ComponentRef, ViewContainerRef, ElementRef, ComponentFactoryResolver, ViewChild, Type } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-revert-to',
  templateUrl: './revert-to.component.html',
  styleUrls: ['./revert-to.component.css'],
  providers: [],
})
export class RevertToComponent implements OnInit {
  form = new FormGroup({
    procedureChangeOptions: new FormGroup({
      targetStatus: new FormControl(0, {}),
      documentReason: new FormControl(0, {}),
      instructionData: new FormControl(0, {}),
      controlNumber: new FormControl(0, {}),
    }),
    procedureRequests: new FormGroup({}),
    extraConditions: new FormGroup({}),
  });

  constructor() {
  }

  ngOnInit() {
    this.loadStructure();
  }

  protected loadStructure() {
    // TODO загрузка начальных данных формы (списков  и т.п)
  }

  onSubmit() {
    console.log(this.form.value);  // {first: 'Nancy', last: 'Drew'}

    // let res = this.revertToS.create(this.form.value);
    // res.subscribe(data => {
    //   console.log('SUCCESS AUTH DATA =', data);
    // }, err => {
    //   console.log('ERROR ', err);
    // });

    return false;
  }
}
