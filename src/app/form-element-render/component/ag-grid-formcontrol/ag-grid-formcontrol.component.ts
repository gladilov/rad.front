import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor, ValidatorFn, AsyncValidatorFn, Validators } from '@angular/forms';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid';

const noop = () => { };
export const AGGRID_MODE_READONLY = 'readonly';
export const AGGRID_MODE_EDITABLE = 'editable';

export const AGGRID_FORMCONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AgGridFormcontrolComponent),
  multi: true,
};

@Component({
  selector: 'app-ag-grid-formcontrol',
  templateUrl: './ag-grid-formcontrol.component.html',
  styleUrls: ['./ag-grid-formcontrol.component.css'],
  providers: [AGGRID_FORMCONTROL_VALUE_ACCESSOR]
})
export class AgGridFormcontrolComponent implements ControlValueAccessor, OnInit {
  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  public gridOptions: GridOptions;

  @Input() formElement = new FormControl('', {});
  @Input() rowData: any[];
  @Input() columnDefs: any[];
  // Optional:
  @Input() mode = AGGRID_MODE_READONLY; // 'readonly' or 'editable'
  @Input() themeClass = 'ag-theme-balham';

  // @Output() onChange: EventEmitter<any> = new EventEmitter();

  // The internal data model
  private innerValue: any = '';
  private innerChangedValues: any = [];
  // Placeholders for the callbacks which are later providesd
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor() {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this
      },
      rowSelection: 'multiple',
      // rowMultiSelectWithClick: true,
      headerHeight: 48,
      columnDefs: [],
      rowData: [],
      domLayout: 'autoHeight',
    };
  }

  ngOnInit() {
    this.gridOptions.columnDefs = this.columnDefs;
    this.gridOptions.rowData = this.rowData;

    if (this.mode === AGGRID_MODE_EDITABLE) {
      // this.gridOptions.onSelectionChanged = this.onSelectionChanged;
      this.gridOptions.onCellEditingStopped = this.onCellEditingStopped;
    }
  }

  // get accessor
  get value(): any {
      return this.innerValue;
  }

  // set accessor including call the onchange callback
  set value(v: any) {
      if (v !== this.innerValue) {
          this.innerValue = v;
          this.onChangeCallback(v);
      }
  }

  // get accessor
  get changedValues(): any {
      return this.innerChangedValues;
  }

  // set accessor including call the onchange callback
  set changedValues(values: any) {
      this.innerChangedValues = values;
      this.onChangeCallback(values);
  }

  // push value to changedValues
  private pushToChangedValues(value: any) {
      const changedValuesRows = this.changedValues;
      changedValuesRows.forEach(function(row, i) {
          // remove if exist
          if (value.rowIndex === row.rowIndex) {
            const removed = changedValuesRows.splice(i, 1);
          }
      });

      changedValuesRows.push(value);
      this.changedValues = changedValuesRows;
  }

  writeValue(value: any): void {
      this.value = value;
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
      this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
      this.onTouchedCallback = fn;
  }

  private onSelectionChanged = (params: any): void => {
    const selectedRows: any[] = this.gridApi.getSelectedRows();
    // console.log(selectedRows);
    if (selectedRows.length === 0) {
        // necessary for Validators.required to work
        this.value = [];
    } else {
        this.value = selectedRows;
    }

    this.onChangeCallback(this.value);
    this.onTouchedCallback();
  }

  private onCellEditingStopped = (event: any): void => {
    const rowEditingData = event.data;

    if (rowEditingData) {
      rowEditingData.rowIndex = event.rowIndex;
      this.pushToChangedValues(rowEditingData);
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.gridOptions.api.sizeColumnsToFit();
  }

  /**
   * Добавление записей в grid
   * @param rowData
   * @returns {RowNodeTransaction}
   */
  addRow(rowData) {
    return this.gridOptions.api.updateRowData({add: [rowData]});
  }
}
