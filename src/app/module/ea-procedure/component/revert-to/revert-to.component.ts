import { Component, OnInit, Input } from '@angular/core';
// import { ComponentRef, ViewContainerRef, ElementRef, ComponentFactoryResolver, ViewChild, Type } from '@angular/core';
import { FormControl, FormGroup, FormArray, NgForm, Validators } from '@angular/forms';

import { environment } from '../../../../../environments/environment';

import { RevertToService } from '../../service/revert-to/revert-to.service';

@Component({
  selector: 'app-revert-to',
  templateUrl: './revert-to.component.html',
  styleUrls: ['./revert-to.component.css'],
  providers: [
    RevertToService,
  ],
})
export class RevertToComponent implements OnInit {
  private DOC_REASON_TYPE_FAS_ORDER = '1';
  private DOC_REASON_TYPE_COURT_DECISION = '2';
  private INSTRUCTION_TYPE_CONTROL_DATA = '1';

  instructionData = new FormControl(0, {});
  controlNumber = new FormControl(0, {});
  documentReason = new FormControl(0, {});

  procedureChangeOptions = new FormGroup({
    targetStatus: new FormControl('', {}),
    protocols: new FormControl({value: [], disabled: true}, {}),
    documentReason: this.documentReason,
    instructionData: this.instructionData,
    controlNumber: this.controlNumber,
  });

  procedureRequests = new FormArray([]);

  priceOffer = new FormGroup({});

  form = new FormGroup({
    procedureChangeOptions: this.procedureChangeOptions,
    procedureRequests: this.procedureRequests,
    priceOffer: this.priceOffer,
    terms: new FormGroup({}),
    extraConditions: new FormGroup({}),
  });

  constructor(public revertToS: RevertToService) {
    // протоколы только для информационных целей
    this.documentReason.valueChanges.subscribe(data => {
      this.toggleByDocumentReason(data);
    });

    // this.instructionData.valueChanges.subscribe(data => {
    //   this.toggleByInstructionData(data);
    // });
    this.instructionData.statusChanges.subscribe(status => {
      // console.log('KOTA instructionData.statusChanges = ', status);
      this.toggleByInstructionStatus(status);
    });

    this.documentReason.setValue(this.DOC_REASON_TYPE_FAS_ORDER);
  }

  ngOnInit() {
    const id = 22; // FIXME брать из роутинга
    // загрузка данных с сервера
    this.revertToS.loadData(this.form, id);
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

  /**
   * прячет элементы в зависимости от причины выполнения действия documentReason
   * @param data
   */
  private toggleByDocumentReason(data) {
    if (data === this.DOC_REASON_TYPE_FAS_ORDER) {
      this.instructionData.enable();
    } else {
      this.instructionData.disable();
    }
  }

  /**
   * выбрана ли причина "предписание ФАС"
   * @returns {boolean}
   */
  documentReasonFAS() {
    const procedureChangeOptions = <FormGroup>this.form.controls['procedureChangeOptions'];
    return (procedureChangeOptions.controls['documentReason'].value === this.DOC_REASON_TYPE_FAS_ORDER);
  }

  /**
   * прячет элементы в зависимости от причины выполнения действия documentReason
   * @param data
   */
  private toggleByInstructionData(data) {
    if (data === this.DOC_REASON_TYPE_FAS_ORDER) {
      // console.log('KOTA InstructionData instructionData = enable');
      this.instructionData.enable();
    } else {
      // console.log('KOTA InstructionData instructionData = disable');
      this.instructionData.disable();
    }
  }

  private toggleByInstructionStatus(status) {
    if (status === 'DISABLED') {
      // console.log('KOTA controlNumber InstructionStatus = disable');
      // console.log('KOTA controlNumber controlNumber = disable');
      this.controlNumber.disable();
    } else {
      // console.log('KOTA controlNumber InstructionStatus != disable');
      if (this.instructionData.value === this.INSTRUCTION_TYPE_CONTROL_DATA) {
        // console.log('KOTA controlNumber controlNumber = enable');
        this.controlNumber.enable();
      } else {
        // console.log('KOTA controlNumber controlNumber = disable2');
        this.controlNumber.disable();
      }
    }
  }
}
