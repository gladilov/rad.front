import { Component } from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
  selector: 'app-active-checkbox',
  templateUrl: './active-checkbox.component.html',
  styleUrls: ['./active-checkbox.component.css']
})
export class ActiveCheckboxComponent implements ICellRendererAngularComp {
  public params: any;
  checked = false;

  agInit(params: any): void {
    this.params = params;
    if (params.hasOwnProperty('value')) {
      this.checked = params.value;
    }
  }

  public invokeParentMethod() {
    this.checked = !this.checked;
    this.params.context.componentParent.methodFromParent(this.params.node.rowIndex);
  }

  refresh(): boolean {
    return false;
  }}
