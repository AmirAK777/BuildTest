import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { concatMap, pipe, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { OffersInfrastructure } from '../services/offers.infrastructure';
import { inject } from '@angular/core';
import { Offers } from '../models/offers';

export interface OffersState {
  offers: Offers | undefined | null;
  isLoading: boolean;
}

const initialValue: OffersState = {
  offers: null,
  isLoading: false,
};

export const OffersStore = signalStore(
  { providedIn: 'root' },
  withState(initialValue),
  withMethods((store, infra = inject(OffersInfrastructure)) => ({
    getOffers: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        concatMap(() => {
          return infra.getOffers().pipe(
            tapResponse({
              next: (offers) => patchState(store, { isLoading: false, offers }),
              error: () => patchState(store, { isLoading: false }),
            })
          );
        })
      )
    ),
  })),
  withHooks({
    onInit(store) {
      store.getOffers();
    },
  })
);
