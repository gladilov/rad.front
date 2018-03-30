import {Component, OnInit, Input, ViewChild} from '@angular/core';

import {NgxFormControlMultiSelect} from 'ngx-form-controls';

import {GridOptions} from 'ag-grid';
import {
  AGGRID_MODE_EDITABLE,
  AgGridFormcontrolComponent
} from '../../../../../../form-element-render/component/ag-grid-formcontrol/ag-grid-formcontrol.component';
import {ActiveCheckboxComponent} from './component/active-checkbox/active-checkbox.component';
import {SharedService} from '../../../../service/revert-to/shared.service';
import {Subscription} from 'rxjs/Subscription';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {DialogService} from 'ng2-bootstrap-modal';
import {ConfirmComponent} from '../../../confirm/confirm.component';

@Component({
  selector: 'app-revert-to-request-offer',
  templateUrl: './request-offer.component.html',
  styleUrls: ['./request-offer.component.css']
})
export class RequestOfferComponent implements OnInit {

  private context;
  private frameworkComponents;
  private apiBaseUrl = environment.apiBaseUrl;

  public gridOptions: GridOptions;
  @Input() hidden: boolean;
  @Input() form: NgxFormControlMultiSelect;
  @ViewChild(AgGridFormcontrolComponent) grid: AgGridFormcontrolComponent;

  public columnDefs: any[] = [
    {field: 'id', headerName: 'id', hide: true},
    {field: 'requestId', headerName: 'Номер заявки участника', width: 120},
    {field: 'organization', headerName: 'Наименование участника'},
    {field: 'price', headerName: 'Предложенная цена, (руб)'},
    {field: 'offerType', headerName: 'Тип ценового предложения'},
    {field: 'createDateTime', headerName: 'Дата и время подачи предложения'},
    {
      headerName: 'Выбрать',
      field: 'select',
      cellRenderer: 'activeCheckboxRenderer',
      width: 110
    },
    {field: 'active', headerName: 'Действует / Удалено'},
  ];
  public gridMode = AGGRID_MODE_EDITABLE;
  subscription: Subscription;

  constructor(public ss: SharedService,
              private route: ActivatedRoute, private http: HttpClient,
              private dialogService: DialogService) {
    this.gridOptions = <GridOptions>{
      onGridReady: () => {
      },
      context: {
        componentParent: this
      },
      rowSelection: 'multiple',
      rowData: [],
      components: {}
    };
    this.gridOptions.columnDefs = this.columnDefs;
    this.context = {componentParent: this};
    this.frameworkComponents = {
      activeCheckboxRenderer: ActiveCheckboxComponent
    };
  }

  ngOnInit() {
    this.subscription = this.ss.getEmittedUpdate().subscribe((item) => {
      this.columnSize();
    });
  }

  updateGrid() {
    const elementData = <Array<any>>this.form.elementData.value;
    for (const i in elementData) {
      if (elementData.hasOwnProperty(i)) {
        this.grid.addRow(elementData[i]);
      }
    }
  }

  columnSize() {
    this.grid.columnSize();
  }

  methodFromParent(rowIndex) {
    if (this.form.elementData.value[rowIndex]['select'] !== undefined) {
      this.form.elementData.value[rowIndex]['select'] = !this.form.elementData.value[rowIndex]['select'];
    }
    this.form.setValue(this.form.elementData.value);
  }

  showConfirm(message: string, subscribe) {
    const disposable = this.dialogService.addDialog(ConfirmComponent, {
      // title: 'Confirm title',
      message: message
    })
      .subscribe(subscribe);
    // We can close dialog calling disposable.unsubscribe();
    // If dialog was not closed manually close it by timeout
    // setTimeout(() => {
    //   disposable.unsubscribe();
    // }, 10000);
  }

  deleteSelected() {
    this.showConfirm('Вы уверены что хотите удалить выбранные ценовые предложения?',
      (isConfirmed) => {
        // We get dialog result
        if (isConfirmed) {
          alert('accepted');
        }
      });

  }

  cancelDeleteSelected() {
    console.log('!!!!!!');

  }


}
