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
  @Input() themeClass = 'ag-theme-bootstrap';

  // @Output() onChange: EventEmitter<any> = new EventEmitter();

  // The internal data model
  private innerValue: any = '';
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
      columnDefs: [],
      rowData: [],
      domLayout: 'autoHeight',
    };
  }

  ngOnInit() {
    this.gridOptions.columnDefs = this.columnDefs;
    this.gridOptions.rowData = this.rowData;

    if (this.mode === AGGRID_MODE_EDITABLE) {
      this.gridOptions.onSelectionChanged = this.onSelectionChanged;
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

  onSelectionChanged = (params: any): void => {
      let selectedRows: any[] = this.gridOptions.api.getSelectedRows();
      if (selectedRows.length === 0) {
          // necessary for Validators.required to work
          this.value = [];
      } else {
          this.value = selectedRows;
      }

      this.onChangeCallback(this.value);
      this.onTouchedCallback();
      // this.onChange.emit({originalEvent: event, value: this.value});
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.gridOptions.api.sizeColumnsToFit();
  }

}
