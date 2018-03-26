import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular/main';

import { environment } from '../../../environments/environment';
import { FormElementRenderModule } from '../../form-element-render/form-element-render.module';
import { NgxFormControlsModule } from 'ngx-form-controls';

import { CommonComponent } from './component/common/common.component';
import { RevertToComponent } from './component/revert-to/revert-to.component';
import { ProcedureRequestsComponent } from './component/revert-to/component/procedure-requests/procedure-requests.component';
import { ProcedureInfoComponent } from './component/revert-to/component/procedure-info/procedure-info.component';
import { TimeLimitsComponent } from './component/revert-to/component/time-limits/time-limits.component';
import { ExtraConditionsComponent } from './component/revert-to/component/extra-conditions/extra-conditions.component';
import { DocumentsComponent } from './component/revert-to/component/documents/documents.component';
import {ProcedureChangeOptionsComponent} from './component/revert-to/component/procedure-change-options/procedure-change-options.component';

const objectRoutes: Routes = [
  {
    path: '',
    component: CommonComponent,
    children: [
      {
        path: '',
        component: RevertToComponent,
        // canActivate: [ RevertToGuard ],
        // canActivateChild: [ RevertToGuard ],
      },
      {
        path: 'revert-to/:id',
        component: RevertToComponent,
      },
      // {
      //   path: 'retail-entertainment-centre',
      //   component: RetailEntertainmentCentreComponent,
      //     // canActivate: [ LazyLoadGuard ],
      //     // canActivateChild: [ LazyLoadGuard ],
      // }
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
      // RemoveRowActionComponent
    ])
  ],
  declarations: [
    CommonComponent,
    RevertToComponent,
    ProcedureRequestsComponent,
    ProcedureInfoComponent,
    TimeLimitsComponent,
    ExtraConditionsComponent,
    DocumentsComponent,
    ProcedureChangeOptionsComponent
  ],
  providers: [],
  entryComponents: [],
})
export class EaProcedureModule { }
