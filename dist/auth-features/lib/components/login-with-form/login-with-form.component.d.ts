import { FormControl } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class LoginWithFormComponent {
    private readonly application;
    loginForm: import("@angular/forms").FormGroup<{
        email: FormControl<string | null>;
        password: FormControl<string | null>;
    }>;
    save(): void;
    get email(): FormControl;
    get password(): FormControl;
    get isValid(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<LoginWithFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LoginWithFormComponent, "clovis-login-with-form", never, {}, {}, never, never, true, never>;
}
