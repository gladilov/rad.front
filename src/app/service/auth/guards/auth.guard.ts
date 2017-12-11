import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad,  ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '@app/service/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // redirect and return false
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // redirect and return false
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;
    // console.log(url);

    // redirect and return false
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
