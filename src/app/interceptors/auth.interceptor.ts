import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  //interceptor, evden çıkarke çocuğa harçlık,poğaça gibi malzemeleri çocuğun çantısına koyan methottur
  //koyacak bi şey yoksa boş gönderir
  //çanta olduğu gibi kalır malzeme ekler sadece çıkartma yapmaz
  //interceptor=anne

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   let token=localStorage.getItem("token");
   let newRequest:HttpRequest<any>;
   newRequest=request.clone({
    headers:request.headers.set("Authorization", "Bearer " + token)
   })
    return next.handle(newRequest);
  }
}
