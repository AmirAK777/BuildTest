import { inject, Injectable } from '@angular/core';
import { LocalStorageAuthenticationInfrastructure } from './localstorage.authentication.infrastructure';
import { jwtDecode } from 'jwt-decode';
import * as i0 from "@angular/core";
export class JwtDecoderService {
    constructor() {
        this.storage = inject(LocalStorageAuthenticationInfrastructure);
    }
    async decodeToken() {
        const token = await this.storage.get('access_token');
        const decodedToken = jwtDecode(token);
        const roles = decodedToken.realm_access?.roles || null;
        return roles;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: JwtDecoderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: JwtDecoderService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: JwtDecoderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0LWRlY29kZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F1dGgtZmVhdHVyZXMvc3JjL2xpYi9zZXJ2aWNlcy9qd3QtZGVjb2Rlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSx3Q0FBd0MsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3hHLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxZQUFZLENBQUM7O0FBS3ZDLE1BQU0sT0FBTyxpQkFBaUI7SUFIOUI7UUFJRSxZQUFPLEdBQUcsTUFBTSxDQUFDLHdDQUF3QyxDQUFDLENBQUM7S0FRNUQ7SUFOQyxLQUFLLENBQUMsV0FBVztRQUNmLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDckQsTUFBTSxZQUFZLEdBQVEsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLE1BQU0sS0FBSyxHQUFHLFlBQVksQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLElBQUksQ0FBQztRQUN2RCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7K0dBUlUsaUJBQWlCO21IQUFqQixpQkFBaUIsY0FGaEIsTUFBTTs7NEZBRVAsaUJBQWlCO2tCQUg3QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VBdXRoZW50aWNhdGlvbkluZnJhc3RydWN0dXJlIH0gZnJvbSAnLi9sb2NhbHN0b3JhZ2UuYXV0aGVudGljYXRpb24uaW5mcmFzdHJ1Y3R1cmUnO1xyXG5pbXBvcnQgeyBqd3REZWNvZGUgfSBmcm9tICdqd3QtZGVjb2RlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCcsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBKd3REZWNvZGVyU2VydmljZSB7XHJcbiAgc3RvcmFnZSA9IGluamVjdChMb2NhbFN0b3JhZ2VBdXRoZW50aWNhdGlvbkluZnJhc3RydWN0dXJlKTtcclxuXHJcbiAgYXN5bmMgZGVjb2RlVG9rZW4oKTogUHJvbWlzZTxzdHJpbmdbXSB8IG51bGw+IHtcclxuICAgIGNvbnN0IHRva2VuID0gYXdhaXQgdGhpcy5zdG9yYWdlLmdldCgnYWNjZXNzX3Rva2VuJyk7XHJcbiAgICBjb25zdCBkZWNvZGVkVG9rZW46IGFueSA9IGp3dERlY29kZSh0b2tlbik7XHJcbiAgICBjb25zdCByb2xlcyA9IGRlY29kZWRUb2tlbi5yZWFsbV9hY2Nlc3M/LnJvbGVzIHx8IG51bGw7XHJcbiAgICByZXR1cm4gcm9sZXM7XHJcbiAgfVxyXG59XHJcbiJdfQ==