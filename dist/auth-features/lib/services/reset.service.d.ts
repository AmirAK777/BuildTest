import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class PasswordResetService {
    private resetCodeSubject;
    resetCode$: Observable<string | null>;
    sendResetCode(email: string): Observable<string>;
    private generateResetCode;
    verifyResetCode(codeEntered: string): Observable<string>;
    updatePassword(newPassword: string): Observable<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PasswordResetService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PasswordResetService>;
}
