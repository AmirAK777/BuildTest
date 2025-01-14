import { LocalStorageAuthenticationInfrastructure } from './localstorage.authentication.infrastructure';
import * as i0 from "@angular/core";
export declare class JwtDecoderService {
    storage: LocalStorageAuthenticationInfrastructure;
    decodeToken(): Promise<string[] | null>;
    static ɵfac: i0.ɵɵFactoryDeclaration<JwtDecoderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<JwtDecoderService>;
}
