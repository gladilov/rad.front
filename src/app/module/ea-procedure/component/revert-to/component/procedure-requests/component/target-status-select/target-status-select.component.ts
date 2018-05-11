import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
  selector: 'app-target-status-select',
  templateUrl: './target-status-select.component.html',
  styleUrls: ['./target-status-select.component.css']
})
export class TargetStatusSelectComponent implements ICellRendererAngularComp {

  static newStatus = 'default';
  selectedStatus;

  private _statuses = {
    'default': [
      // ['', 'Выберите новый статус заявки',],
      ['request.published', 'Подана',],
      ['request.refused', 'Отозвана',],
      ['request.rejected', 'Отклонена оператором',],
      ['request.returned', 'Возвращена',],
      ['request.no.decision', 'Решение не принято',],
      ['request.review', 'Рассмотрение первых частей',],
      ['request.electronic.auction.final.review', 'Рассмотрение вторых частей',],
      ['request.electronic.auction.no.offer', 'Нет ценовых предложений',],
      ['request.electronic.auction.final.rejected', 'Не соответствует',],
      ['request.electronic.auction.final.accepted', 'Соответствует',],
      ['request.electronic.auction.rejected', 'Не допущена',],
      ['request.electronic.auction.accepted', 'Допущена',],
      ['request.discharge', 'Отстранена',],
    ],
    'procedure.published': [
      // ['', 'Выберите новый статус заявки',],
      ['request.published', 'Подана',],
      ['request.rejected', 'Отклонена оператором',],
      ['request.returned', 'Возвращена',],
    ],
    'procedure.request.review': [
      // ['', 'Выберите новый статус заявки',],
      ['request.review', 'Рассмотрение первых частей',], // 51
      ['request.discharge', 'Отстранена',], // 61
      ['request.rejected', 'Отклонена оператором',],
    //
    ],
    'procedure.trades.awaiting': [
      // ['', 'Выберите новый статус заявки',],
      ['request.electronic.auction.accepted', 'Допущена',], // 85
      ['request.discharge', 'Отстранена',], // 61
      ['request.rejected', 'Отклонена оператором',],

    ],
    'procedure.result': [
      // ['', 'Выберите новый статус заявки',],
      ['request.electronic.auction.final.review', 'Рассмотрение вторых частей',], // 90
      ['request.discharge', 'Отстранена',], // 61
      ['request.rejected', 'Отклонена оператором',],

    ],
    'procedure.contract': [
      // ['', 'Выберите новый статус заявки',],
      ['request.published', 'Подана',],
      ['request.refused', 'Отозвана',],
      ['request.rejected', 'Отклонена оператором',],
      ['request.returned', 'Возвращена',],
      ['request.no.decision', 'Решение не принято',],
      ['request.review', 'Рассмотрение первых частей',],
      ['request.electronic.auction.final.review', 'Рассмотрение вторых частей',],
      ['request.electronic.auction.no.offer', 'Нет ценовых предложений',],
      ['request.electronic.auction.final.rejected', 'Не соответствует',],
      ['request.electronic.auction.final.accepted', 'Соответствует',],
      ['request.electronic.auction.rejected', 'Не допущена',],
      ['request.electronic.auction.accepted', 'Допущена',],
      ['request.discharge', 'Отстранена',],
    ],
  };

  params;

  agInit(params: any): void {
    this.params = params;
    this.params.context.componentParent.setValueForm();
  }

  refresh(): boolean {
    return false;
  }

  get statuses() {
    return this._statuses[TargetStatusSelectComponent.newStatus];
  }

  set statuses(statuses) {
    this._statuses = statuses;
  }

  onChange(event) {
    this.params.context.componentParent.selectStatus(this.params.node.rowIndex, event);
  }
}

