import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
export declare function jwtInterceptor(request: HttpRequest<any>, next: HttpHandlerFn): import("rxjs").Observable<import("@angular/common/http").HttpEvent<unknown>>;
export declare const refreshInterceptor: HttpInterceptorFn;
