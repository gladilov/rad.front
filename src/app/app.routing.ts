import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServicesComponent } from './pages/services/services.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {LazyLoadGuard} from './pages/lazy-load/lazy-load.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  {
    path: 'lazy-load',
    loadChildren: 'app/pages/lazy-load/lazy-load.module#LazyLoadModule',
      // canActivate: [ LazyLoadGuard ]
      // canActivateChild: [ LazyLoadGuard ]
  },
  { path: '**', component: NotFoundComponent }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
