import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FillData} from '../../../../../../service/FillData';
import {RevertToService} from '../../../../service/revert-to/revert-to.service';

import { NgxFormControlText, NgxFormControlSelect, NgxFormControlMultiSelect, NgxFormControlCheckbox } from 'ngx-form-controls';
import { NpxControlDataSetter } from 'ngx-form-controls';
import {SharedService} from '../../../../service/revert-to/shared.service';

@Component({
  selector: 'app-revert-to-procedure-change-options',
  templateUrl: './procedure-change-options.component.html',
  styleUrls: ['./procedure-change-options.component.css'],
  providers: [
    RevertToService
  ],
})
export class ProcedureChangeOptionsComponent implements OnInit {
  private DOC_REASON_TYPE_FAS_ORDER = 'authorityPrescription';
  private DOC_REASON_TYPE_COURT_DECISION = 'courtDecision';
  private INSTRUCTION_DATA_REESTR_PRESCRIPTION = 'reestrPrescription';
  private INSTRUCTION_DATA_EXTERNAL_PRESCRIPTION = 'externalPrescription';

  @Input()formElement: FormGroup;
  @Input()requestId: number;

  constructor(
    public revertToS: RevertToService,
    public ss: SharedService
  ) {
  }

  ngOnInit() {
    // протоколы только для информационных целей
    this.formElement.controls['documentReason'].valueChanges.subscribe(data => {
      this.toggleByDocumentReason(data);
    });

    this.formElement.controls['instructionData'].statusChanges.subscribe(status => {
      this.toggleByInstructionStatus(status);
    });

    this.formElement.controls['targetStatus'].valueChanges.subscribe(data => {
      this.changeShared(data);
    });

    this.formElement.controls['documentReason'].setValue(this.DOC_REASON_TYPE_FAS_ORDER);

    this.formElement.get('targetStatus').valueChanges.subscribe(value => {
      this.loadRemovableProtocols(value);
    });
  }

  /**
   * выбрана ли причина "Предписание контролирующего органа"
   * @returns {boolean}
   */
  documentReasonFAS() {
    const procedureChangeOptions = <FormGroup>this.formElement;
    return (procedureChangeOptions.controls['documentReason'].value === this.DOC_REASON_TYPE_FAS_ORDER);
  }

  /**
   * прячет элементы в зависимости от причины выполнения действия documentReason
   * @param data
   */
  private toggleByDocumentReason(data) {
    if (data === this.DOC_REASON_TYPE_FAS_ORDER) {
      this.formElement.controls['instructionData'].enable();
    } else {
      this.formElement.controls['instructionData'].disable();
    }
  }

  private toggleByInstructionStatus(status) {
    const formElement = this.formElement;
    if (status === 'DISABLED') {
      formElement.controls['controlNumber'].disable();
      formElement.controls['authorityName'].disable();
      formElement.controls['authorityType'].disable();

      if (formElement.controls['documentReason'].value === this.DOC_REASON_TYPE_FAS_ORDER) {
        formElement.controls['docName'].disable();
        formElement.controls['docDate'].disable();
        formElement.controls['docNumber'].disable();
      } else if (formElement.controls['documentReason'].value === this.DOC_REASON_TYPE_COURT_DECISION) {
        formElement.controls['courtName'].enable();
        formElement.controls['docName'].enable();
        formElement.controls['docDate'].enable();
        formElement.controls['docNumber'].enable();
      }
    } else {
      if (formElement.controls['instructionData'].value === this.INSTRUCTION_DATA_REESTR_PRESCRIPTION) {
        formElement.controls['controlNumber'].enable();
        formElement.controls['authorityName'].disable();
        formElement.controls['authorityType'].disable();
        formElement.controls['docName'].disable();
        formElement.controls['docDate'].disable();
        formElement.controls['docNumber'].disable();
        formElement.controls['courtName'].disable();
      } else if (formElement.controls['instructionData'].value === this.INSTRUCTION_DATA_EXTERNAL_PRESCRIPTION) {
        formElement.controls['controlNumber'].disable();
        formElement.controls['authorityName'].enable();
        formElement.controls['authorityType'].enable();
        formElement.controls['docName'].enable();
        formElement.controls['docDate'].enable();
        formElement.controls['docNumber'].enable();
        formElement.controls['courtName'].disable();
      } else {
        formElement.controls['courtName'].disable();
        formElement.controls['controlNumber'].disable();
        formElement.controls['authorityName'].disable();
        formElement.controls['authorityType'].disable();
        formElement.controls['docName'].disable();
        formElement.controls['docDate'].disable();
        formElement.controls['docNumber'].disable();
      }
    }
  }

  /**
   * подгружает отменяемые протоколы по заданному новому статусу закупки
   * @param {string} targetStatus
   */
  loadRemovableProtocols(targetStatus: string): void {
    const formElement = this.formElement;
    const protocols = formElement.get('protocols');
    const id = this.requestId; // FIXME брать из роутинга

    // загрузка протоколов с сервера
    const res = this.revertToS.loadProtocolData(id, targetStatus);
    res.subscribe(
      data => {
        NpxControlDataSetter.setControlsData(protocols, data);
      },
      err => {
        // FIXME что-то нужно сделать в случае ошибки получения списка протоколов
      }
    );
  }

  changeShared(data) {
    if (data === 'procedure.trades.awaiting' || data === 'procedure.request.review') {
      this.ss.change(false, data);
    } else {
      this.ss.change(true, data);
    }
  }
}
