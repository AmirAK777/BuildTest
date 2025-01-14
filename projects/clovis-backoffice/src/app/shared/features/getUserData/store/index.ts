import { computed, effect, inject } from '@angular/core';
import {
  getState,
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, concatMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { UserInfrastructure } from '../services/user.infrastructure';
import { Admin, Consulant, Marketing, Sdr } from 'models-lib';
import { Storage } from '@ionic/storage-angular';
import { JwtDecoderService } from 'auth-features';

export interface LoadUserState {
  admin: Admin | undefined | null;
  marketing: Marketing | undefined | null;
  consultant: Consulant | undefined | null;
  sdr: Sdr | undefined | null;
  isLoading: boolean;
}

const initialValue: LoadUserState = {
  admin: undefined,
  marketing: undefined,
  consultant: undefined,
  sdr: undefined,
  isLoading: false,
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialValue),
  withComputed((store) => ({
    isAdmin: computed(() => store.admin() != null),
  })),
  withMethods((store, infra = inject(UserInfrastructure)) => ({
    getCurrentAdmin: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        concatMap((input) => {
          return infra.loadCurrentAdmin('test').pipe(
            tapResponse({
              next: (admin) => {
                patchState(store, {
                  isLoading: false,
                  admin: admin,
                  marketing: undefined,
                  consultant: undefined,
                  sdr: undefined,
                });
              },
              error: () => {
                patchState(store, { isLoading: false });
              },
            })
          );
        })
      )
    ),
    getCurrentConsultant: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        concatMap((input) => {
          return infra.loadCurrentConsultant('input').pipe(
            tapResponse({
              next: (consultant) => {
                patchState(store, {
                  isLoading: false,
                  consultant: consultant,
                  marketing: undefined,
                  admin: undefined,
                  sdr: undefined,
                });
              },
              error: () => {
                patchState(store, { isLoading: false });
              },
            })
          );
        })
      )
    ),
  })),
  withHooks({
    onInit(store) {
      
      effect(() => {
        const state = getState(store);
        console.log('counzdzdter state', state);
      });
    },
  })
);
