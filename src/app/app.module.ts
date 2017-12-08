import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {TopHeaderComponent} from './layout/top-header.component';
import {TopMenuComponent} from './layout/top-menu.component';

@NgModule({
  declarations: [
      AppComponent,
      TopHeaderComponent,
      TopMenuComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
