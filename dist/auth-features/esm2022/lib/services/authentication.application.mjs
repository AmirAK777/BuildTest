import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationStore } from '../store';
import * as i0 from "@angular/core";
export class AuthenticationApplication {
    constructor() {
        this.store = inject(AuthenticationStore);
        this.router = inject(Router);
    }
    login(login, password) {
        this.store.logIn({ login, password });
    }
    logout() {
        this.store.logout();
    }
    get isLoading() {
        return this.store.isLoading;
    }
    get isAuthenticated() {
        return this.store.isLogged;
    }
    get token() {
        return this.store.token;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: AuthenticationApplication, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: AuthenticationApplication, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: AuthenticationApplication, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24uYXBwbGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hdXRoLWZlYXR1cmVzL3NyYy9saWIvc2VydmljZXMvYXV0aGVudGljYXRpb24uYXBwbGljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFVLE1BQU0sRUFBRSxVQUFVLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXpDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7QUFHL0MsTUFBTSxPQUFPLHlCQUF5QjtJQUR0QztRQUVtQixVQUFLLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDcEMsV0FBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQXVCMUM7SUFuQkMsS0FBSyxDQUFDLEtBQWEsRUFBRSxRQUFnQjtRQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBSSxlQUFlO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDMUIsQ0FBQzsrR0F4QlUseUJBQXlCO21IQUF6Qix5QkFBeUIsY0FEWixNQUFNOzs0RkFDbkIseUJBQXlCO2tCQURyQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGVmZmVjdCwgaW5qZWN0LCBJbmplY3RhYmxlLCBTaWduYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQXV0aGVudGljYXRpb25Ub2tlbiB9IGZyb20gJy4uL21vZGVscy9hdXRoZW50aWNhdGlvbi11c2VyJztcclxuaW1wb3J0IHsgQXV0aGVudGljYXRpb25TdG9yZSB9IGZyb20gJy4uL3N0b3JlJztcclxuXHJcbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXHJcbmV4cG9ydCBjbGFzcyBBdXRoZW50aWNhdGlvbkFwcGxpY2F0aW9uIHtcclxuICBwcml2YXRlIHJlYWRvbmx5IHN0b3JlID0gaW5qZWN0KEF1dGhlbnRpY2F0aW9uU3RvcmUpO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgcm91dGVyID0gaW5qZWN0KFJvdXRlcik7XHJcblxyXG5cclxuXHJcbiAgbG9naW4obG9naW46IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykge1xyXG4gICAgdGhpcy5zdG9yZS5sb2dJbih7IGxvZ2luLCBwYXNzd29yZCB9KTtcclxuICB9XHJcblxyXG4gIGxvZ291dCgpOiB2b2lkIHtcclxuICAgIHRoaXMuc3RvcmUubG9nb3V0KCk7XHJcbiAgfVxyXG5cclxuICBnZXQgaXNMb2FkaW5nKCk6IFNpZ25hbDxib29sZWFuPiB7XHJcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5pc0xvYWRpbmc7XHJcbiAgfVxyXG5cclxuICBnZXQgaXNBdXRoZW50aWNhdGVkKCk6IFNpZ25hbDxib29sZWFuPiB7XHJcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5pc0xvZ2dlZDtcclxuICB9XHJcblxyXG4gIGdldCB0b2tlbigpOiBTaWduYWw8QXV0aGVudGljYXRpb25Ub2tlbiB8IG51bGwgfCB1bmRlZmluZWQ+IHtcclxuICAgIHJldHVybiB0aGlzLnN0b3JlLnRva2VuO1xyXG4gIH1cclxufVxyXG4iXX0=