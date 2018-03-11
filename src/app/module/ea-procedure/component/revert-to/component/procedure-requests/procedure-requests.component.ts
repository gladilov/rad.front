import { Component, OnInit, Input } from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import { GridOptions } from 'ag-grid';

@Component({
  selector: 'app-revert-to-procedure-requests',
  templateUrl: './procedure-requests.component.html',
  styleUrls: ['./procedure-requests.component.css']
})
export class ProcedureRequestsComponent implements OnInit {
  public gridOptions: GridOptions;
  @Input() form: FormArray;
  @Input() elementData;

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
      domLayout: 'autoHeight',
    };
    this.gridOptions.columnDefs = [
      {
        headerName: 'Номер',
        field: 'requestNumber',
      },
      {
        headerName: 'Дата и время регистрации заявки',
        field: 'sendDateTime',
      },
      {
        headerName: 'Наименование участника',
        field: 'customerName',
      },
      {
        headerName: 'Текущий статус',
        field: 'requestStatusOld',
      },
      {
        headerName: 'Заблокированные средства (руб)',
        field: 'blockedFinance',
        // cellRendererFramework: RemoveRowActionComponent
      },
      {
        headerName: 'Свободные средства (руб)',
        // hide: true,
        field: 'freeFinance'
      },
      {
        headerName: 'Новый статус',
        // hide: true,
        field: 'requestStatus',
      }
    ];
  }

  ngOnInit() {
  }

}
