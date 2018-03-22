import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';

@Injectable()
export class JsonService implements HttpInterceptor {
  private jsonContentTypeHeader = 'application/json';
  constructor() { }

  /**
   * добавление Content-Type: application/json ко всем запросам
   * @param {HttpRequest<any>} req
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jsonReq = req.clone({headers: req.headers.set('Content-Type', this.jsonContentTypeHeader)});
    return next.handle(jsonReq);
  }
}
