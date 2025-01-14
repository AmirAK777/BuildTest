import { inject, Injectable } from '@angular/core';
import { OffersStore } from '../store';
import * as i0 from "@angular/core";
export class OffersApplication {
    constructor() {
        this._store = inject(OffersStore);
    }
    getOffers() {
        this._store.getOffers();
    }
    get offers() {
        return this._store.offers;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: OffersApplication, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: OffersApplication, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: OffersApplication, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmZXJzLmFwcGxpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvb2ZmZXItcGF5bWVudHMvc3JjL2xpYi9zZXJ2aWNlcy9vZmZlcnMuYXBwbGljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7QUFNdkMsTUFBTSxPQUFPLGlCQUFpQjtJQUg5QjtRQUltQixXQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBUy9DO0lBUEMsU0FBUztRQUNQLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDNUIsQ0FBQzsrR0FUVSxpQkFBaUI7bUhBQWpCLGlCQUFpQixjQUZoQixNQUFNOzs0RkFFUCxpQkFBaUI7a0JBSDdCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5qZWN0LCBJbmplY3RhYmxlLCBTaWduYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2ZmZXJzU3RvcmUgfSBmcm9tICcuLi9zdG9yZSc7XHJcbmltcG9ydCB7IE9mZmVycyB9IGZyb20gJy4uL21vZGVscy9vZmZlcnMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290JyxcclxufSlcclxuZXhwb3J0IGNsYXNzIE9mZmVyc0FwcGxpY2F0aW9uIHtcclxuICBwcml2YXRlIHJlYWRvbmx5IF9zdG9yZSA9IGluamVjdChPZmZlcnNTdG9yZSk7XHJcblxyXG4gIGdldE9mZmVycygpIHtcclxuICAgIHRoaXMuX3N0b3JlLmdldE9mZmVycygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG9mZmVycygpOiBTaWduYWw8T2ZmZXJzIHwgbnVsbCB8IHVuZGVmaW5lZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3N0b3JlLm9mZmVycztcclxuICB9XHJcbn1cclxuIl19