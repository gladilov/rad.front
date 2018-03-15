import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

@Injectable()
export class ErrorHandleService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .catch((err: HttpErrorResponse) => {
        console.log('KOTA Статус 000 ' + err.status);
        return Observable.of(new HttpResponse({body: {
            _error: 'KOTA Статус ' + err.status
          }}));
      });
  }
}
