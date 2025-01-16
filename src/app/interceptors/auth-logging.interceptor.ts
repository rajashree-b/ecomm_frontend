import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthLoggingInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('Request:', req);
    // Add credentials to the request
    const clonedRequest = req.clone({
      withCredentials: true,  // Set credentials flag to true if you want cookies to be sent with cross-origin requests
    });

    // Log the request details
    console.log('Cloned Request:', clonedRequest);

    return next.handle(clonedRequest).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // Log the response details
            console.log('Response:', event);
          }
        },
        (error) => {
          // Handle error and log it
          console.error('Error response:', error);
        }
      )
    );
  }
}
