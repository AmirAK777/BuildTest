import { Injectable, inject } from '@angular/core';
import { from, shareReplay, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import * as i0 from "@angular/core";
export class AuthenticationInfrastructure {
    constructor() {
        this.apiKeyCloakUrl = 'http://192.168.1.38:8080';
        this._httpClient = inject(HttpClient);
        this.storage = inject(Storage);
    }
    login(email, password) {
        const body = new HttpParams()
            .set('grant_type', 'password')
            .set('client_id', 'clovis-public-client')
            .set('scope', 'email openid')
            .set('username', email)
            .set('password', password);
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return this._httpClient
            .post(`${this.apiKeyCloakUrl}/realms/clovis/protocol/openid-connect/token/`, body.toString(), { headers })
            .pipe(shareReplay(1));
    }
    refreshToken() {
        return from(this.storage.get('refresh_token')).pipe(switchMap(storedRefreshToken => {
            const body = new HttpParams()
                .set('grant_type', 'refresh_token')
                .set('client_id', 'clovis-public-client')
                .set('refresh_token', storedRefreshToken);
            const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
            return this._httpClient
                .post(`${this.apiKeyCloakUrl}/realms/clovis/protocol/openid-connect/token/`, body, { headers })
                .pipe(shareReplay(1));
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: AuthenticationInfrastructure, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: AuthenticationInfrastructure, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: AuthenticationInfrastructure, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24uaW5mcmFzdHJ1Y3R1cmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hdXRoLWZlYXR1cmVzL3NyYy9saWIvc2VydmljZXMvYXV0aGVudGljYXRpb24uaW5mcmFzdHJ1Y3R1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLElBQUksRUFBYyxXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRWhFLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzNFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7QUFLakQsTUFBTSxPQUFPLDRCQUE0QjtJQUh6QztRQUltQixtQkFBYyxHQUFHLDBCQUEwQixDQUFDO1FBRTVDLGdCQUFXLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pDLFlBQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7S0E2QzVDO0lBM0NDLEtBQUssQ0FBQyxLQUFhLEVBQUUsUUFBZ0I7UUFDbkMsTUFBTSxJQUFJLEdBQUcsSUFBSSxVQUFVLEVBQUU7YUFDMUIsR0FBRyxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUM7YUFDN0IsR0FBRyxDQUFDLFdBQVcsRUFBRSxzQkFBc0IsQ0FBQzthQUN4QyxHQUFHLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQzthQUM1QixHQUFHLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQzthQUN0QixHQUFHLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRTdCLE1BQU0sT0FBTyxHQUFHLElBQUksV0FBVyxDQUFDO1lBQzlCLGNBQWMsRUFBRSxtQ0FBbUM7U0FDcEQsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUMsV0FBVzthQUNwQixJQUFJLENBQ0gsR0FBRyxJQUFJLENBQUMsY0FBYywrQ0FBK0MsRUFDckUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUNmLEVBQUUsT0FBTyxFQUFFLENBQ1o7YUFDQSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDakQsU0FBUyxDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDN0IsTUFBTSxJQUFJLEdBQUcsSUFBSSxVQUFVLEVBQUU7aUJBQzFCLEdBQUcsQ0FBQyxZQUFZLEVBQUUsZUFBZSxDQUFDO2lCQUNsQyxHQUFHLENBQUMsV0FBVyxFQUFFLHNCQUFzQixDQUFDO2lCQUN4QyxHQUFHLENBQUMsZUFBZSxFQUFFLGtCQUFrQixDQUFDLENBQUM7WUFFNUMsTUFBTSxPQUFPLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQ25DLGNBQWMsRUFDZCxtQ0FBbUMsQ0FDcEMsQ0FBQztZQUVGLE9BQU8sSUFBSSxDQUFDLFdBQVc7aUJBQ3BCLElBQUksQ0FDSCxHQUFHLElBQUksQ0FBQyxjQUFjLCtDQUErQyxFQUNyRSxJQUFJLEVBQ0osRUFBRSxPQUFPLEVBQUUsQ0FDWjtpQkFDQSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7K0dBaERVLDRCQUE0QjttSEFBNUIsNEJBQTRCLGNBRjNCLE1BQU07OzRGQUVQLDRCQUE0QjtrQkFIeEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBpbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZnJvbSwgT2JzZXJ2YWJsZSwgc2hhcmVSZXBsYXksIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvblRva2VuIH0gZnJvbSAnLi4vbW9kZWxzL2F1dGhlbnRpY2F0aW9uLXVzZXInO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gJ0Bpb25pYy9zdG9yYWdlLWFuZ3VsYXInO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290JyxcclxufSlcclxuZXhwb3J0IGNsYXNzIEF1dGhlbnRpY2F0aW9uSW5mcmFzdHJ1Y3R1cmUge1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgYXBpS2V5Q2xvYWtVcmwgPSAnaHR0cDovLzE5Mi4xNjguMS4zODo4MDgwJztcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBfaHR0cENsaWVudCA9IGluamVjdChIdHRwQ2xpZW50KTtcclxuICBwcml2YXRlIHJlYWRvbmx5IHN0b3JhZ2UgPSBpbmplY3QoU3RvcmFnZSk7XHJcblxyXG4gIGxvZ2luKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEF1dGhlbnRpY2F0aW9uVG9rZW4+IHtcclxuICAgIGNvbnN0IGJvZHkgPSBuZXcgSHR0cFBhcmFtcygpXHJcbiAgICAgIC5zZXQoJ2dyYW50X3R5cGUnLCAncGFzc3dvcmQnKVxyXG4gICAgICAuc2V0KCdjbGllbnRfaWQnLCAnY2xvdmlzLXB1YmxpYy1jbGllbnQnKVxyXG4gICAgICAuc2V0KCdzY29wZScsICdlbWFpbCBvcGVuaWQnKVxyXG4gICAgICAuc2V0KCd1c2VybmFtZScsIGVtYWlsKVxyXG4gICAgICAuc2V0KCdwYXNzd29yZCcsIHBhc3N3b3JkKTtcclxuXHJcbiAgICBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHtcclxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdGhpcy5faHR0cENsaWVudFxyXG4gICAgICAucG9zdDxBdXRoZW50aWNhdGlvblRva2VuPihcclxuICAgICAgICBgJHt0aGlzLmFwaUtleUNsb2FrVXJsfS9yZWFsbXMvY2xvdmlzL3Byb3RvY29sL29wZW5pZC1jb25uZWN0L3Rva2VuL2AsXHJcbiAgICAgICAgYm9keS50b1N0cmluZygpLFxyXG4gICAgICAgIHsgaGVhZGVycyB9LFxyXG4gICAgICApXHJcbiAgICAgIC5waXBlKHNoYXJlUmVwbGF5KDEpKTtcclxuICB9XHJcblxyXG4gIHJlZnJlc2hUb2tlbigpIHtcclxuICAgIHJldHVybiBmcm9tKHRoaXMuc3RvcmFnZS5nZXQoJ3JlZnJlc2hfdG9rZW4nKSkucGlwZShcclxuICAgICAgc3dpdGNoTWFwKHN0b3JlZFJlZnJlc2hUb2tlbiA9PiB7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IG5ldyBIdHRwUGFyYW1zKClcclxuICAgICAgICAgIC5zZXQoJ2dyYW50X3R5cGUnLCAncmVmcmVzaF90b2tlbicpXHJcbiAgICAgICAgICAuc2V0KCdjbGllbnRfaWQnLCAnY2xvdmlzLXB1YmxpYy1jbGllbnQnKVxyXG4gICAgICAgICAgLnNldCgncmVmcmVzaF90b2tlbicsIHN0b3JlZFJlZnJlc2hUb2tlbik7XHJcblxyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKS5zZXQoXHJcbiAgICAgICAgICAnQ29udGVudC1UeXBlJyxcclxuICAgICAgICAgICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwQ2xpZW50XHJcbiAgICAgICAgICAucG9zdDxBdXRoZW50aWNhdGlvblRva2VuPihcclxuICAgICAgICAgICAgYCR7dGhpcy5hcGlLZXlDbG9ha1VybH0vcmVhbG1zL2Nsb3Zpcy9wcm90b2NvbC9vcGVuaWQtY29ubmVjdC90b2tlbi9gLFxyXG4gICAgICAgICAgICBib2R5LFxyXG4gICAgICAgICAgICB7IGhlYWRlcnMgfSxcclxuICAgICAgICAgIClcclxuICAgICAgICAgIC5waXBlKHNoYXJlUmVwbGF5KDEpKTtcclxuICAgICAgfSksXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=