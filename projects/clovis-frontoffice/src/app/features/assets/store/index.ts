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
import { AccountsInfrastructure } from '../services/accounts.infrastructure';
import { inject } from '@angular/core';
import { Accounts } from '../models/account';

export interface AccountsState {
  accounts: Accounts | undefined | null;
  isLoading: boolean;
}

const initialValue: AccountsState = {
  accounts: null,
  isLoading: false,
};

export const AccountsStore = signalStore(
  { providedIn: 'root' },
  withState(initialValue),
  withMethods((store, infra = inject(AccountsInfrastructure)) => ({
    getAccounts: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        concatMap(() => {
          return infra.getAccounts().pipe(
            tapResponse({
              next: accounts => patchState(store, { isLoading: false, accounts }),
              error: () => patchState(store, { isLoading: false }),
            }),
          );
        }),
      )
    ),
  })),
  withHooks({
    onInit(store) {
      store.getAccounts();
    },
  }),
);
