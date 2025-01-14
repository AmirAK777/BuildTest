import * as i0 from '@angular/core';
import { inject, Injectable } from '@angular/core';
import { signalStore, withState, withMethods, patchState, withHooks } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, concatMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { HttpClient } from '@angular/common/http';

class OffersInfrastructure {
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

const initialValue = {
    offers: null,
    isLoading: false,
};
const OffersStore = signalStore({ providedIn: 'root' }, withState(initialValue), withMethods((store, infra = inject(OffersInfrastructure)) => ({
    getOffers: rxMethod(pipe(tap(() => patchState(store, { isLoading: true })), concatMap(() => {
        return infra.getOffers().pipe(tapResponse({
            next: (offers) => patchState(store, { isLoading: false, offers }),
            error: () => patchState(store, { isLoading: false }),
        }));
    }))),
})), withHooks({
    onInit(store) {
        store.getOffers();
    },
}));

class OffersApplication {
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

/*
 * Public API Surface of offer-payments
 */

/**
 * Generated bundle index. Do not edit.
 */

export { OffersApplication };
//# sourceMappingURL=offer-payments.mjs.map
