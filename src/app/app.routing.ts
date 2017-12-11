import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/service/auth/guards/auth.guard';
import { HomeComponent } from '@app/pages/home/home.component';
import { ServicesComponent } from '@app/pages/services/services.component';
import { NotFoundComponent } from '@app/pages/not-found/not-found.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  {
    path: 'lazy-load',
    loadChildren: 'app/pages/lazy-load/lazy-load.module#LazyLoadModule',
    canLoad: [AuthGuard]
  },
  { path: '**', component: NotFoundComponent }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes, { enableTracing: true });