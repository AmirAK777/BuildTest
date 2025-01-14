import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class OffersInfrastructure {
    constructor() {
        this.apiClovisUrl = 'https://localhost:5001';
        this._httpClient = inject(HttpClient);
    }
    getOffers() {
        return this._httpClient.get(`${this.apiClovisUrl}/offers`);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: OffersInfrastructure, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: OffersInfrastructure, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: OffersInfrastructure, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmZXJzLmluZnJhc3RydWN0dXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvb2ZmZXItcGF5bWVudHMvc3JjL2xpYi9zZXJ2aWNlcy9vZmZlcnMuaW5mcmFzdHJ1Y3R1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQU9uRCxNQUFNLE9BQU8sb0JBQW9CO0lBSGpDO1FBSW1CLGlCQUFZLEdBQUcsd0JBQXdCLENBQUM7UUFFeEMsZ0JBQVcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7S0FLbkQ7SUFIQyxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLFNBQVMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7K0dBUFUsb0JBQW9CO21IQUFwQixvQkFBb0IsY0FGbkIsTUFBTTs7NEZBRVAsb0JBQW9CO2tCQUhoQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IGluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPZmZlcnMgfSBmcm9tICcuLi9tb2RlbHMvb2ZmZXJzJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290JyxcclxufSlcclxuZXhwb3J0IGNsYXNzIE9mZmVyc0luZnJhc3RydWN0dXJlIHtcclxuICBwcml2YXRlIHJlYWRvbmx5IGFwaUNsb3Zpc1VybCA9ICdodHRwczovL2xvY2FsaG9zdDo1MDAxJztcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBfaHR0cENsaWVudCA9IGluamVjdChIdHRwQ2xpZW50KTtcclxuXHJcbiAgZ2V0T2ZmZXJzKCk6IE9ic2VydmFibGU8T2ZmZXJzPiB7XHJcbiAgICByZXR1cm4gdGhpcy5faHR0cENsaWVudC5nZXQ8T2ZmZXJzPihgJHt0aGlzLmFwaUNsb3Zpc1VybH0vb2ZmZXJzYCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==