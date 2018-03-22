import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-revert-to-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  @Input()formElement = new FormGroup({});
  form = new FormGroup({});

  constructor() { }

  ngOnInit() {
  }

}
