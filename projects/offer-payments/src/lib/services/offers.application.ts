import { inject, Injectable, Signal } from '@angular/core';
import { OffersStore } from '../store';
import { Offers } from '../models/offers';

@Injectable({
  providedIn: 'root',
})
export class OffersApplication {
  private readonly _store = inject(OffersStore);

  getOffers() {
    this._store.getOffers();
  }

  get offers(): Signal<Offers | null | undefined> {
    return this._store.offers;
  }
}
