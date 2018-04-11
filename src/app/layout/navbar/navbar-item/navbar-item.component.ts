import {Component, Input, OnInit} from '@angular/core';
import {FormControlAgGrid} from '../../../form-element-render/controls/form-control-ag-grid';

@Component({
  selector: 'app-navbar-item',
  templateUrl: './navbar-item.component.html',
  styleUrls: ['./navbar-item.component.css']
})
export class NavbarItemComponent implements OnInit {

  liClass: string;

  @Input() item: any;
  @Input() level: string;

  static get mainLevel() {
    return 'main';
  }

  constructor() {
  }

  ngOnInit() {
    if (this.level !== NavbarItemComponent.mainLevel && this.item.hasOwnProperty('pages')) {
      this.liClass = 'nav-arrow';
    }
    if (!this.item.hasOwnProperty('target')) {
      this.item.target = '_self';
    }

  }

}
