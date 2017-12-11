import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyLoadComponent } from '@app/pages/lazy-load/lazy-load.component';
import { LazyLoadChildrenComponent } from '@app/pages/lazy-load/lazy-load-children.component';
import { LazyLoadSectionComponent } from '@app/pages/lazy-load/lazy-load-section.component';
import { lazyLoadRouting } from '@app/pages/lazy-load/lazy-load.routing';


@NgModule({
  imports: [
    CommonModule,
    lazyLoadRouting
  ],
  declarations: [
    LazyLoadComponent,
    LazyLoadChildrenComponent,
    LazyLoadSectionComponent
  ]
})
export class LazyLoadModule { }
