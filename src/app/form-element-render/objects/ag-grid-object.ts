import {NpxBaseObject} from 'ngx-form-controls';
import {GridOptions} from 'ag-grid';

export class AgGridObject extends NpxBaseObject {
  public static cnt = 1;
  private _gridOptions: GridOptions;

  constructor(data: object = {}) {
    super(data);
    this.value = [];
    // console.log('KOTA AgGridObject cnt=', AgGridObject.cnt++);
  }
  setData(data?: any): void {
    // console.log('KOTA AgGridObject setData ', data);
    // console.log('KOTA AgGridObject setData value =', this.value);
    this.value.slice(0);
    const items = <Array<any>>this.value;
    for (const rowDataObj of data) {
      if (rowDataObj['_fields'] === undefined) { continue; }
      const rowDataItem = rowDataObj['_fields'];
      const item = {};
      for (const i in rowDataItem) {
        if (rowDataItem.hasOwnProperty(i) === false) { continue; }
        item[i] = rowDataItem[i]['_default'];
      }
      // console.log('KOTA items', items);
      items.push(item);
    }

    // console.log('KOTA устанавливаем содержимое грида UUUUUUU', this._gridOptions);
    // if (this.gridOptions !== undefined) {
    //   console.log('KOTA устанавливаем содержимое грида');
    //   for (const row of this.value) {
    //     this.gridOptions.api.updateRowData({add: [row]});
    //   }
    // }
  }

  // get gridOptions(): GridOptions {
  //   return this._gridOptions;
  // }
  //
  // set gridOptions(value: GridOptions) {
  //   console.log('KOTA object set gridOptions = ', value);
  //   this._gridOptions = value;
  // }
}
