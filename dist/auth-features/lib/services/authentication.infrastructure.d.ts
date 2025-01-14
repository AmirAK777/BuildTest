import { Observable } from 'rxjs';
import { AuthenticationToken } from '../models/authentication-user';
import * as i0 from "@angular/core";
export declare class AuthenticationInfrastructure {
    private readonly apiKeyCloakUrl;
    private readonly _httpClient;
    private readonly storage;
    login(email: string, password: string): Observable<AuthenticationToken>;
    refreshToken(): Observable<AuthenticationToken>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthenticationInfrastructure, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthenticationInfrastructure>;
}
