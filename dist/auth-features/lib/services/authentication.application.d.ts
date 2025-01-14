import { Signal } from '@angular/core';
import { AuthenticationToken } from '../models/authentication-user';
import * as i0 from "@angular/core";
export declare class AuthenticationApplication {
    private readonly store;
    private readonly router;
    login(login: string, password: string): void;
    logout(): void;
    get isLoading(): Signal<boolean>;
    get isAuthenticated(): Signal<boolean>;
    get token(): Signal<AuthenticationToken | null | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthenticationApplication, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthenticationApplication>;
}
