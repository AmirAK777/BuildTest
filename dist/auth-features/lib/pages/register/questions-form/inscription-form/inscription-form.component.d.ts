import { Customer } from 'models-lib';
import * as i0 from "@angular/core";
export declare class InscriptionFormComponent {
    registerForm: import("@angular/forms").FormGroup<{
        firstName: import("@angular/forms").FormControl<null>;
        lastName: import("@angular/forms").FormControl<null>;
        email: import("@angular/forms").FormControl<string | null>;
        phoneNumber: import("@angular/forms").FormControl<string | null>;
        zipCode: import("@angular/forms").FormControl<string | null>;
        rgpdChecked: import("@angular/forms").FormControl<boolean | null>;
    }>;
    requestToSave: import("@angular/core").OutputEmitterRef<Customer>;
    saveToParent(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<InscriptionFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<InscriptionFormComponent, "clovis-inscription-form", never, {}, { "requestToSave": "requestToSave"; }, never, never, true, never>;
}
