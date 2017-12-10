import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LazyLoadComponent } from './lazy-load.component';
import { LazyLoadChildrenComponent } from './lazy-load-children.component';
import { LazyLoadSectionComponent } from './lazy-load-section.component';

const lazyLoadRoutes: Routes = [
  {
    path: '',
    component: LazyLoadSectionComponent,
    children: [
      {
        path: '',
        component: LazyLoadComponent
      },
      {
        path: 'children',
        component: LazyLoadChildrenComponent
      }
    ]
  }
];

export const lazyLoadRouting: ModuleWithProviders = RouterModule.forChild(lazyLoadRoutes);