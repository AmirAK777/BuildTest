import { effect, inject } from '@angular/core';
import { Router } from '@angular/router';
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
import { MenuItems } from '../models/menu';
import { NavInfrastructure } from '../services/nav.infrastructure';

export interface MenuState {
  menuItems: MenuItems | undefined | null;
  isLoading: boolean;
}

const initialValue: MenuState = {
  menuItems: [],
  isLoading: false,
};

export const MenuStore = signalStore(
  { providedIn: 'root' },
  withState(initialValue),
  withComputed((store) => ({
    // isAdmin: computed(() => store.admin() != null),
  })),
  withMethods(
    (store, infra = inject(NavInfrastructure), router = inject(Router)) => ({
      getAdminMenu: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          concatMap(() => {
            return infra.getAdminMenu().pipe(
              tapResponse({
                next: (menuItem) => {
                  patchState(store, {
                    menuItems: menuItem,
                    isLoading: false,
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
      getConsultantMenu: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          concatMap(() => {
            return infra.getConsultantMenu().pipe(
              tapResponse({
                next: (menuItem) => {
                  patchState(store, {
                    menuItems: menuItem,
                    isLoading: false,
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
    })
  ),
  withHooks({
    onInit(store) {
      effect(() => {
        const state = getState(store);
        console.log('counter state', state);
      });
    },
  })
);
