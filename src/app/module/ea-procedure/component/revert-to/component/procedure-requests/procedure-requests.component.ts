import {Component, OnInit, Input, OnChanges, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {GridOptions} from 'ag-grid';
import {
  AGGRID_MODE_EDITABLE,
  AgGridFormcontrolComponent
} from '../../../../../../form-element-render/component/ag-grid-formcontrol/ag-grid-formcontrol.component';

@Component({
  selector: 'app-revert-to-procedure-requests',
  templateUrl: './procedure-requests.component.html',
  styleUrls: ['./procedure-requests.component.css']
})
export class ProcedureRequestsComponent implements OnInit {
  static statusMappings = {
    'request.published': 'Подана',
    'request.refused': 'Отозвана',
    'request.rejected': 'Отклонена оператором',
    'request.returned': 'Возвращена',
  };

  public gridOptions: GridOptions;
  // @Input() form: FormArray;
  @Input() form: FormControl;
  @Input() elementData;
  @ViewChild(AgGridFormcontrolComponent) grid: AgGridFormcontrolComponent;

  public columnDefs: any[] = [
    {field: 'id', headerName: 'id', hide: true,},
    {field: 'requestNumber', headerName: 'Номер', width: 120, /*checkboxSelection: true,*/ /*headerCheckboxSelection: true*/},
    {field: 'sendDateTime', headerName: 'Дата и время регистрации заявки'},
    {field: 'organization', headerName: 'Наименование участника'},
    {field: 'status', headerName: 'Текущий статус',},
    {field: 'blockMoney', headerName: 'Заблокированные средства (руб)',},
    {field: 'freeFinance', headerName: 'Свободные средства (руб)',},
    {
      field: 'targetStatus',
      headerName: 'Новый статус',
      width: 170,
      cellClass: 'ag-cell-custom-select',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      // cellEditor: 'agPopupSelectCellEditor',
      // cellEditorParams: {
      //   cellRenderer: 'requestStatusCellRenderer',
      //   values: [
      //       'Подана',
      //       'Заблокирована',
      //   ],
      // },
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
      }
    }
  ];
  public gridMode = AGGRID_MODE_EDITABLE;

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

  constructor() {
    this.gridOptions = <GridOptions>{
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
      },
      context: {
        componentParent: this
      },
      rowSelection: 'multiple',
      rowData: [],
      // domLayout: 'autoHeight',
      components: {
        requestStatusCellRenderer: this.requestStatusCellRenderer
      }
    };
    this.gridOptions.columnDefs = this.columnDefs;
  }

  ngOnInit() {
  }

  // simple function cellRenderer, just returns back the name of the requestStatus
  requestStatusCellRenderer(params) {
    return params.value.name;
  }

  updateGrid() {
    for (const i in this.elementData) {
      if (this.elementData.hasOwnProperty(i)) {
        this.grid.addRow(this.elementData[i]);
      }
    }
  }
}
