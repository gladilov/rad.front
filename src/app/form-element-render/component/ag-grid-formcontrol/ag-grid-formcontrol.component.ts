import {FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor, ValidatorFn, AsyncValidatorFn, Validators} from '@angular/forms';
import {ColumnApi, GridApi, GridOptions} from 'ag-grid';
import {FormControlAgGrid} from '../../controls/form-control-ag-grid';
import {HttpClient} from '@angular/common/http';
import {Component, forwardRef, Input, OnInit} from '@angular/core';

const noop = () => {
};
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

  @Input() formElement = new FormControlAgGrid([], {});
  @Input() rowData: any[];
  @Input() columnDefs: any[];
  // Optional:
  @Input() mode = AGGRID_MODE_READONLY; // 'readonly' or 'editable'
  @Input() themeClass = 'ag-theme-fresh';
  @Input() frameworkComponents = {};
  @Input() context = {};
  @Input() floatingFiler = false;
  // фильтрацию и сортировку включать именно серверную, для бесконечного грида
  @Input() enableServerSideSorting = false;
  @Input() enableServerSideFilter = false;
  // сортировка в столбцах
  @Input() sortingOrder = [null];
  @Input() dataUrl = '';

  @Input() rowModelType: string;
  @Input() cacheOverflowSize = 1;
  @Input() maxConcurrentDatasourceRequests = 1;
  @Input() maxBlocksInCache = 1;
  @Input() pagination = true;
  @Input() paginationPageSize = 10;

  @Input() autoSize = true;
  @Input() rowHeight = 50;
  @Input() rowHeightMainColumn;

  // The internal data model
  private innerValue: any = '';
  private innerChangedValues: any = [];
  // Placeholders for the callbacks which are later providesd
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor(
    private http: HttpClient) {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this
      },
      rowSelection: 'multiple',
      // rowMultiSelectWithClick: true,
      headerHeight: 48,
      columnDefs: [],
      rowData: [],
      domLayout: 'autoHeight', // если будет нужна вертикальная полоса прокрутки убрать это свойство
      getRowHeight: (params) => {
        if (this.rowHeightMainColumn === undefined) {
          return this.rowHeight;
        } else {
          return 55 * Math.ceil(params.data[this.rowHeightMainColumn].length / 40);
        }
      },
    };
  }

  ngOnInit() {
    this.gridOptions.columnDefs = this.columnDefs;
    this.gridOptions.rowData = this.rowData;
    this.gridOptions.floatingFilter = this.floatingFiler;
    this.gridOptions.enableServerSideSorting = this.enableServerSideSorting;
    this.gridOptions.enableServerSideFilter = this.enableServerSideFilter;
    this.gridOptions.pagination = this.pagination;
    this.gridOptions.paginationPageSize = this.paginationPageSize;
    this.gridOptions.cacheBlockSize = this.paginationPageSize;
    this.gridOptions.sortingOrder = this.sortingOrder;

    if (this.rowModelType !== undefined) {
      this.gridOptions.rowModelType = this.rowModelType;
    }

    // Настройки для бесконечного грида
    if (this.rowModelType === 'infinite') {
      this.gridOptions.cacheOverflowSize = this.cacheOverflowSize;
      this.gridOptions.maxConcurrentDatasourceRequests = this.maxConcurrentDatasourceRequests;
      this.gridOptions.maxBlocksInCache = this.maxBlocksInCache;
    }

    if (this.mode === AGGRID_MODE_EDITABLE) {
      this.gridOptions.onCellEditingStopped = this.onCellEditingStopped;
    }

    // i18n for grid
    this.gridOptions.localeText = {
      // for filter panel
      page: 'страница',
      more: 'неизвестно',
      to: 'по',
      of: 'из',
      next: 'следующая',
      last: 'последняя',
      first: 'первая',
      previous: 'предыдущая',
      loadingOoo: 'загрузка...',

      // for set filter
      selectAll: 'выбрать все',
      searchOoo: 'поиск',
      blanks: 'blanks',

      // for number filter and text filter
      filterOoo: 'отфильтровать',
      applyFilter: 'применить фильтр',
      clearFilter: 'очистить фильтр',

      // for number filter
      equals: 'соответствует',
      notEqual: 'не соответствует',
      lessThan: 'меньше чем',
      lessThanOrEqual: 'меньше или равно',
      greaterThan: 'больше чем',
      greaterThanOrEqual: 'больше или равно',
      inRange: 'между',

      // for text filter
      contains: 'содержит',
      notContains: 'не содержит',
      startsWith: 'начинается с',
      endsWith: 'заканчивается на',

      // the header of the default group column
      group: 'сгруппировать',

      // tool panel
      columns: 'колонки',
      rowGroupColumns: 'сгруппированные колонки',
      rowGroupColumnsEmptyMessage: 'нет колонок для группировки',
      valueColumns: 'значение колонок',
      pivotMode: 'вид',
      groups: 'группы',
      values: 'значения',
      pivots: 'точки',
      valueColumnsEmptyMessage: 'нет данных для отображения',
      pivotColumnsEmptyMessage: 'нет данных для отображения',
      toolPanelButton: 'панель инструментов',

      // other
      noRowsToShow: 'нет данных для отображения',

      // enterprise menu
      pinColumn: 'laPin Column',
      valueAggregation: 'laValue Agg',
      autosizeThiscolumn: 'laAutosize Diz',
      autosizeAllColumns: 'laAutsoie em All',
      groupBy: 'laGroup by',
      ungroupBy: 'laUnGroup by',
      resetColumns: 'laReset Those Cols',
      expandAll: 'laOpen-em-up',
      collapseAll: 'laClose-em-up',
      toolPanel: 'laTool Panelo',
      export: 'laExporto',
      csvExport: 'la CSV Exportp',
      excelExport: 'la Excel Exporto',

      // enterprise menu pinning
      pinLeft: 'laPin <<',
      pinRight: 'laPin >>',
      noPin: 'laDontPin <>',

      // enterprise menu aggregation and status panel
      sum: 'laSum',
      min: 'laMin',
      max: 'laMax',
      none: 'laNone',
      count: 'laCount',
      average: 'laAverage',

      // standard menu
      copy: 'копировать',
      copyWithHeaders: 'копировать с заголовком',
      ctrlC: 'ctrl + c',
      paste: 'вставить',
      ctrlV: 'ctrl + v'
    };
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
    changedValuesRows.forEach(function (row, i) {
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
  };

  private onCellEditingStopped = (event: any): void => {
    const rowEditingData = event.data;

    if (rowEditingData) {
      rowEditingData.rowIndex = event.rowIndex;
      this.pushToChangedValues(rowEditingData);
    }
  };

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    if (this.autoSize) {
      this.gridOptions.api.sizeColumnsToFit();
    }
    if (this.rowModelType === 'infinite') {
      const self = this;
      const api = params.api;
      const dataSource = {
        rowCount: null,
        getRows: function (params) {
          const gridParams = {
            startRow: params.startRow,
            endRow: params.endRow,
            filterModel: params.filterModel,
            sortModel: params.sortModel
          };
          self.http
            .post<any>(self.dataUrl, JSON.stringify(gridParams), {})
            .subscribe((data: any[]) => {
              const count = data.splice(0, 1);
              params.successCallback(data, count[0]);
            });
        }
      };
      params.api.setDatasource(dataSource);
    }
  }

  /**
   * Добавление записей в grid
   * @param rowData
   * @returns {RowNodeTransaction}
   */
  addRow(rowData) {
    return this.gridOptions.api.updateRowData({add: [rowData]});
  }

  /**
   * Обновление записей в grid
   */
  updateRowData() {
    return this.gridOptions.api.setRowData(this.rowData);
  }

  /**
   * маленький костыль для приятного отображения грида если он изначально hidden
   */
  columnSize() {
    return this.gridOptions.api.sizeColumnsToFit();
  }
}
