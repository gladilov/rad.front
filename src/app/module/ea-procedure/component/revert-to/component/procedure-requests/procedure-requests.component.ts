import { Component, OnInit, Input } from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import { GridOptions } from 'ag-grid';
import { AGGRID_MODE_EDITABLE } from '../../../../../../form-element-render/component/ag-grid-formcontrol/ag-grid-formcontrol.component';

@Component({
  selector: 'app-revert-to-procedure-requests',
  templateUrl: './procedure-requests.component.html',
  styleUrls: ['./procedure-requests.component.css']
})
export class ProcedureRequestsComponent implements OnInit {
  public gridOptions: GridOptions;
  // @Input() form: FormArray;
  @Input() form: FormGroup;
  @Input() elementData;

  // TEST: AG-GRID FormControl
  public rowData: any[] = [
      {
        requestNumber: 1,
        sendDateTime: '01.10.2017/13:03:00 (MSK+00:00)',
        customerName: 'Компания 1',
        requestStatusOld: 'Подана',
        blockedFinance: '3000.00',
        freeFinance: '1000.00',
        requestStatus: 'Подана'
      },
      {
        requestNumber: 2,
        sendDateTime: '02.10.2017/09:05:00 (MSK+03:00)',
        customerName: 'Компания 2',
        requestStatusOld: 'Подана',
        blockedFinance: '4000.00',
        freeFinance: '2000.00',
        requestStatus: 'Подана'
      },
      {
        requestNumber: 3,
        sendDateTime: '03.10.2017/17:27:00 (MSK+01:00)',
        customerName: 'Компания 3',
        requestStatusOld: 'Подана',
        blockedFinance: '5000.00',
        freeFinance: '3000.00',
        requestStatus: 'Подана'
      },
  ];
  public columnDefs: any[] = [
      { field: 'requestNumber',     headerName: 'Номер', width: 120, /*checkboxSelection: true,*/ /*headerCheckboxSelection: true*/ },
      { field: 'sendDateTime',      headerName: 'Дата и время регистрации заявки' },
      { field: 'customerName',      headerName: 'Наименование участника' },
      { field: 'requestStatusOld',  headerName: 'Текущий статус', },
      { field: 'blockedFinance',    headerName: 'Заблокированные средства (руб)', },
      { field: 'freeFinance',       headerName: 'Свободные средства (руб)', },
      {
        field: 'requestStatus',
        headerName: 'Новый статус',
        width: 170,
        cellClass: 'ag-cell-custom-select',
        editable: true,
        cellEditor: 'agSelectCellEditor',
        // cellEditor: 'agPopupSelectCellEditor',
        cellEditorParams: {
          cellRenderer: 'requestStatusCellRenderer',
          values: [
              'Подана',
              'Заблокирована',
          ],
        },
      }
  ];
  public gridMode = AGGRID_MODE_EDITABLE;

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

}
