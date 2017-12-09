import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { TopHeaderComponent } from './layout/top-header.component';
import { TopMenuComponent } from './layout/top-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    TopHeaderComponent,
    TopMenuComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
