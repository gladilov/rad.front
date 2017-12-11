import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { appRouting } from '@app/app.routing';
import { AuthService } from '@app/service/auth/auth.service';
import { AuthGuard } from '@app/service/auth/guards/auth.guard';

import { AppComponent } from '@app/app.component';
import { NavbarComponent } from '@app/layout/navbar/navbar.component';
import { FooterComponent } from '@app/layout/footer/footer.component';
import { HeaderComponent } from '@app/layout/header/header.component';
import { HomeComponent } from '@app/pages/home/home.component';
import { ServicesComponent } from '@app/pages/services/services.component';
import { NotFoundComponent } from '@app/pages/not-found/not-found.component';

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
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
