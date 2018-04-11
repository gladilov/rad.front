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
import {DialogService} from 'ng2-bootstrap-modal';
import {ConfirmComponent} from '../../../confirm/confirm.component';
import {environment} from '../../../../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-revert-to-request-offer',
  templateUrl: './request-offer.component.html',
  styleUrls: ['./request-offer.component.css']
})
export class RequestOfferComponent implements OnInit {

  private context;
  private frameworkComponents;
  private rowModelType = 'infinite';
  private cacheOverflowSize = 500;
  private sortingOrder = ['desc', 'asc', null];
  private dataUrl = environment.apiBaseUrl + '/EA/procedure/offer-grid/' + (+this.route.snapshot.paramMap.get('id'));

  public gridOptions: GridOptions;
  @Input() hidden: boolean;
  @Input() form: NgxFormControlMultiSelect;
  @ViewChild(AgGridFormcontrolComponent) grid: AgGridFormcontrolComponent;

  public columnDefs: any[] = [
    {field: 'id', headerName: 'id', hide: true},
    {
      field: 'requestId',
      headerName: 'Номер заявки участника',
      width: 120,
      filter: 'agNumberColumnFilter',
      filterParams: { // включает кнопку применение фильтра, дабы не перегружать бек лишними запросами
        applyButton: true,
        clearButton: true
      }
    },
    {
      field: 'organization',
      headerName: 'Наименование участника',
      filterParams: { // включает кнопку применение фильтра, дабы не перегружать бек лишними запросами
        applyButton: true,
        clearButton: true
      }
    },
    {
      field: 'price',
      headerName: 'Предложенная цена, (руб)',
      filterParams: { // включает кнопку применение фильтра, дабы не перегружать бек лишними запросами
        applyButton: true,
        clearButton: true
      }
    },
    {
      field: 'offerType',
      headerName: 'Тип ценового предложения',
      sortingOrder: [null],
      suppressFilter: true, // отключить фильтр
      suppressSorting: true // отключить сортировку
    },
    {
      field: 'createDateTime',
      headerName: 'Дата и время подачи предложения',
      filter: 'agDateColumnFilter',
      filterParams: { // включает кнопку применение фильтра, дабы не перегружать бек лишними запросами
        applyButton: true,
        clearButton: true
      }
    },
    {
      headerName: 'Выбрать',
      field: 'select',
      cellRenderer: 'activeCheckboxRenderer',
      width: 110,
      sortingOrder: [null],
      suppressFilter: true, // отключить фильтр
      suppressSorting: true // отключить сортировку
    },
    {
      field: 'active',
      headerName: 'Действует / Удалено',
      sortingOrder: [null],
      suppressFilter: true, // отключить фильтр
      suppressSorting: true // отключить сортировку
    },
  ];

  public gridMode = AGGRID_MODE_EDITABLE;
  subscription: Subscription;

  constructor(public ss: SharedService,
              private dialogService: DialogService,
              private route: ActivatedRoute) {
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
    this.grid.updateRowData();
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
    const self = this;
    this.showConfirm('Вы уверены что хотите удалить выбранные ценовые предложения?',
      (isConfirmed) => {
        // We get dialog result
        if (isConfirmed) {
          const data = self.grid.rowData;
          for (let i = 0; i < data.length; i++) {
            for (const n in data[i]) {
              if (n === 'select' && data[i].hasOwnProperty(n) && data[i][n]) {
                data[i]['active'] = 'Удалено';
                data[i]['select'] = false;
              }
            }
          }
          self.updateGrid();
        }
      });
  }

  cancelDeleteSelected() {
    const self = this;
    this.showConfirm('Вы уверены что хотите отменить удаление для выбранных ценовых предложений?',
      (isConfirmed) => {
        // We get dialog result
        if (isConfirmed) {
          const data = self.grid.rowData;
          for (let i = 0; i < data.length; i++) {
            for (const n in data[i]) {
              if (n === 'select' && data[i].hasOwnProperty(n) && data[i][n]) {
                data[i]['active'] = 'Действует';
                data[i]['select'] = false;
              }
            }
          }
          self.updateGrid();
        }
      });
  }

}
