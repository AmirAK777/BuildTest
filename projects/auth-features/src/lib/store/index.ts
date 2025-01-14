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
import { pipe, tap, concatMap, map } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import {
  LocalStorageAuthenticationInfrastructure,
  WithToken,
} from '../services/localstorage.authentication.infrastructure';
import { AuthenticationToken } from '../models/authentication-user';
import { AuthenticationInfrastructure } from '../services/authentication.infrastructure';
import { NavController } from '@ionic/angular/standalone';
import { PasswordResetService } from '../services/reset.service';
import { ToasterService } from '../services/toaster.service';

export interface AuthenticationState {
  token: AuthenticationToken | undefined | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  steps: number;
}

export type AuthenticateType = {
  login: string;
  password: string;
};

const initialValue: AuthenticationState = {
  token: null,
  isLoading: false,
  isAuthenticated: false,
  steps: 1,
};

export const AuthenticationStore = signalStore(
  { providedIn: 'root' },
  withState(initialValue),
  withComputed((store) => ({
    isLogged: computed(() => store.isAuthenticated()),
    isNotLogged: computed(() => !store.token() || !store.isAuthenticated()),
  })),
  withMethods(
    (
      store,
      infra = inject(AuthenticationInfrastructure),
      forgotPassService = inject(PasswordResetService),
      localInfra = inject(LocalStorageAuthenticationInfrastructure),
      navController = inject(NavController),
      toasterService = inject(ToasterService)
    ) => ({
      localLogin(token: WithToken): void {
        if (token.access_token && token.refresh_token) {
          patchState(store, {
            isAuthenticated: true,
            token: {
              access_token: token.access_token,
              expires_in: 0,
              refresh_expires_in: 0,
              refresh_token: token.refresh_token,
            },
          });
        }
      },
      logIn: rxMethod<AuthenticateType>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          concatMap((input) => {
            return infra.login(input.login, input.password).pipe(
              map((tokenResponse) => {
                return {
                  access_token: tokenResponse.access_token,
                  expires_in: tokenResponse.expires_in,
                  refresh_expires_in: tokenResponse.refresh_expires_in,
                  refresh_token: tokenResponse.refresh_token,
                } as AuthenticationToken;
              }),
              tap((token) =>
                localInfra.startSession({
                  access_token: token.access_token,
                  refresh_token: token.refresh_token,
                })
              ),
              tapResponse({
                next: (token) => {
                  patchState(store, {
                    isLoading: false,
                    isAuthenticated: true,
                    token,
                  });
                  toasterService.success(
                    'Bienvenue sur votre espace personnel.'
                  );
                },
                error: () => {
                  patchState(store, { isLoading: false });
                  toasterService.error(
                    "Échec de l'authentification. Veuillez vérifier vos identifiants."
                  );
                },
              })
            );
          })
        )
      ),
      sendResetCode: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          concatMap((input) => {
            return forgotPassService.sendResetCode(input).pipe(
              tapResponse({
                next: (message) => {
                  patchState(store, {
                    isLoading: false,
                    steps: 2,
                  });
                },
                error: () => {
                  patchState(store, { isLoading: false, steps: 2 });
                },
              })
            );
          })
        )
      ),
      verifyResetCode: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          concatMap((input) => {
            return forgotPassService.verifyResetCode(input).pipe(
              tapResponse({
                next: (message) => {
                  patchState(store, {
                    isLoading: false,
                    steps: 3,
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
      updatePassword: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          concatMap((input) => {
            return forgotPassService.updatePassword(input).pipe(
              tapResponse({
                next: (message) => {
                  patchState(store, {
                    isLoading: false,
                    steps: 3,
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
      logout: async () => {
        patchState(store, {
          token: null,
          isLoading: false,
          isAuthenticated: false,
        });
        localInfra.endSession().then(() => {
          navController.navigateRoot('authenticate/login', {
            animated: false,
          });
        });
      },
    })
  ),
  withHooks({
    onInit(
      store,
      localInfra = inject(LocalStorageAuthenticationInfrastructure)
    ) {
      effect(() => {
        const state = getState(store);
        console.info('counter state: ', state);
      });
      localInfra.getSession().then((token: WithToken) => {
        if (token) {
          store.localLogin(token);
        }
      });
    },
  })
);
