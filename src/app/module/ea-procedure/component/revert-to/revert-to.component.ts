import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
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
export class RevertToComponent implements OnInit, OnDestroy {
  public summaryErrorMessage = null;

  @ViewChild(ProcedureRequestsComponent) requestsComponent: ProcedureRequestsComponent;
  @ViewChild(RequestOfferComponent) offersComponent: RequestOfferComponent;

  /**
   * Идентификатор заявки
   * @type {number}
   */
  requestId = 3779; // -1;
  hidden: boolean;
  requestHidden: boolean;

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
  courtName = new NgxFormControlText('', {});
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
    courtName: this.courtName,
    docName: this.docName,
    docDate: this.docDate,
    docNumber: this.docNumber,
  });

  procedureRequests = new FormControlAgGrid([], {});

  procedureOffers = new FormControlAgGrid([], {});

  timeLimits = new FormGroup({
    oldRequestEndGiveDateTime: new NgxFormControlText('', {}),
    requestEndGiveDateTime: new NgxFormControlText('', {}),
    oldRequestReviewDateTime: new NgxFormControlText('', {}),
    requestReviewDateTime: new NgxFormControlText('', {}),
    oldConditionalHoldingDateTime: new NgxFormControlText('', {}),
    conditionalHoldingDateTime: new NgxFormControlText('', {}),
    oldResultDateTime: new NgxFormControlText('', {}),
    resultDateTime: new NgxFormControlText('', {}),
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

  subscription = new Subscription;

  constructor(public revertToS: RevertToService,
              private route: ActivatedRoute,
              public ss: SharedService) {
    this.hidden = true;
    this.requestHidden = true;
    this.subscription.add(route.params.subscribe((params) => {
      this.requestId = +this.route.snapshot.paramMap.get('id');
      this.loadData();
    }));
  }

  ngOnInit() {
    this.subscription.add(this.ss.getEmittedValue().subscribe((item) => {
      this.hidden = item;
    }));
    this.subscription.add(this.ss.getRequestHiddenValue().subscribe((item) => {
      this.requestHidden = item;
    }));
    this.subscription.add(this.ss.getEmittedTargetStatus().subscribe((item) => {
      if (typeof item === 'string' && item !== 'default' && item !== 'procedure.contract') {
        this.loadDataGrid(item);
      }
    }));
  }

  ngOnDestroy() {
    for (const sub in this.subscription) {
      if (this.subscription.hasOwnProperty(sub)) {
        this.subscription[sub].unsubscribe();
      }
    }
  }

  /**
   * Начальная загрузка данных формы
   */
  loadData() {
    this.revertToS.loadData(this.requestId).subscribe(
      data => {
        if (data['_fields'] !== undefined
          && data['_fields']['data'] !== undefined
        ) {
          const formData = data['_fields']['data'];
          if (formData['_fields']['procedureInfo']['_fields']['requestEndGiveDateTime'] !== undefined) {
            formData['_fields']['timeLimits']['_fields']['oldRequestEndGiveDateTime'] = {};
            Object.assign(formData['_fields']['timeLimits']['_fields']['oldRequestEndGiveDateTime'], formData['_fields']['procedureInfo']['_fields']['requestEndGiveDateTime']);
            // formData['_fields']['timeLimits']['_fields']['oldRequestEndGiveDateTime']._default = formData['_fields']['timeLimits']['_fields']['oldRequestEndGiveDateTime']._default.slice(0, -12);
          }

          if (formData['_fields']['procedureInfo']['_fields']['requestReviewDateTime'] !== undefined) {
            formData['_fields']['timeLimits']['_fields']['oldRequestReviewDateTime'] = {};
            Object.assign(formData['_fields']['timeLimits']['_fields']['oldRequestReviewDateTime'], formData['_fields']['procedureInfo']['_fields']['requestReviewDateTime']);
            // formData['_fields']['timeLimits']['_fields']['oldRequestReviewDateTime']._default = formData['_fields']['timeLimits']['_fields']['oldRequestReviewDateTime']._default.slice(0, -12);
          }

          if (formData['_fields']['procedureInfo']['_fields']['conditionalHoldingDateTime'] !== undefined) {
            formData['_fields']['timeLimits']['_fields']['oldConditionalHoldingDateTime'] = {};
            Object.assign(formData['_fields']['timeLimits']['_fields']['oldConditionalHoldingDateTime'], formData['_fields']['procedureInfo']['_fields']['conditionalHoldingDateTime']);
            // formData['_fields']['timeLimits']['_fields']['oldConditionalHoldingDateTime']._default = formData['_fields']['timeLimits']['_fields']['oldConditionalHoldingDateTime']._default.slice(0, -12);
          }

          if (formData['_fields']['procedureInfo']['_fields']['resultDateTime'] !== undefined) {
            formData['_fields']['timeLimits']['_fields']['oldResultDateTime'] = {};
            Object.assign(formData['_fields']['timeLimits']['_fields']['oldResultDateTime'], formData['_fields']['procedureInfo']['_fields']['resultDateTime']);
            // formData['_fields']['timeLimits']['_fields']['oldConditionalHoldingDateTime']._default = formData['_fields']['timeLimits']['_fields']['oldConditionalHoldingDateTime']._default.slice(0, -12);
          }
        }

        NpxControlDataSetter.setControlsData(this.form, data);
        // this.requestsComponent.updateGrid();
        if (this.offersComponent !== undefined) {
          this.offersComponent.updateGrid();
        }
      },
      err => {
        NpxControlDataSetter.setControlsData(this.form, err);
      }
    );
  }

  loadDataGrid(targetStatus: string) {
    this.revertToS.loadDataGrid(targetStatus, this.requestId).subscribe(
      data => {
        if (data['_fields'] !== undefined
          && data['_fields']['data'] !== undefined
        ) {
          const formData = data['_fields']['data'];
          if (formData['_fields']['procedureInfo'] !== undefined) {
            formData['_fields']['timeLimits'] = formData['_fields']['procedureInfo'];
          }
        }

        // очищение имеющихся в гридах данных
        this.requestsComponent.grid.rowData.splice(0, this.requestsComponent.grid.rowData.length);
        // this.offersComponent.grid.rowData.splice(0, this.offersComponent.grid.rowData.length);

        // сет новых данных
        NpxControlDataSetter.setControlsData(this.form, data);

        // обновление гридов
        if (this.requestsComponent !== undefined) {
          this.requestsComponent.updateGrid();
        }
        // if (this.offersComponent !== undefined) {
        //   this.offersComponent.updateGrid();
        // }
      },
      err => {
        NpxControlDataSetter.setControlsData(this.form, err);
      }
    );
  }

  onSubmit() {
    const id = this.requestId;

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
