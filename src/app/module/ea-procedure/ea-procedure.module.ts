import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AgGridModule } from 'ag-grid-angular/main';

import { environment } from '../../../environments/environment';

import { CommonModule } from '@angular/common';
import { CommonComponent } from './component/common/common.component';
import { RevertToComponent } from './component/revert-to/revert-to.component';

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
    objectRouting,
  ],
  declarations: [
    CommonComponent,
    RevertToComponent
  ],
  providers: [],
  entryComponents: [],
})
export class EaProcedureModule { }
