import {Component, OnInit, Input, ViewChild, OnDestroy} from '@angular/core';

import {NgxFormControlMultiSelect} from 'ngx-form-controls';

import {GridOptions} from 'ag-grid';
import {
  AGGRID_MODE_EDITABLE,
  AgGridFormcontrolComponent
} from '../../../../../../form-element-render/component/ag-grid-formcontrol/ag-grid-formcontrol.component';
import {Subscription} from 'rxjs/Subscription';
import {SharedService} from '../../../../service/revert-to/shared.service';
import {TargetStatusSelectComponent} from './component/target-status-select/target-status-select.component';

@Component({
  selector: 'app-revert-to-procedure-requests',
  templateUrl: './procedure-requests.component.html',
  styleUrls: ['./procedure-requests.component.css']
})
export class ProcedureRequestsComponent implements OnInit, OnDestroy {
  static statusMappings = {
    '': 'Выберите новый статус заявки',
    'request.published': 'Подана',
    'request.refused': 'Отозвана',
    'request.rejected': 'Отклонена оператором',
    'request.returned': 'Возвращена',
    'request.no.decision': 'Решение не принято', // 91
    'request.review': 'Рассмотрение первых частей', // 51
    'request.electronic.auction.final.review': 'Рассмотрение вторых частей', // 90
    'request.electronic.auction.no.offer': 'Нет ценовых предложений', // 89
    'request.electronic.auction.final.rejected': 'Не соответствует', // 88
    'request.electronic.auction.final.accepted': 'Соответствует', // 87
    'request.electronic.auction.rejected': 'Не допущена', // 86
    'request.electronic.auction.accepted': 'Допущена', // 85
    'request.discharge': 'Отстранена', // 61
  };

  public gridOptions: GridOptions;
  frameworkComponents = {
    'targetStatusSelect': TargetStatusSelectComponent,
  };
  context = {componentParent: this};
  rowHeight = 80;
  rowHeightMainColumn = 'organization';
  private _set = false;
  @Input() form: NgxFormControlMultiSelect;
  @ViewChild(AgGridFormcontrolComponent) grid: AgGridFormcontrolComponent;

  public columnDefs: any[] = [
    {
      field: 'id',
      headerName: 'id',
      hide: true
    },
    {
      field: 'requestNumber',
      headerName: 'Номер',
      width: 70,
      cellStyle: {'white-space': 'normal'}
    },
    {
      field: 'sendDateTime',
      headerName: 'Дата и время регистрации заявки',
      width: 175,
      cellStyle: {'white-space': 'normal'}
    },
    {
      field: 'organization',
      headerName: 'Наименование участника',
      width: 190,
      cellStyle: {'white-space': 'normal'}
    },
    {
      field: 'status',
      headerName: 'Текущий статус',
      width: 145,
      cellEditorParams: {
        values: ProcedureRequestsComponent.extractValues(ProcedureRequestsComponent.statusMappings)
      },
      valueFormatter: function (params) {
        // convert code to value
        return ProcedureRequestsComponent.lookupValue(ProcedureRequestsComponent.statusMappings, params.value);
      },
      valueParser: function (params) {
        // convert value to code
        return ProcedureRequestsComponent.lookupKey(ProcedureRequestsComponent.statusMappings, params.newValue);
      },
      cellStyle: {'white-space': 'normal'}
    },
    {
      field: 'blockMoney',
      headerName: 'Заблокированные средства (руб)',
      width: 165,
      cellStyle: {'white-space': 'normal'}
    },
    {
      field: 'freeFinance',
      headerName: 'Свободные средства (руб)',
      width: 165,
      cellStyle: {'white-space': 'normal'}
    },
    {
      field: 'targetStatus',
      headerName: 'Новый статус',
      width: 250,
      cellRenderer: 'targetStatusSelect',
    }
  ];
  public gridMode = AGGRID_MODE_EDITABLE;
  subscription = new Subscription;

  static lookupValue(mappings, key) {
    return mappings[key];
  }

  static lookupKey(mappings, name) {
    for (const key in mappings) {
      if (mappings.hasOwnProperty(key)) {
        if (name === mappings[key]) {
          return key;
        }
      }
    }
  }

  static extractValues(mappings) {
    return Object.keys(mappings);
  }

  constructor(public ss: SharedService) {
    this.gridOptions = <GridOptions>{
      onGridReady: () => {
        // this.gridOptions.api.sizeColumnsToFit();
      },
      context: {
        componentParent: this
      },
      rowSelection: 'multiple',
      rowData: [],
      // domLayout: 'autoHeight',
      components: {
        // requestStatusCellRenderer: this.requestStatusCellRenderer
      }
    };
    this.gridOptions.columnDefs = this.columnDefs;
  }

  ngOnInit() {
    this.subscription.add(this.ss.getEmittedUpdateRequest().subscribe((item) => {
      this.columnSize();
    }));
  }

  ngOnDestroy() {
    for (const sub in this.subscription) {
      if (this.subscription.hasOwnProperty(sub)) {
        this.subscription[sub].unsubscribe();
      }
    }
  }

  updateGrid() {
    this.grid.updateRowData();
  }

  columnSize() {
    this.grid.columnSize();
  }

  selectStatus(rowIndex, value) {
    this.form.elementData.value[rowIndex]['targetStatus'] = value;
    this.form.setValue(this.form.elementData.value);
  }

  setValueForm() {
    if (!this._set) {
      this.form.setValue(this.form.elementData.value);
      this._set = true;
    }
  }

}
