import { computed, effect, inject } from '@angular/core';
import { getState, patchState, signalStore, withComputed, withHooks, withMethods, withState, } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, concatMap, map } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { LocalStorageAuthenticationInfrastructure, } from '../services/localstorage.authentication.infrastructure';
import { AuthenticationInfrastructure } from '../services/authentication.infrastructure';
import { NavController } from '@ionic/angular/standalone';
import { PasswordResetService } from '../services/reset.service';
import { ToasterService } from '../services/toaster.service';
const initialValue = {
    token: null,
    isLoading: false,
    isAuthenticated: false,
    steps: 1,
};
export const AuthenticationStore = signalStore({ providedIn: 'root' }, withState(initialValue), withComputed((store) => ({
    isLogged: computed(() => store.isAuthenticated()),
    isNotLogged: computed(() => !store.token() || !store.isAuthenticated()),
})), withMethods((store, infra = inject(AuthenticationInfrastructure), forgotPassService = inject(PasswordResetService), localInfra = inject(LocalStorageAuthenticationInfrastructure), navController = inject(NavController), toasterService = inject(ToasterService)) => ({
    localLogin(token) {
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
    logIn: rxMethod(pipe(tap(() => patchState(store, { isLoading: true })), concatMap((input) => {
        return infra.login(input.login, input.password).pipe(map((tokenResponse) => {
            return {
                access_token: tokenResponse.access_token,
                expires_in: tokenResponse.expires_in,
                refresh_expires_in: tokenResponse.refresh_expires_in,
                refresh_token: tokenResponse.refresh_token,
            };
        }), tap((token) => localInfra.startSession({
            access_token: token.access_token,
            refresh_token: token.refresh_token,
        })), tapResponse({
            next: (token) => {
                patchState(store, {
                    isLoading: false,
                    isAuthenticated: true,
                    token,
                });
                toasterService.success('Bienvenue sur votre espace personnel.');
            },
            error: () => {
                patchState(store, { isLoading: false });
                toasterService.error("Échec de l'authentification. Veuillez vérifier vos identifiants.");
            },
        }));
    }))),
    sendResetCode: rxMethod(pipe(tap(() => patchState(store, { isLoading: true })), concatMap((input) => {
        return forgotPassService.sendResetCode(input).pipe(tapResponse({
            next: (message) => {
                patchState(store, {
                    isLoading: false,
                    steps: 2,
                });
            },
            error: () => {
                patchState(store, { isLoading: false, steps: 2 });
            },
        }));
    }))),
    verifyResetCode: rxMethod(pipe(tap(() => patchState(store, { isLoading: true })), concatMap((input) => {
        return forgotPassService.verifyResetCode(input).pipe(tapResponse({
            next: (message) => {
                patchState(store, {
                    isLoading: false,
                    steps: 3,
                });
            },
            error: () => {
                patchState(store, { isLoading: false });
            },
        }));
    }))),
    updatePassword: rxMethod(pipe(tap(() => patchState(store, { isLoading: true })), concatMap((input) => {
        return forgotPassService.updatePassword(input).pipe(tapResponse({
            next: (message) => {
                patchState(store, {
                    isLoading: false,
                    steps: 3,
                });
            },
            error: () => {
                patchState(store, { isLoading: false });
            },
        }));
    }))),
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
})), withHooks({
    onInit(store, localInfra = inject(LocalStorageAuthenticationInfrastructure)) {
        effect(() => {
            const state = getState(store);
            console.info('counter state: ', state);
        });
        localInfra.getSession().then((token) => {
            if (token) {
                store.localLogin(token);
            }
        });
    },
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hdXRoLWZlYXR1cmVzL3NyYy9saWIvc3RvcmUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFDTCxRQUFRLEVBQ1IsVUFBVSxFQUNWLFdBQVcsRUFDWCxZQUFZLEVBQ1osU0FBUyxFQUNULFdBQVcsRUFDWCxTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlDLE9BQU8sRUFDTCx3Q0FBd0MsR0FFekMsTUFBTSx3REFBd0QsQ0FBQztBQUVoRSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN6RixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDakUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBYzdELE1BQU0sWUFBWSxHQUF3QjtJQUN4QyxLQUFLLEVBQUUsSUFBSTtJQUNYLFNBQVMsRUFBRSxLQUFLO0lBQ2hCLGVBQWUsRUFBRSxLQUFLO0lBQ3RCLEtBQUssRUFBRSxDQUFDO0NBQ1QsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHLFdBQVcsQ0FDNUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEVBQ3RCLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFDdkIsWUFBWSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZCLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ2pELFdBQVcsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7Q0FDeEUsQ0FBQyxDQUFDLEVBQ0gsV0FBVyxDQUNULENBQ0UsS0FBSyxFQUNMLEtBQUssR0FBRyxNQUFNLENBQUMsNEJBQTRCLENBQUMsRUFDNUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLG9CQUFvQixDQUFDLEVBQ2hELFVBQVUsR0FBRyxNQUFNLENBQUMsd0NBQXdDLENBQUMsRUFDN0QsYUFBYSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFDckMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFDdkMsRUFBRSxDQUFDLENBQUM7SUFDSixVQUFVLENBQUMsS0FBZ0I7UUFDekIsSUFBSSxLQUFLLENBQUMsWUFBWSxJQUFJLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUM5QyxVQUFVLENBQUMsS0FBSyxFQUFFO2dCQUNoQixlQUFlLEVBQUUsSUFBSTtnQkFDckIsS0FBSyxFQUFFO29CQUNMLFlBQVksRUFBRSxLQUFLLENBQUMsWUFBWTtvQkFDaEMsVUFBVSxFQUFFLENBQUM7b0JBQ2Isa0JBQWtCLEVBQUUsQ0FBQztvQkFDckIsYUFBYSxFQUFFLEtBQUssQ0FBQyxhQUFhO2lCQUNuQzthQUNGLENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDO0lBQ0QsS0FBSyxFQUFFLFFBQVEsQ0FDYixJQUFJLENBQ0YsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUNqRCxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNsQixPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUNsRCxHQUFHLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUNwQixPQUFPO2dCQUNMLFlBQVksRUFBRSxhQUFhLENBQUMsWUFBWTtnQkFDeEMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxVQUFVO2dCQUNwQyxrQkFBa0IsRUFBRSxhQUFhLENBQUMsa0JBQWtCO2dCQUNwRCxhQUFhLEVBQUUsYUFBYSxDQUFDLGFBQWE7YUFDcEIsQ0FBQztRQUMzQixDQUFDLENBQUMsRUFDRixHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUNaLFVBQVUsQ0FBQyxZQUFZLENBQUM7WUFDdEIsWUFBWSxFQUFFLEtBQUssQ0FBQyxZQUFZO1lBQ2hDLGFBQWEsRUFBRSxLQUFLLENBQUMsYUFBYTtTQUNuQyxDQUFDLENBQ0gsRUFDRCxXQUFXLENBQUM7WUFDVixJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDZCxVQUFVLENBQUMsS0FBSyxFQUFFO29CQUNoQixTQUFTLEVBQUUsS0FBSztvQkFDaEIsZUFBZSxFQUFFLElBQUk7b0JBQ3JCLEtBQUs7aUJBQ04sQ0FBQyxDQUFDO2dCQUNILGNBQWMsQ0FBQyxPQUFPLENBQ3BCLHVDQUF1QyxDQUN4QyxDQUFDO1lBQ0osQ0FBQztZQUNELEtBQUssRUFBRSxHQUFHLEVBQUU7Z0JBQ1YsVUFBVSxDQUFDLEtBQUssRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUN4QyxjQUFjLENBQUMsS0FBSyxDQUNsQixrRUFBa0UsQ0FDbkUsQ0FBQztZQUNKLENBQUM7U0FDRixDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUNILENBQ0Y7SUFDRCxhQUFhLEVBQUUsUUFBUSxDQUNyQixJQUFJLENBQ0YsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUNqRCxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNsQixPQUFPLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQ2hELFdBQVcsQ0FBQztZQUNWLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNoQixVQUFVLENBQUMsS0FBSyxFQUFFO29CQUNoQixTQUFTLEVBQUUsS0FBSztvQkFDaEIsS0FBSyxFQUFFLENBQUM7aUJBQ1QsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztZQUNELEtBQUssRUFBRSxHQUFHLEVBQUU7Z0JBQ1YsVUFBVSxDQUFDLEtBQUssRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEQsQ0FBQztTQUNGLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQ0gsQ0FDRjtJQUNELGVBQWUsRUFBRSxRQUFRLENBQ3ZCLElBQUksQ0FDRixHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQ2pELFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ2xCLE9BQU8saUJBQWlCLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FDbEQsV0FBVyxDQUFDO1lBQ1YsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ2hCLFVBQVUsQ0FBQyxLQUFLLEVBQUU7b0JBQ2hCLFNBQVMsRUFBRSxLQUFLO29CQUNoQixLQUFLLEVBQUUsQ0FBQztpQkFDVCxDQUFDLENBQUM7WUFDTCxDQUFDO1lBQ0QsS0FBSyxFQUFFLEdBQUcsRUFBRTtnQkFDVixVQUFVLENBQUMsS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDMUMsQ0FBQztTQUNGLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQ0gsQ0FDRjtJQUNELGNBQWMsRUFBRSxRQUFRLENBQ3RCLElBQUksQ0FDRixHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQ2pELFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ2xCLE9BQU8saUJBQWlCLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FDakQsV0FBVyxDQUFDO1lBQ1YsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ2hCLFVBQVUsQ0FBQyxLQUFLLEVBQUU7b0JBQ2hCLFNBQVMsRUFBRSxLQUFLO29CQUNoQixLQUFLLEVBQUUsQ0FBQztpQkFDVCxDQUFDLENBQUM7WUFDTCxDQUFDO1lBQ0QsS0FBSyxFQUFFLEdBQUcsRUFBRTtnQkFDVixVQUFVLENBQUMsS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDMUMsQ0FBQztTQUNGLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQ0gsQ0FDRjtJQUNELE1BQU0sRUFBRSxLQUFLLElBQUksRUFBRTtRQUNqQixVQUFVLENBQUMsS0FBSyxFQUFFO1lBQ2hCLEtBQUssRUFBRSxJQUFJO1lBQ1gsU0FBUyxFQUFFLEtBQUs7WUFDaEIsZUFBZSxFQUFFLEtBQUs7U0FDdkIsQ0FBQyxDQUFDO1FBQ0gsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDaEMsYUFBYSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsRUFBRTtnQkFDL0MsUUFBUSxFQUFFLEtBQUs7YUFDaEIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQyxDQUNILEVBQ0QsU0FBUyxDQUFDO0lBQ1IsTUFBTSxDQUNKLEtBQUssRUFDTCxVQUFVLEdBQUcsTUFBTSxDQUFDLHdDQUF3QyxDQUFDO1FBRTdELE1BQU0sQ0FBQyxHQUFHLEVBQUU7WUFDVixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUIsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztRQUNILFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFnQixFQUFFLEVBQUU7WUFDaEQsSUFBSSxLQUFLLEVBQUUsQ0FBQztnQkFDVixLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFCLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixDQUFDLENBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbXB1dGVkLCBlZmZlY3QsIGluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIGdldFN0YXRlLFxyXG4gIHBhdGNoU3RhdGUsXHJcbiAgc2lnbmFsU3RvcmUsXHJcbiAgd2l0aENvbXB1dGVkLFxyXG4gIHdpdGhIb29rcyxcclxuICB3aXRoTWV0aG9kcyxcclxuICB3aXRoU3RhdGUsXHJcbn0gZnJvbSAnQG5ncngvc2lnbmFscyc7XHJcbmltcG9ydCB7IHJ4TWV0aG9kIH0gZnJvbSAnQG5ncngvc2lnbmFscy9yeGpzLWludGVyb3AnO1xyXG5pbXBvcnQgeyBwaXBlLCB0YXAsIGNvbmNhdE1hcCwgbWFwIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRhcFJlc3BvbnNlIH0gZnJvbSAnQG5ncngvb3BlcmF0b3JzJztcclxuaW1wb3J0IHtcclxuICBMb2NhbFN0b3JhZ2VBdXRoZW50aWNhdGlvbkluZnJhc3RydWN0dXJlLFxyXG4gIFdpdGhUb2tlbixcclxufSBmcm9tICcuLi9zZXJ2aWNlcy9sb2NhbHN0b3JhZ2UuYXV0aGVudGljYXRpb24uaW5mcmFzdHJ1Y3R1cmUnO1xyXG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvblRva2VuIH0gZnJvbSAnLi4vbW9kZWxzL2F1dGhlbnRpY2F0aW9uLXVzZXInO1xyXG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvbkluZnJhc3RydWN0dXJlIH0gZnJvbSAnLi4vc2VydmljZXMvYXV0aGVudGljYXRpb24uaW5mcmFzdHJ1Y3R1cmUnO1xyXG5pbXBvcnQgeyBOYXZDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXIvc3RhbmRhbG9uZSc7XHJcbmltcG9ydCB7IFBhc3N3b3JkUmVzZXRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcmVzZXQuc2VydmljZSc7XHJcbmltcG9ydCB7IFRvYXN0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvdG9hc3Rlci5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQXV0aGVudGljYXRpb25TdGF0ZSB7XHJcbiAgdG9rZW46IEF1dGhlbnRpY2F0aW9uVG9rZW4gfCB1bmRlZmluZWQgfCBudWxsO1xyXG4gIGlzTG9hZGluZzogYm9vbGVhbjtcclxuICBpc0F1dGhlbnRpY2F0ZWQ6IGJvb2xlYW47XHJcbiAgc3RlcHM6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgQXV0aGVudGljYXRlVHlwZSA9IHtcclxuICBsb2dpbjogc3RyaW5nO1xyXG4gIHBhc3N3b3JkOiBzdHJpbmc7XHJcbn07XHJcblxyXG5jb25zdCBpbml0aWFsVmFsdWU6IEF1dGhlbnRpY2F0aW9uU3RhdGUgPSB7XHJcbiAgdG9rZW46IG51bGwsXHJcbiAgaXNMb2FkaW5nOiBmYWxzZSxcclxuICBpc0F1dGhlbnRpY2F0ZWQ6IGZhbHNlLFxyXG4gIHN0ZXBzOiAxLFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IEF1dGhlbnRpY2F0aW9uU3RvcmUgPSBzaWduYWxTdG9yZShcclxuICB7IHByb3ZpZGVkSW46ICdyb290JyB9LFxyXG4gIHdpdGhTdGF0ZShpbml0aWFsVmFsdWUpLFxyXG4gIHdpdGhDb21wdXRlZCgoc3RvcmUpID0+ICh7XHJcbiAgICBpc0xvZ2dlZDogY29tcHV0ZWQoKCkgPT4gc3RvcmUuaXNBdXRoZW50aWNhdGVkKCkpLFxyXG4gICAgaXNOb3RMb2dnZWQ6IGNvbXB1dGVkKCgpID0+ICFzdG9yZS50b2tlbigpIHx8ICFzdG9yZS5pc0F1dGhlbnRpY2F0ZWQoKSksXHJcbiAgfSkpLFxyXG4gIHdpdGhNZXRob2RzKFxyXG4gICAgKFxyXG4gICAgICBzdG9yZSxcclxuICAgICAgaW5mcmEgPSBpbmplY3QoQXV0aGVudGljYXRpb25JbmZyYXN0cnVjdHVyZSksXHJcbiAgICAgIGZvcmdvdFBhc3NTZXJ2aWNlID0gaW5qZWN0KFBhc3N3b3JkUmVzZXRTZXJ2aWNlKSxcclxuICAgICAgbG9jYWxJbmZyYSA9IGluamVjdChMb2NhbFN0b3JhZ2VBdXRoZW50aWNhdGlvbkluZnJhc3RydWN0dXJlKSxcclxuICAgICAgbmF2Q29udHJvbGxlciA9IGluamVjdChOYXZDb250cm9sbGVyKSxcclxuICAgICAgdG9hc3RlclNlcnZpY2UgPSBpbmplY3QoVG9hc3RlclNlcnZpY2UpXHJcbiAgICApID0+ICh7XHJcbiAgICAgIGxvY2FsTG9naW4odG9rZW46IFdpdGhUb2tlbik6IHZvaWQge1xyXG4gICAgICAgIGlmICh0b2tlbi5hY2Nlc3NfdG9rZW4gJiYgdG9rZW4ucmVmcmVzaF90b2tlbikge1xyXG4gICAgICAgICAgcGF0Y2hTdGF0ZShzdG9yZSwge1xyXG4gICAgICAgICAgICBpc0F1dGhlbnRpY2F0ZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIHRva2VuOiB7XHJcbiAgICAgICAgICAgICAgYWNjZXNzX3Rva2VuOiB0b2tlbi5hY2Nlc3NfdG9rZW4sXHJcbiAgICAgICAgICAgICAgZXhwaXJlc19pbjogMCxcclxuICAgICAgICAgICAgICByZWZyZXNoX2V4cGlyZXNfaW46IDAsXHJcbiAgICAgICAgICAgICAgcmVmcmVzaF90b2tlbjogdG9rZW4ucmVmcmVzaF90b2tlbixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgbG9nSW46IHJ4TWV0aG9kPEF1dGhlbnRpY2F0ZVR5cGU+KFxyXG4gICAgICAgIHBpcGUoXHJcbiAgICAgICAgICB0YXAoKCkgPT4gcGF0Y2hTdGF0ZShzdG9yZSwgeyBpc0xvYWRpbmc6IHRydWUgfSkpLFxyXG4gICAgICAgICAgY29uY2F0TWFwKChpbnB1dCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gaW5mcmEubG9naW4oaW5wdXQubG9naW4sIGlucHV0LnBhc3N3b3JkKS5waXBlKFxyXG4gICAgICAgICAgICAgIG1hcCgodG9rZW5SZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgYWNjZXNzX3Rva2VuOiB0b2tlblJlc3BvbnNlLmFjY2Vzc190b2tlbixcclxuICAgICAgICAgICAgICAgICAgZXhwaXJlc19pbjogdG9rZW5SZXNwb25zZS5leHBpcmVzX2luLFxyXG4gICAgICAgICAgICAgICAgICByZWZyZXNoX2V4cGlyZXNfaW46IHRva2VuUmVzcG9uc2UucmVmcmVzaF9leHBpcmVzX2luLFxyXG4gICAgICAgICAgICAgICAgICByZWZyZXNoX3Rva2VuOiB0b2tlblJlc3BvbnNlLnJlZnJlc2hfdG9rZW4sXHJcbiAgICAgICAgICAgICAgICB9IGFzIEF1dGhlbnRpY2F0aW9uVG9rZW47XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgdGFwKCh0b2tlbikgPT5cclxuICAgICAgICAgICAgICAgIGxvY2FsSW5mcmEuc3RhcnRTZXNzaW9uKHtcclxuICAgICAgICAgICAgICAgICAgYWNjZXNzX3Rva2VuOiB0b2tlbi5hY2Nlc3NfdG9rZW4sXHJcbiAgICAgICAgICAgICAgICAgIHJlZnJlc2hfdG9rZW46IHRva2VuLnJlZnJlc2hfdG9rZW4sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgdGFwUmVzcG9uc2Uoe1xyXG4gICAgICAgICAgICAgICAgbmV4dDogKHRva2VuKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHBhdGNoU3RhdGUoc3RvcmUsIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzQXV0aGVudGljYXRlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB0b2tlbixcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgIHRvYXN0ZXJTZXJ2aWNlLnN1Y2Nlc3MoXHJcbiAgICAgICAgICAgICAgICAgICAgJ0JpZW52ZW51ZSBzdXIgdm90cmUgZXNwYWNlIHBlcnNvbm5lbC4nXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgcGF0Y2hTdGF0ZShzdG9yZSwgeyBpc0xvYWRpbmc6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgICB0b2FzdGVyU2VydmljZS5lcnJvcihcclxuICAgICAgICAgICAgICAgICAgICBcIsOJY2hlYyBkZSBsJ2F1dGhlbnRpZmljYXRpb24uIFZldWlsbGV6IHbDqXJpZmllciB2b3MgaWRlbnRpZmlhbnRzLlwiXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIClcclxuICAgICAgKSxcclxuICAgICAgc2VuZFJlc2V0Q29kZTogcnhNZXRob2Q8c3RyaW5nPihcclxuICAgICAgICBwaXBlKFxyXG4gICAgICAgICAgdGFwKCgpID0+IHBhdGNoU3RhdGUoc3RvcmUsIHsgaXNMb2FkaW5nOiB0cnVlIH0pKSxcclxuICAgICAgICAgIGNvbmNhdE1hcCgoaW5wdXQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGZvcmdvdFBhc3NTZXJ2aWNlLnNlbmRSZXNldENvZGUoaW5wdXQpLnBpcGUoXHJcbiAgICAgICAgICAgICAgdGFwUmVzcG9uc2Uoe1xyXG4gICAgICAgICAgICAgICAgbmV4dDogKG1lc3NhZ2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgcGF0Y2hTdGF0ZShzdG9yZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzTG9hZGluZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcHM6IDIsXHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHBhdGNoU3RhdGUoc3RvcmUsIHsgaXNMb2FkaW5nOiBmYWxzZSwgc3RlcHM6IDIgfSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIClcclxuICAgICAgKSxcclxuICAgICAgdmVyaWZ5UmVzZXRDb2RlOiByeE1ldGhvZDxzdHJpbmc+KFxyXG4gICAgICAgIHBpcGUoXHJcbiAgICAgICAgICB0YXAoKCkgPT4gcGF0Y2hTdGF0ZShzdG9yZSwgeyBpc0xvYWRpbmc6IHRydWUgfSkpLFxyXG4gICAgICAgICAgY29uY2F0TWFwKChpbnB1dCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gZm9yZ290UGFzc1NlcnZpY2UudmVyaWZ5UmVzZXRDb2RlKGlucHV0KS5waXBlKFxyXG4gICAgICAgICAgICAgIHRhcFJlc3BvbnNlKHtcclxuICAgICAgICAgICAgICAgIG5leHQ6IChtZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHBhdGNoU3RhdGUoc3RvcmUsIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0ZXBzOiAzLFxyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlcnJvcjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBwYXRjaFN0YXRlKHN0b3JlLCB7IGlzTG9hZGluZzogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIClcclxuICAgICAgKSxcclxuICAgICAgdXBkYXRlUGFzc3dvcmQ6IHJ4TWV0aG9kPHN0cmluZz4oXHJcbiAgICAgICAgcGlwZShcclxuICAgICAgICAgIHRhcCgoKSA9PiBwYXRjaFN0YXRlKHN0b3JlLCB7IGlzTG9hZGluZzogdHJ1ZSB9KSksXHJcbiAgICAgICAgICBjb25jYXRNYXAoKGlucHV0KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3Jnb3RQYXNzU2VydmljZS51cGRhdGVQYXNzd29yZChpbnB1dCkucGlwZShcclxuICAgICAgICAgICAgICB0YXBSZXNwb25zZSh7XHJcbiAgICAgICAgICAgICAgICBuZXh0OiAobWVzc2FnZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBwYXRjaFN0YXRlKHN0b3JlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBzdGVwczogMyxcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgcGF0Y2hTdGF0ZShzdG9yZSwgeyBpc0xvYWRpbmc6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICApXHJcbiAgICAgICksXHJcbiAgICAgIGxvZ291dDogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIHBhdGNoU3RhdGUoc3RvcmUsIHtcclxuICAgICAgICAgIHRva2VuOiBudWxsLFxyXG4gICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcclxuICAgICAgICAgIGlzQXV0aGVudGljYXRlZDogZmFsc2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbG9jYWxJbmZyYS5lbmRTZXNzaW9uKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICBuYXZDb250cm9sbGVyLm5hdmlnYXRlUm9vdCgnYXV0aGVudGljYXRlL2xvZ2luJywge1xyXG4gICAgICAgICAgICBhbmltYXRlZDogZmFsc2UsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSxcclxuICAgIH0pXHJcbiAgKSxcclxuICB3aXRoSG9va3Moe1xyXG4gICAgb25Jbml0KFxyXG4gICAgICBzdG9yZSxcclxuICAgICAgbG9jYWxJbmZyYSA9IGluamVjdChMb2NhbFN0b3JhZ2VBdXRoZW50aWNhdGlvbkluZnJhc3RydWN0dXJlKVxyXG4gICAgKSB7XHJcbiAgICAgIGVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBnZXRTdGF0ZShzdG9yZSk7XHJcbiAgICAgICAgY29uc29sZS5pbmZvKCdjb3VudGVyIHN0YXRlOiAnLCBzdGF0ZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBsb2NhbEluZnJhLmdldFNlc3Npb24oKS50aGVuKCh0b2tlbjogV2l0aFRva2VuKSA9PiB7XHJcbiAgICAgICAgaWYgKHRva2VuKSB7XHJcbiAgICAgICAgICBzdG9yZS5sb2NhbExvZ2luKHRva2VuKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICB9KVxyXG4pO1xyXG4iXX0=