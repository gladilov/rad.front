import {NpxBaseObject} from 'ngx-form-controls';
import {GridOptions} from 'ag-grid';

export class AgGridObject extends NpxBaseObject {
  public static cnt = 1;

  constructor(data: object = {}) {
    super(data);
    this.value = [];
  }
  setData(data?: any): void {
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
      items.push(item);
    }

  }

}
