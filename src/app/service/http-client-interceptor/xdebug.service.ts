import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/Observable';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class XdebugService implements HttpInterceptor {

  constructor(private cookieS: CookieService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const date = new Date();
    // date.setFullYear(2019);
    // this.cookieS.set('XDEBUG_SESSION', 'phpstorm', date, '/etp_front', environment.apiBaseDomain);
    // console.log('KOTA set cookie domain ', environment.apiBaseDomain);
    // console.log('KOTA set cookie date ', date);
    // return next.handle(req);

    let cookie = req.headers.get('Cookie');
    if (cookie === null) {
      cookie = '';
    }
    cookie = 'XDEBUG_SESSION=phpstorm; ' + cookie;
    const newReq = req.clone({headers: req.headers.set('Cookie', cookie)});
    return next.handle(newReq);
  }
}
