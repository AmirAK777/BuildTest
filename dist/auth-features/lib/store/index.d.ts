import { WithToken } from '../services/localstorage.authentication.infrastructure';
import { AuthenticationToken } from '../models/authentication-user';
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
export declare const AuthenticationStore: import("@angular/core").Type<{
    token: import("@angular/core").Signal<AuthenticationToken | null | undefined>;
    isLoading: import("@angular/core").Signal<boolean>;
    isAuthenticated: import("@angular/core").Signal<boolean>;
    steps: import("@angular/core").Signal<number>;
    isLogged: import("@angular/core").Signal<boolean>;
    isNotLogged: import("@angular/core").Signal<boolean>;
    localLogin: (token: WithToken) => void;
    logIn: ((input: AuthenticateType | import("rxjs").Observable<AuthenticateType> | import("@angular/core").Signal<AuthenticateType>, config?: {
        injector?: import("@angular/core").Injector | undefined;
    } | undefined) => import("rxjs").Unsubscribable) & import("rxjs").Unsubscribable;
    sendResetCode: ((input: string | import("rxjs").Observable<string> | import("@angular/core").Signal<string>, config?: {
        injector?: import("@angular/core").Injector | undefined;
    } | undefined) => import("rxjs").Unsubscribable) & import("rxjs").Unsubscribable;
    verifyResetCode: ((input: string | import("rxjs").Observable<string> | import("@angular/core").Signal<string>, config?: {
        injector?: import("@angular/core").Injector | undefined;
    } | undefined) => import("rxjs").Unsubscribable) & import("rxjs").Unsubscribable;
    updatePassword: ((input: string | import("rxjs").Observable<string> | import("@angular/core").Signal<string>, config?: {
        injector?: import("@angular/core").Injector | undefined;
    } | undefined) => import("rxjs").Unsubscribable) & import("rxjs").Unsubscribable;
    logout: () => Promise<void>;
} & import("@ngrx/signals").StateSource<{
    token: AuthenticationToken | undefined | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    steps: number;
}>>;
