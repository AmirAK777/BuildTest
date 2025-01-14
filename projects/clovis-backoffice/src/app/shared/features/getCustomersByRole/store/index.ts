import { computed, effect, inject } from '@angular/core';
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
import { CustomersInfrastructure } from '../services/customers.infrastructure';
import { PaginatedResult, SearchParams, User, Users } from 'models-lib';
import { MatTableDataSource } from '@angular/material/table';

const defaultPaginationConfig: Readonly<PaginatedResult<Users>> = {
  result: [],
  pagination: {
    currentPage: 1,
    itemsPerPage: 5,
    totalItems: 0,
    totalPages: 0,
  },
};

export interface LoadUserState {
  paginationUsers: PaginatedResult<Users> | undefined | null;
  todosDatasource: MatTableDataSource<User>;
  searchParams: SearchParams;
  isLoading: boolean;
}

const initialValue: LoadUserState = {
  paginationUsers: defaultPaginationConfig,
  todosDatasource: new MatTableDataSource<User>(),
  searchParams: {
    page: 1,
    itemsPerPage: 5,
    title: '',
  },
  isLoading: false,
};

export const CustomersStore = signalStore(
  { providedIn: 'root' },
  withState(initialValue),
  withComputed((store) => ({})),
  withMethods((store, infra = inject(CustomersInfrastructure)) => ({
    getCustomersByConsultantId: rxMethod<SearchParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        concatMap((query) => {
          return infra.getCustomersByConsultantId(query).pipe(
            tapResponse({
              next: (paginationUsers) => {
                patchState(store, {
                  paginationUsers: paginationUsers,
                  todosDatasource: new MatTableDataSource(
                    paginationUsers.result
                  ),
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
    updateQuery: (searchParams: Partial<SearchParams>) => {
      console.log('Avant mise à jour:', { searchParams }); // Log des paramètres reçus

      patchState(store, (state) => ({
        searchParams: { ...state.searchParams, ...searchParams },
      }));
      console.log('Après mise à jour:', { searchParams }); // Log des paramètres reçus

    },
  })),
  withHooks({
    onInit(store) {
      effect(() => {
        const state = getState(store);
        console.log('counter state', state);
      });
    },
  })
);
