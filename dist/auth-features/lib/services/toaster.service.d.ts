import * as i0 from "@angular/core";
export declare class ToasterService {
    private _toastController;
    constructor();
    presentToastWithOptions(message: string, icon: string, color: string): Promise<void>;
    success(message: string): void;
    warning(message: string): void;
    error(message: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToasterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ToasterService>;
}
