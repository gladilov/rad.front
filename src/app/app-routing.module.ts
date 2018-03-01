import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {ServicesComponent} from './pages/services/services.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';

// import { HomeComponent} from "./component/home/home.component";
// import { UserProfileComponent } from './component/user-profile/user-profile.component';
// import { ConfirmEmailComponent } from './component/confirm-email/confirm-email.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'services', component: ServicesComponent },
  {
    path: 'ea-procedure',
    loadChildren: 'app/module/ea-procedure/ea-procedure.module#EaProcedureModule',
    // canActivate: [ EaProcedureGuard ]
    // canActivateChild: [ EaProcedureGuard ]
  },
    {
        path: 'lazy-load',
        loadChildren: 'app/pages/lazy-load/lazy-load.module#LazyLoadModule',
        // canActivate: [ LazyLoadGuard ]
        // canActivateChild: [ LazyLoadGuard ]
    },
    { path: '**', component: NotFoundComponent }

  // { path: '', component: HomeComponent },
  // { path: 'user/:id', component: UserProfileComponent },
  // { path: 'confirm_email/:email/:hash', component: ConfirmEmailComponent },
  // {
  //   path: 'dist/object',
  //   loadChildren: 'app/module/object/object.module#ObjectModule',
  //   // canActivate: [ LazyLoadGuard ]
  //   // canActivateChild: [ LazyLoadGuard ]
  // },

  // { path: 'services', component: ServicesComponent },
  // {
  //   path: 'lazy-load',
  //   loadChildren: 'app/pages/lazy-load/lazy-load.module#LazyLoadModule',
  //   canLoad: [AuthGuard]
  // },
  // { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
