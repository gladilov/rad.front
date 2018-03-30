import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AgGridModule} from 'ag-grid-angular/main';

import {FormElementRenderModule} from '../../form-element-render/form-element-render.module';
import {NgxFormControlsModule} from 'ngx-form-controls';

import {CommonComponent} from './component/common/common.component';
import {RevertToComponent} from './component/revert-to/revert-to.component';
import {ProcedureRequestsComponent} from './component/revert-to/component/procedure-requests/procedure-requests.component';
import {ProcedureInfoComponent} from './component/revert-to/component/procedure-info/procedure-info.component';
import {TimeLimitsComponent} from './component/revert-to/component/time-limits/time-limits.component';
import {ExtraConditionsComponent} from './component/revert-to/component/extra-conditions/extra-conditions.component';
import {DocumentsComponent} from './component/revert-to/component/documents/documents.component';
import {ProcedureChangeOptionsComponent} from './component/revert-to/component/procedure-change-options/procedure-change-options.component';
import {RequestOfferComponent} from './component/revert-to/component/request-offer/request-offer.component';
import {ActiveCheckboxComponent} from './component/revert-to/component/request-offer/component/active-checkbox/active-checkbox.component';
import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {ConfirmComponent} from './component/confirm/confirm.component';

const objectRoutes: Routes = [
  {
    path: '',
    component: CommonComponent,
    children: [
      // {
      //   path: '',
      //   component: RevertToComponent,
      // },
      {
        path: 'revert-to/:id',
        component: RevertToComponent,
      },
    ]
  }
];
const objectRouting: ModuleWithProviders = RouterModule.forChild(objectRoutes);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFormControlsModule,
    FormElementRenderModule,
    objectRouting,
    AgGridModule.withComponents([
      ActiveCheckboxComponent
    ]),
    BootstrapModalModule.forRoot({container: document.body})
  ],
  declarations: [
    CommonComponent,
    RevertToComponent,
    ProcedureRequestsComponent,
    ProcedureInfoComponent,
    TimeLimitsComponent,
    ExtraConditionsComponent,
    DocumentsComponent,
    ProcedureChangeOptionsComponent,
    RequestOfferComponent,
    ActiveCheckboxComponent,
    ConfirmComponent
  ],
  providers: [],
  entryComponents: [
    ConfirmComponent
  ],
})
export class EaProcedureModule {
}
