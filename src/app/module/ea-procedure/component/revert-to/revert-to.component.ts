import {Component, OnInit, Input, ViewChild} from '@angular/core';
// import { ComponentRef, ViewContainerRef, ElementRef, ComponentFactoryResolver, ViewChild, Type } from '@angular/core';
import {FormControl, FormGroup, FormArray, NgForm, Validators, AbstractControl} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';

import { NgxFormControlText, NgxFormControlSelect, NgxFormControlMultiSelect, NgxFormControlCheckbox } from 'ngx-form-controls';
import { NpxControlDataSetter } from 'ngx-form-controls';

import {environment} from '../../../../../environments/environment';

import {RevertToService} from '../../service/revert-to/revert-to.service';
import {FillData} from '../../../../service/FillData';
import {markFormGroupTouched} from '../../../../service/Object';
import {ProcedureRequestsComponent} from './component/procedure-requests/procedure-requests.component';

@Component({
  selector: 'app-revert-to',
  templateUrl: './revert-to.component.html',
  styleUrls: ['./revert-to.component.css'],
  providers: [
    RevertToService,
  ],
})
export class RevertToComponent implements OnInit {
  private DOC_REASON_TYPE_FAS_ORDER = 'authorityPrescription';
  private DOC_REASON_TYPE_COURT_DECISION = 'courtDecision';
  private INSTRUCTION_DATA_REESTR_PRESCRIPTION = 'reestrPrescription';
  private INSTRUCTION_DATA_EXTERNAL_PRESCRIPTION = 'externalPrescription';
  public summaryErrorMessage = null;

  @ViewChild(ProcedureRequestsComponent) requestsComponent: ProcedureRequestsComponent;

  /**
   * Идентификатор заявки
   * @type {number}
   */
  private requestId = 3779; // -1;

  procedureInfo = new FormGroup({
    registrationNumber: new NgxFormControlText({value: '', disabled: true}, {}),
    name: new NgxFormControlText({value: '', disabled: true}, {}),
    status: new NgxFormControlText({value: '', disabled: true}, {}),
    requestEndGiveDateTime: new NgxFormControlText({value: '', disabled: true}, {}),
    requestReviewDateTime: new NgxFormControlText({value: '', disabled: true}, {}),
    conditionalHoldingDateTime: new NgxFormControlText({value: '', disabled: true}, {}),
  });

  instructionData = new NgxFormControlSelect('', {});
  controlNumber = new NgxFormControlText('', {});
  authorityName = new NgxFormControlText('', {});
  authorityType = new NgxFormControlSelect('', {});
  documentReason = new NgxFormControlSelect('', {});
  docName = new NgxFormControlText('', {});
  docDate = new NgxFormControlText('', {});
  docNumber = new NgxFormControlText('', {});

  procedureChangeOptions = new FormGroup({
    targetStatus: new NgxFormControlSelect('', {}),
    protocols: new NgxFormControlMultiSelect({value: [], disabled: true}, {}),
    documentReason: this.documentReason,
    instructionData: this.instructionData,
    controlNumber: this.controlNumber,
    authorityName: this.authorityName,
    authorityType: this.authorityType,
    docName: this.docName,
    docDate: this.docDate,
    docNumber: this.docNumber,
  });

  procedureRequests = new NgxFormControlMultiSelect([], {});

  priceOffer = new FormGroup({
    offers: new FormArray([])
  });

  timeLimits = new FormGroup({
    requestEndGiveDateTime: new NgxFormControlText('', {}),
    requestReviewDateTime: new NgxFormControlText('', {}),
    conditionalHoldingDateTime: new NgxFormControlText('', {}),
  });

  extraConditions = new FormGroup({
    publishEvent: new NgxFormControlCheckbox(''),
    notifyMembers: new NgxFormControlCheckbox('')
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

  subscription: Subscription;

  constructor(public revertToS: RevertToService,
              private route: ActivatedRoute) {
    this.subscription = route.params.subscribe((params) => {
      const id = +this.route.snapshot.paramMap.get('id');
      this.loadData(id);
    });

    // протоколы только для информационных целей
    this.documentReason.valueChanges.subscribe(data => {
      this.toggleByDocumentReason(data);
    });

    this.instructionData.statusChanges.subscribe(status => {
      this.toggleByInstructionStatus(status);
    });

    this.documentReason.setValue(this.DOC_REASON_TYPE_FAS_ORDER);

    /** подписанты на различные изменения */
    this.procedureChangeOptions.get('targetStatus').valueChanges.subscribe(value => {
      this.loadRemovableProtocols(value);
    });
  }

  ngOnInit() {
    // const id = this.requestId; // FIXME брать из роутинга
    // // загрузка данных с сервера
    // const res = this.revertToS.loadData(this.formData, id);
    // res.subscribe(
    //   data => {
    //     console.log('SUCCESS LOAD DATA =', data);
    //     FillData.fill(this.form, this.revertToS, data);
    //   },
    //   err => {
    //     console.log('ERROR ', err);
    //     FillData.fill(this.form, this.revertToS, err);
    //   }
    // );
  }

  /**
   * Начальная загрузка данных формы
   * @param {number | string} id
   */
  loadData(id: number) {
    this.requestId = id;
    const res = this.revertToS.loadData(this.formData, id);
    res.subscribe(
      data => {
        if (data['_fields'] !== undefined
            && data['_fields']['data'] !== undefined
        ) {
          const formData = data['_fields']['data'];
          if (formData['_fields']['procedureInfo'] !== undefined) {
            formData['_fields']['timeLimits'] = formData['_fields']['procedureInfo'];
          }
        }



        // console.log('SUCCESS LOAD DATA =', data);
        FillData.fill(this.form, this.revertToS, data);
        this.requestsComponent.updateGrid();
      },
      err => {
        // console.log('ERROR ', err);
        FillData.fill(this.form, this.revertToS, err);
      }
    );
  }

  onSubmit() {
    console.log(this.form.value);  // {first: 'Nancy', last: 'Drew'}
    const id = this.requestId; // FIXME брать из роутинга

    this.clearSummaryErrorMessage();
    if (this.form.invalid === true) {
      // console.log('KOTA ошибка встроенной валидации формы');
      return false;
    }

    const res = this.revertToS.submitData(this.form, id);
    res.subscribe(data => {
      // console.log('SUCCESS SUBMIT DATA =', data);
      // если сохранение успешно, то нам ничего не нужно делать с данными.
      // FillData.fill(this.form, this.revertToS, data);
    }, err => {
      // console.log('ERROR ', err);
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
   * выбрана ли причина "Предписание контролирующего органа"
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
    console.log(data);
    if (data === this.DOC_REASON_TYPE_FAS_ORDER) {
      this.instructionData.enable();
    } else {
      this.instructionData.disable();
    }
  }

  private toggleByInstructionStatus(status) {
    if (status === 'DISABLED') {
      this.controlNumber.disable();
      this.authorityName.disable();
      this.authorityType.disable();

      if (this.documentReason.value === this.DOC_REASON_TYPE_FAS_ORDER) {
        this.docName.disable();
        this.docDate.disable();
        this.docNumber.disable();
      } else if (this.documentReason.value === this.DOC_REASON_TYPE_COURT_DECISION) {
        this.docName.enable();
        this.docDate.enable();
        this.docNumber.enable();
      }
    } else {
      if (this.instructionData.value === this.INSTRUCTION_DATA_REESTR_PRESCRIPTION) {
        this.controlNumber.enable();
        this.authorityName.disable();
        this.authorityType.disable();
        this.docName.disable();
        this.docDate.disable();
        this.docNumber.disable();
      } else if (this.instructionData.value === this.INSTRUCTION_DATA_EXTERNAL_PRESCRIPTION) {
        this.controlNumber.disable();
        this.authorityName.enable();
        this.authorityType.enable();
        this.docName.enable();
        this.docDate.enable();
        this.docNumber.enable();
      } else {
        this.controlNumber.disable();
        this.authorityName.disable();
        this.authorityType.disable();
        this.docName.disable();
        this.docDate.disable();
        this.docNumber.disable();
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
        // console.log('SUCCESS LOAD DATA =', data);
        FillData.fill(formElement, this.revertToS.procedureChangeOptions.protocols, data);
      },
      err => {
        // console.log('ERROR ', err);
        // FIXME что-то нужно сделать в случае ошибки получения списка протоколов
      }
    );
  }
}
