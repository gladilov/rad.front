import { Component, OnInit, Input } from '@angular/core';
// import { ComponentRef, ViewContainerRef, ElementRef, ComponentFactoryResolver, ViewChild, Type } from '@angular/core';
import {FormControl, FormGroup, FormArray, NgForm, Validators, AbstractControl} from '@angular/forms';

import { environment } from '../../../../../environments/environment';

import { RevertToService } from '../../service/revert-to/revert-to.service';
import { FillData } from '../../../../service/FillData';
import {markFormGroupTouched} from '../../../../service/Object';

@Component({
  selector: 'app-revert-to',
  templateUrl: './revert-to.component.html',
  styleUrls: ['./revert-to.component.css'],
  providers: [
    RevertToService,
  ],
})
export class RevertToComponent implements OnInit {
  private DOC_REASON_TYPE_FAS_ORDER = 'reestrPrescription';
  private DOC_REASON_TYPE_COURT_DECISION = 'externalPrescription';
  private INSTRUCTION_TYPE_CONTROL_DATA = 'authorityPrescription';
  public summaryErrorMessage = null;

  /**
   * Идентификатор заявки
   * @type {number}
   */
  private requestId = 3779; // -1;

  procedureInfo = new FormGroup({
    registrationNumber: new FormControl({value: '', disabled: true}, {}),
    name: new FormControl({value: '', disabled: true}, {}),
    status: new FormControl({value: '', disabled: true}, {}),
    requestEndGiveDateTime: new FormControl({value: '', disabled: true}, {}),
    requestReviewDateTime: new FormControl({value: '', disabled: true}, {}),
    conditionalHoldingDateTime: new FormControl({value: '', disabled: true}, {}),
  });

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

  procedureRequests = new FormGroup({
    requests: new FormArray([])
  });

  priceOffer = new FormGroup({
    offers: new FormArray([])
  });

  timeLimits = new FormGroup({
    requestEndGiveDateTime: new FormControl('', {}),
    requestReviewDateTime: new FormControl('', {}),
    conditionalHoldingDateTime: new FormControl('', {}),
  });

  extraConditions = new FormGroup({
    publishEvent: new FormControl(''),
    notifyMembers: new FormControl('')
  });

  documents = new FormGroup({});

  formData = new FormGroup({
    procedureInfo: this.procedureInfo,
    procedureChangeOptions: this.procedureChangeOptions,
    procedureRequests: this.procedureRequests,
    priceOffer: this.priceOffer,
    timeLimits: this.timeLimits,
    extraConditions: this.extraConditions,
    documents: this.documents
  });
  form = new FormGroup({
    data: this.formData,
    sign: new FormControl('', {})
  });


  constructor(public revertToS: RevertToService) {
    // протоколы только для информационных целей
    this.documentReason.valueChanges.subscribe(data => {
      this.toggleByDocumentReason(data);
    });

    this.instructionData.statusChanges.subscribe(status => {
      // console.log('KOTA instructionData.statusChanges = ', status);
      this.toggleByInstructionStatus(status);
    });

    this.documentReason.setValue(this.DOC_REASON_TYPE_FAS_ORDER);

    /** подписанты на различные изменения */
    this.procedureChangeOptions.get('targetStatus').valueChanges.subscribe(value => {
      this.loadRemovableProtocols(value);
    });
  }

  ngOnInit() {
    const id = this.requestId; // FIXME брать из роутинга
    // загрузка данных с сервера
    const res = this.revertToS.loadData(this.formData, id);
    res.subscribe(
      data => {
        console.log('SUCCESS LOAD DATA =', data);
        FillData.fill(this.form, this.revertToS, data);
      },
      err => {
        console.log('ERROR ', err);
        FillData.fill(this.form, this.revertToS, err);
      }
    );
  }

  onSubmit() {
    console.log(this.form.value);  // {first: 'Nancy', last: 'Drew'}
    const id = this.requestId; // FIXME брать из роутинга

    this.clearSummaryErrorMessage();
    if (this.form.invalid === true) {
      console.log('KOTA ошибка встроенной валидации формы');
      return false;
    }

    const res = this.revertToS.submitData(this.form, id);
    res.subscribe(data => {
      console.log('SUCCESS SUBMIT DATA =', data);
      // если сохранение успешно, то нам ничего не нужно делать с данными.
      // FillData.fill(this.form, this.revertToS, data);
    }, err => {
      console.log('ERROR ', err);
      FillData.fill(this.form, this.revertToS, err);
      markFormGroupTouched(this.form);
      const msg = err['_error'] || null;
      this.setSummaryErrorMessage(msg);
    });

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
    const procedureChangeOptions = <FormGroup>this.procedureChangeOptions;
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

  setSummaryErrorMessage(msg?: string) {
    if (msg) {
      this.summaryErrorMessage = msg;
    } else {
      this.summaryErrorMessage = 'Обнаружены ошибки в данных формы, необходимо их исправить';
    }
  }
  clearSummaryErrorMessage() {
    this.summaryErrorMessage = null;
  }

  /**
   * подгружает отменяемые протоколы по заданному новому статусу закупки
   * @param {string} targetStatus
   */
  loadRemovableProtocols(targetStatus: string): void {
    const formElement = this.procedureChangeOptions.get('protocols');
    const id = this.requestId; // FIXME брать из роутинга

    // загрузка протоколов с сервера
    const protocolsFC = this.procedureChangeOptions.get('protocols');
    const res = this.revertToS.loadProtocolData(id, targetStatus);
    res.subscribe(
      data => {
        console.log('SUCCESS LOAD DATA =', data);
        FillData.fill(formElement, this.revertToS.procedureChangeOptions.protocols, data);
      },
      err => {
        console.log('ERROR ', err);
        // FIXME что-то нужно сделать в случае ошибки получения списка протоколов
      }
    );
  }
}
