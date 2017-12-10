import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { appRouting } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { ServicesComponent } from './pages/services/services.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {LazyLoadGuard} from './pages/lazy-load/lazy-load.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    ServicesComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    appRouting
  ],
  providers: [LazyLoadGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
