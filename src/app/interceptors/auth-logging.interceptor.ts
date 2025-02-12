import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthLoggingInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('Request:', req);
    const clonedRequest = req.clone({
      withCredentials: true,   });

    console.log('Cloned Request:', clonedRequest);

    return next.handle(clonedRequest).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log('Response:', event);
          }
        },
        (error) => {
          console.error('Error response:', error);
        }
      )
    );
  }
}
