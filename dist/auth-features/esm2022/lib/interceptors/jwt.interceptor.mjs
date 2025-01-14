import { inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { AuthenticationApplication } from '../services/authentication.application';
import { AuthenticationInfrastructure } from '../services/authentication.infrastructure';
import { LocalStorageAuthenticationInfrastructure, } from '../services/localstorage.authentication.infrastructure';
export function jwtInterceptor(request, next) {
    const storage = inject(Storage);
    return from(storage.get('access_token')).pipe(switchMap((token) => {
        const newRequest = request.clone({
            setHeaders: {
                Authorization: 'Bearer ' + token,
            },
        });
        return next(newRequest);
    }));
}
export const refreshInterceptor = (req, next) => {
    const authInfra = inject(AuthenticationInfrastructure);
    const localStorage = inject(LocalStorageAuthenticationInfrastructure);
    const authApp = inject(AuthenticationApplication);
    return next(req).pipe(catchError((error) => {
        if (error.status === 401 || error.status === 0) {
            return authInfra.refreshToken().pipe(switchMap((tokenResponse) => {
                localStorage.startSession({
                    access_token: tokenResponse.access_token,
                    refresh_token: tokenResponse.refresh_token,
                });
                const newAuthReq = req.clone({
                    headers: req.headers.set('Authorization', `Bearer ${tokenResponse.access_token}`),
                });
                console.error('Error refreshing token update');
                return next(newAuthReq);
            }), catchError((refreshError) => {
                console.error('Un erreur est survenu', refreshError);
                authApp.logout();
                return throwError(() => new Error('Token refresh failed!'));
            }));
        }
        else {
            return throwError(() => error);
        }
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0LmludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXV0aC1mZWF0dXJlcy9zcmMvbGliL2ludGVyY2VwdG9ycy9qd3QuaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDakQsT0FBTyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNuRixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN6RixPQUFPLEVBQ0wsd0NBQXdDLEdBRXpDLE1BQU0sd0RBQXdELENBQUM7QUFFaEUsTUFBTSxVQUFVLGNBQWMsQ0FBQyxPQUF5QixFQUFFLElBQW1CO0lBQzNFLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVoQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUMzQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNsQixNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQy9CLFVBQVUsRUFBRTtnQkFDVixhQUFhLEVBQUUsU0FBUyxHQUFHLEtBQUs7YUFDakM7U0FDRixDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FDSCxDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFzQixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUNqRSxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUN2RCxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsd0NBQXdDLENBQUMsQ0FBQztJQUN0RSxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUVsRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQ25CLFVBQVUsQ0FBQyxDQUFDLEtBQXdCLEVBQUUsRUFBRTtRQUN0QyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDL0MsT0FBTyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUNsQyxTQUFTLENBQUMsQ0FBQyxhQUF3QixFQUFFLEVBQUU7Z0JBQ3JDLFlBQVksQ0FBQyxZQUFZLENBQUM7b0JBQ3hCLFlBQVksRUFBRSxhQUFhLENBQUMsWUFBWTtvQkFDeEMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxhQUFhO2lCQUMzQyxDQUFDLENBQUM7Z0JBQ0gsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztvQkFDM0IsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUN0QixlQUFlLEVBQ2YsVUFBVSxhQUFhLENBQUMsWUFBWSxFQUFFLENBQ3ZDO2lCQUNGLENBQUMsQ0FBQztnQkFDSCxPQUFPLENBQUMsS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7Z0JBRS9DLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzFCLENBQUMsQ0FBQyxFQUNGLFVBQVUsQ0FBQyxDQUFDLFlBQVksRUFBRSxFQUFFO2dCQUMxQixPQUFPLENBQUMsS0FBSyxDQUFDLHVCQUF1QixFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUNyRCxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2pCLE9BQU8sVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztZQUM5RCxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBQ0osQ0FBQzthQUFNLENBQUM7WUFDTixPQUFPLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztBQUNKLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgSHR0cEVycm9yUmVzcG9uc2UsXHJcbiAgSHR0cEhhbmRsZXJGbixcclxuICBIdHRwSW50ZXJjZXB0b3JGbixcclxuICBIdHRwUmVxdWVzdFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgaW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICdAaW9uaWMvc3RvcmFnZS1hbmd1bGFyJztcclxuaW1wb3J0IHsgY2F0Y2hFcnJvciwgZnJvbSwgc3dpdGNoTWFwLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uQXBwbGljYXRpb24gfSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5hcHBsaWNhdGlvbic7XHJcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uSW5mcmFzdHJ1Y3R1cmUgfSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5pbmZyYXN0cnVjdHVyZSc7XHJcbmltcG9ydCB7XHJcbiAgTG9jYWxTdG9yYWdlQXV0aGVudGljYXRpb25JbmZyYXN0cnVjdHVyZSxcclxuICBXaXRoVG9rZW4sXHJcbn0gZnJvbSAnLi4vc2VydmljZXMvbG9jYWxzdG9yYWdlLmF1dGhlbnRpY2F0aW9uLmluZnJhc3RydWN0dXJlJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBqd3RJbnRlcmNlcHRvcihyZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlckZuKSB7XHJcbiAgY29uc3Qgc3RvcmFnZSA9IGluamVjdChTdG9yYWdlKTtcclxuXHJcbiAgcmV0dXJuIGZyb20oc3RvcmFnZS5nZXQoJ2FjY2Vzc190b2tlbicpKS5waXBlKFxyXG4gICAgc3dpdGNoTWFwKCh0b2tlbikgPT4ge1xyXG4gICAgICBjb25zdCBuZXdSZXF1ZXN0ID0gcmVxdWVzdC5jbG9uZSh7XHJcbiAgICAgICAgc2V0SGVhZGVyczoge1xyXG4gICAgICAgICAgQXV0aG9yaXphdGlvbjogJ0JlYXJlciAnICsgdG9rZW4sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBuZXh0KG5ld1JlcXVlc3QpO1xyXG4gICAgfSlcclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVmcmVzaEludGVyY2VwdG9yOiBIdHRwSW50ZXJjZXB0b3JGbiA9IChyZXEsIG5leHQpID0+IHtcclxuICBjb25zdCBhdXRoSW5mcmEgPSBpbmplY3QoQXV0aGVudGljYXRpb25JbmZyYXN0cnVjdHVyZSk7XHJcbiAgY29uc3QgbG9jYWxTdG9yYWdlID0gaW5qZWN0KExvY2FsU3RvcmFnZUF1dGhlbnRpY2F0aW9uSW5mcmFzdHJ1Y3R1cmUpO1xyXG4gIGNvbnN0IGF1dGhBcHAgPSBpbmplY3QoQXV0aGVudGljYXRpb25BcHBsaWNhdGlvbik7XHJcblxyXG4gIHJldHVybiBuZXh0KHJlcSkucGlwZShcclxuICAgIGNhdGNoRXJyb3IoKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xyXG4gICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MDEgfHwgZXJyb3Iuc3RhdHVzID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIGF1dGhJbmZyYS5yZWZyZXNoVG9rZW4oKS5waXBlKFxyXG4gICAgICAgICAgc3dpdGNoTWFwKCh0b2tlblJlc3BvbnNlOiBXaXRoVG9rZW4pID0+IHtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnN0YXJ0U2Vzc2lvbih7XHJcbiAgICAgICAgICAgICAgYWNjZXNzX3Rva2VuOiB0b2tlblJlc3BvbnNlLmFjY2Vzc190b2tlbixcclxuICAgICAgICAgICAgICByZWZyZXNoX3Rva2VuOiB0b2tlblJlc3BvbnNlLnJlZnJlc2hfdG9rZW4sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zdCBuZXdBdXRoUmVxID0gcmVxLmNsb25lKHtcclxuICAgICAgICAgICAgICBoZWFkZXJzOiByZXEuaGVhZGVycy5zZXQoXHJcbiAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbicsXHJcbiAgICAgICAgICAgICAgICBgQmVhcmVyICR7dG9rZW5SZXNwb25zZS5hY2Nlc3NfdG9rZW59YFxyXG4gICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciByZWZyZXNoaW5nIHRva2VuIHVwZGF0ZScpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5leHQobmV3QXV0aFJlcSk7XHJcbiAgICAgICAgICB9KSxcclxuICAgICAgICAgIGNhdGNoRXJyb3IoKHJlZnJlc2hFcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbiBlcnJldXIgZXN0IHN1cnZlbnUnLCByZWZyZXNoRXJyb3IpO1xyXG4gICAgICAgICAgICBhdXRoQXBwLmxvZ291dCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcigoKSA9PiBuZXcgRXJyb3IoJ1Rva2VuIHJlZnJlc2ggZmFpbGVkIScpKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdGhyb3dFcnJvcigoKSA9PiBlcnJvcik7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgKTtcclxufTtcclxuXHJcbiJdfQ==