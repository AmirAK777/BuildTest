import { Offers } from '../models/offers';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OffersInfrastructure {
    private readonly apiClovisUrl;
    private readonly _httpClient;
    getOffers(): Observable<Offers>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OffersInfrastructure, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OffersInfrastructure>;
}
