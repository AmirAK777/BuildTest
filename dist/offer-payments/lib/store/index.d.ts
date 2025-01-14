import { Offers } from '../models/offers';
export interface OffersState {
    offers: Offers | undefined | null;
    isLoading: boolean;
}
export declare const OffersStore: import("@angular/core").Type<{
    offers: import("@angular/core").Signal<Offers | null | undefined>;
    isLoading: import("@angular/core").Signal<boolean>;
    getOffers: ((input: void | import("rxjs").Observable<void> | import("@angular/core").Signal<void>, config?: {
        injector?: import("@angular/core").Injector | undefined;
    } | undefined) => import("rxjs").Unsubscribable) & import("rxjs").Unsubscribable;
} & import("@ngrx/signals").StateSource<{
    offers: Offers | undefined | null;
    isLoading: boolean;
}>>;
