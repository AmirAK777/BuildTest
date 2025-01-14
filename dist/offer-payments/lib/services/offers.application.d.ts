import { Signal } from '@angular/core';
import { Offers } from '../models/offers';
import * as i0 from "@angular/core";
export declare class OffersApplication {
    private readonly _store;
    getOffers(): void;
    get offers(): Signal<Offers | null | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OffersApplication, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OffersApplication>;
}
