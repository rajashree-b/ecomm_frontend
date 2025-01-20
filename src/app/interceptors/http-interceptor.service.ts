import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', 
})
export class HttpInterceptorService implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
  console.log("interceptor triggered");
    // Log cookies before the request is sent
    const cookies = document.cookie;
    console.log('Cookies before request:', cookies);
    

    const clonedRequest = request.clone({
      withCredentials: true, // Add credentials (cookies) to all requests
    });

    

    // Log cookies after the request is cloned
    const cookiesAfterRequest = document.cookie;
    console.log('Cookies after request cloned:', cookiesAfterRequest);

    return next.handle(clonedRequest);
  }
}

// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
//   HttpResponse,
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class HttpInterceptorService implements HttpInterceptor {
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     // console.log('Interceptor triggered');

//     // console.log('Cookies before request:', document.cookie);
//     console.log(request);

//     const clonedRequest = request.clone({
//       withCredentials: true,
//     });

//     return next.handle(clonedRequest).pipe(
//       tap((event) => {
//         if (event instanceof HttpResponse) {
//           console.log('Response received');
//           console.log('Response headers:', event.headers);
//         }
//       })
//     );
//   }
// }

