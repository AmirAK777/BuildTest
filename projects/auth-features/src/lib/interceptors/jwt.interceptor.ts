import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { AuthenticationApplication } from '../services/authentication.application';
import { AuthenticationInfrastructure } from '../services/authentication.infrastructure';
import {
  LocalStorageAuthenticationInfrastructure,
  WithToken,
} from '../services/localstorage.authentication.infrastructure';

export function jwtInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {
  const storage = inject(Storage);

  return from(storage.get('access_token')).pipe(
    switchMap((token) => {
      const newRequest = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token,
        },
      });
      return next(newRequest);
    })
  );
}

export const refreshInterceptor: HttpInterceptorFn = (req, next) => {
  const authInfra = inject(AuthenticationInfrastructure);
  const localStorage = inject(LocalStorageAuthenticationInfrastructure);
  const authApp = inject(AuthenticationApplication);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 0) {
        return authInfra.refreshToken().pipe(
          switchMap((tokenResponse: WithToken) => {
            localStorage.startSession({
              access_token: tokenResponse.access_token,
              refresh_token: tokenResponse.refresh_token,
            });
            const newAuthReq = req.clone({
              headers: req.headers.set(
                'Authorization',
                `Bearer ${tokenResponse.access_token}`
              ),
            });
            console.error('Error refreshing token update');

            return next(newAuthReq);
          }),
          catchError((refreshError) => {
            console.error('Un erreur est survenu', refreshError);
            authApp.logout();
            return throwError(() => new Error('Token refresh failed!'));
          })
        );
      } else {
        return throwError(() => error);
      }
    })
  );
};

