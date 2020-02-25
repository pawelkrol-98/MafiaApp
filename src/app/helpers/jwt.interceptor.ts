import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to api url
    const currentUser = this.authenticationService.currentUserValue;
    const isLoggedIn = currentUser && currentUser.userSession;
    const isApiUrl = request.url.startsWith('http://localhost:8443/api');
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          'user-session': `${currentUser.userSession}`
        }
      });
    }

    return next.handle(request);
  }
}
