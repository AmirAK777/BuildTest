import * as i0 from "@angular/core";
export declare class ForgotPasswordComponent {
    private readonly store;
    private formBuilder;
    steps: import("@angular/core").Signal<number>;
    emailForm: import("@angular/forms").FormGroup<{
        email: import("@angular/forms").FormControl<string | null>;
    }>;
    codeForm: import("@angular/forms").FormGroup<{
        code: import("@angular/forms").FormControl<string | null>;
    }>;
    updatePasswordForm: import("@angular/forms").FormGroup<{
        newPassword: import("@angular/forms").FormControl<string | null>;
        confirmPassword: import("@angular/forms").FormControl<string | null>;
    }>;
    sendVerificationCode(): void;
    verifyCode(): void;
    updatePassword(): void;
    redirectToLogin(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ForgotPasswordComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ForgotPasswordComponent, "clovis-forgot-password", never, {}, {}, never, never, true, never>;
}
