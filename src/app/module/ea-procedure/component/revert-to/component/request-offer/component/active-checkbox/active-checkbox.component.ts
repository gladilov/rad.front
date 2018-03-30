import { Component } from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
  selector: 'app-active-checkbox',
  templateUrl: './active-checkbox.component.html',
  styleUrls: ['./active-checkbox.component.css']
})
export class ActiveCheckboxComponent implements ICellRendererAngularComp {
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  public invokeParentMethod() {
    this.params.context.componentParent.methodFromParent(this.params.node.rowIndex);
  }

  refresh(): boolean {
    return false;
  }}
