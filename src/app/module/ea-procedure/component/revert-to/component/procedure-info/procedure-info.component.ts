import { Component, OnInit, Input } from '@angular/core';
import {FormGroup} from '@angular/forms';

// import { ProcedureInfo } from '../../../../service/revert-to/procedure-info';

@Component({
  selector: 'app-revert-to-procedure-info',
  templateUrl: './procedure-info.component.html',
  styleUrls: ['./procedure-info.component.css']
})
export class ProcedureInfoComponent implements OnInit {
  @Input()formElement: FormGroup;
  // @Input()elementData: ProcedureInfo;

  constructor() { }

  ngOnInit() {
  }

}
