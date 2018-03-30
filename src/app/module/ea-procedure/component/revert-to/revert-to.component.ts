import {Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';

import {NgxFormControlText, NgxFormControlSelect, NgxFormControlMultiSelect, NgxFormControlCheckbox} from 'ngx-form-controls';
import {NpxControlDataSetter} from 'ngx-form-controls';

import {RevertToService} from '../../service/revert-to/revert-to.service';
import {markFormGroupTouched} from '../../../../service/Object';
import {ProcedureRequestsComponent} from './component/procedure-requests/procedure-requests.component';
import {FormControlAgGrid} from '../../../../form-element-render/controls/form-control-ag-grid';
import {RequestOfferComponent} from './component/request-offer/request-offer.component';
import {SharedService} from '../../service/revert-to/shared.service';

@Component({
  selector: 'app-revert-to',
  templateUrl: './revert-to.component.html',
  styleUrls: ['./revert-to.component.css'],
  providers: [
    RevertToService,
    SharedService
  ],
})
export class RevertToComponent implements OnInit {
  public summaryErrorMessage = null;

  @ViewChild(ProcedureRequestsComponent) requestsComponent: ProcedureRequestsComponent;
  @ViewChild(RequestOfferComponent) offersComponent: RequestOfferComponent;

  /**
   * Идентификатор заявки
   * @type {number}
   */
  requestId = 3779; // -1;
  hidden: boolean;

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

  procedureRequests = new FormControlAgGrid([], {});

  procedureOffers = new FormControlAgGrid([], {});

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
    procedureOffers: this.procedureOffers,
    timeLimits: this.timeLimits,
    extraConditions: this.extraConditions,
    documents: this.documents
  });
  form = new FormGroup({
    data: this.formData,
    sign: new NgxFormControlText('', {})
  });

  subscription: Subscription;

  constructor(public revertToS: RevertToService,
              private route: ActivatedRoute,
              public ss: SharedService) {
    this.hidden = true;
    this.subscription = route.params.subscribe((params) => {
      const id = +this.route.snapshot.paramMap.get('id');
      this.loadData(id);
    });
  }

  ngOnInit() {
    this.subscription = this.ss.getEmittedValue().subscribe((item) => {
      this.hidden = item;
    });
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

        NpxControlDataSetter.setControlsData(this.form, data);
        this.requestsComponent.updateGrid();
        if (this.offersComponent !== undefined) {
          this.offersComponent.updateGrid();
        }
      },
      err => {
        NpxControlDataSetter.setControlsData(this.form, err);
      }
    );
  }

  onSubmit() {
    const id = this.requestId; // FIXME брать из роутинга

    this.clearSummaryErrorMessage();
    if (this.form.invalid === true) {
      return false;
    }

    const res = this.revertToS.submitData(this.form, id);
    res.subscribe(data => {
      // если сохранение успешно, то нам ничего не нужно делать с данными.
    }, err => {
      NpxControlDataSetter.setControlsData(this.form, err);
      markFormGroupTouched(this.form);
      const msg = err['_error'] || null;
      this.setSummaryErrorMessage(msg);
    });

    return false;
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
}
