import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadComponent } from './lazy-load.component';
import { LazyLoadChildrenComponent } from './lazy-load-children.component';
import { LazyLoadSectionComponent } from './lazy-load-section.component';
import { lazyLoadRouting } from './lazy-load.routing';


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
