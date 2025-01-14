import * as i0 from "@angular/core";
export type WithToken = {
    access_token: string | null;
    refresh_token: string | null;
};
export declare class LocalStorageAuthenticationInfrastructure {
    private _storageInitialised;
    private _storage;
    startSession(user: WithToken): Promise<void>;
    getSession(): Promise<WithToken>;
    get(key: string): Promise<string>;
    set(key: string, value: any): Promise<void>;
    remove(key: string): Promise<void>;
    endSession(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<LocalStorageAuthenticationInfrastructure, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LocalStorageAuthenticationInfrastructure>;
}
